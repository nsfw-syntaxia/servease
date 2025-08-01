"use server";

import { redirect } from "next/navigation";
import { type SignUpWithPasswordCredentials } from "@supabase/supabase-js";
import { createClient } from "../../utils/supabase/server";

interface facilityProfileData {
  user_id: string;
  owner_name: string;
  facility_name: string;
  location: string;
  category: string;
  specific_category: string;
  working_days: string[];
  start_time: string;
  end_time: string;
  status: string;
  tags: string | null;
}

export async function loginCredentials(formData: FormData): Promise<void> {
  console.log("--- SIGNUP SERVER ACTION RUNNING ---");

  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const credentials: SignUpWithPasswordCredentials = {
    email,
    password,
  };

  const { data, error } = await supabase.auth.signUp(credentials);

  if (error) {
    console.error("--- SUPABASE SIGNUP ERROR ---", error.message);
  }

  if (data.user) {
    console.log("User created. User ID: ", data.user.id);
    const {
      data: { user: sessionUser },
    } = await supabase.auth.getUser();
    console.log("Session user id: ", sessionUser?.id);
  }

  console.log("SUCCESS! User account created. Redirecting to profile setup.");
}

function convertTo24HourFormat(time12h: string): string {
  if (!time12h) return "";

  const [time, modifier] = time12h.split(" ");
  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    hours = modifier === "AM" ? "00" : "12";
  } else if (modifier === "PM") {
    hours = String(parseInt(hours, 10) + 12);
  }

  const formattedHours = hours.padStart(2, "0");

  return `${formattedHours}:${minutes}:00`;
}

export async function facilityProfile(formData: FormData): Promise<void> {
  console.log("--- PROFILE SERVER ACTION RUNNING ---");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("User is not authenticated. Cannot create profile.");
    const {
      data: { user: sessionUser },
    } = await supabase.auth.getUser();
    console.error("Session user: ", sessionUser?.id);
  }

  console.log("Authenticated user found:", user.id);

  const ownerName = formData.get("owner_name") as string;
  const facilityName = formData.get("facility_name") as string;
  const fac_location = formData.get("facility_location") as string;
  const selectedCategory = formData.get("category") as string;
  const specificCategory = formData.get("specific_category") as string;
  const workingDaysJSON = formData.get("working_days") as string;
  const startTime12h = formData.get("start_time") as string;
  const endTime12h = formData.get("end_time") as string;

  if (
    !ownerName?.trim() ||
    !facilityName?.trim() ||
    !fac_location.trim() ||
    !selectedCategory.trim() ||
    !specificCategory.trim() ||
    !workingDaysJSON ||
    !startTime12h ||
    !endTime12h
  ) {
    console.log("VALIDATION FAILED: Required profile fields missing.");
  }

  const parsedWorkingDays = JSON.parse(workingDaysJSON);

  const formattedStartTime = convertTo24HourFormat(startTime12h);
  const formattedEndTime = convertTo24HourFormat(endTime12h);

  const profileData: facilityProfileData = {
    user_id: user.id,
    owner_name: ownerName.trim(),
    facility_name: facilityName.trim(),
    location: fac_location,
    category: selectedCategory,
    specific_category: specificCategory,
    working_days: parsedWorkingDays,
    start_time: formattedStartTime,
    end_time: formattedEndTime,
    status: "pending",
    tags: null,
  };

  console.log("Data to insert:", profileData);

  const { error } = await supabase
    .from("facility_initial_profile")
    .insert(profileData);

  if (error) {
    console.error("--- SUPABASE PROFILE INSERT ERROR ---", error);
  }

  console.log("SUCCESS! Profile created for user:", user.id);
}

type FormResult = {
  success?: string;
  error?: string;
};

export async function uploadDocument(formData: FormData): Promise<FormResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "You must be logged in to upload documents." };
  }

  const file = formData.get("document") as File;
  const documentType = formData.get("documentType") as string;

  if (!file || file.size === 0) {
    return { error: "No file was provided." };
  }
  if (!documentType) {
    return { error: "Document type is missing." };
  }

  const fileExtension = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExtension}`;
  const filePath = `${user.id}/${fileName}`;

  const { error: storageError } = await supabase.storage
    .from("documents")
    .upload(filePath, file);

  if (storageError) {
    console.error("Storage Error:", storageError);
    return { error: `Failed to upload file: ${storageError.message}` };
  }

  const { error: dbError } = await supabase.from("facility_documents").insert({
    user_id: user.id,
    document_type: documentType,
    file_path: filePath,
    file_name: file.name,
  });

  if (dbError) {
    console.error("Database Error:", dbError);
    await supabase.storage.from("documents").remove([filePath]);
    return { error: `Failed to save document record: ${dbError.message}` };
  }

  return { success: `Successfully uploaded ${file.name}!` };
}

export async function completeProviderProfile(
  formData: FormData
): Promise<{ error?: string }> {
  console.log("--- FINAL STEP: COMPLETE PROVIDER PROFILE ---");

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const errorMsg = "User not authenticated. Please log in and try again.";
    console.error(errorMsg);
    return { error: errorMsg };
  }
  console.log("Authenticated provider found:", user.id);

  const contactNumber = formData.get("contact_number") as string;

  if (!contactNumber?.trim()) {
    const errorMsg = "Validation FAILED: Contact number is missing.";
    console.error(errorMsg);
    return { error: errorMsg };
  }

  console.log(`Fetching initial provider profile for user_id: ${user.id}`);
  const { data: initialProfileData, error: fetchError } = await supabase
    .from("facility_initial_profile")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (fetchError || !initialProfileData) {
    const errorMsg = `Could not find initial provider profile: ${fetchError?.message}`;
    console.error(errorMsg);
    return {
      error:
        "Could not find your profile data from the previous step. Please start over.",
    };
  }
  console.log("Found initial provider profile data:", initialProfileData);

  let facilityImageUrl: string | null = null; // Default to null

  const imageDocumentType = "Facility Photos";

  console.log(`Fetching facility image document for user_id: ${user.id}`);
  const { data: documentData, error: documentError } = await supabase
    .from("facility_documents")
    .select("file_path")
    .eq("user_id", user.id)
    .eq("document_type", imageDocumentType)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (documentError) {
    console.warn(
      `Could not fetch facility image document: ${documentError.message}`
    );
  }

  if (documentData && documentData.file_path) {
    console.log("Found facility image path:", documentData.file_path);
    const { data: urlData } = supabase.storage
      .from("documents")
      .getPublicUrl(documentData.file_path);

    facilityImageUrl = urlData.publicUrl;
    console.log("Constructed public facility image URL:", facilityImageUrl);
  } else {
    console.log("No specific facility image document found for this user.");
  }

  const finalProfileData = {
    id: user.id,
    role: "provider" as const,
    full_name: initialProfileData.owner_name,
    business_name: initialProfileData.facility_name,
    address: initialProfileData.location,
    contact_number: contactNumber.trim(),
    category: initialProfileData.category,
    specific_category: initialProfileData.specific_category,
    working_days: initialProfileData.working_days,
    start_time: initialProfileData.start_time,
    end_time: initialProfileData.end_time,
    picture_url: "/avatar.svg",
    facility_image_url: facilityImageUrl,
    status: initialProfileData.status,
    tags: initialProfileData.tags,
  };

  console.log("Data to upsert into FINAL 'profiles' table:", finalProfileData);

  const { error: upsertError } = await supabase
    .from("profiles")
    .upsert(finalProfileData);

  if (upsertError) {
    const errorMsg = `--- SUPABASE PROFILE UPSERT ERROR ---: ${upsertError.message}`;
    console.error(errorMsg);
    return {
      error: "A database error occurred while creating your final profile.",
    };
  }
  console.log("Successfully upserted provider data into 'profiles' table.");

  // --- ADD THIS SECTION TO SEND THE EMAIL ---
  try {
    console.log("Attempting to send registration success email...");
    const emailPayload = {
      emailType: "facilityRegistration",
      data: {
        facilityEmail: user.email, // The registered user's email
        facilityName: initialProfileData.facility_name, // The facility name
      },
    };

    // Make sure to use the full URL of your deployed application
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    await fetch(`${appUrl}/api/registration-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailPayload),
    });

    console.log("Registration success email request sent.");
  } catch (emailError) {
    // Log the error but don't block the user registration process
    console.error("--- FAILED TO SEND REGISTRATION EMAIL ---", emailError);
  }
  // --- END OF EMAIL SENDING SECTION ---

  const { error: deleteError } = await supabase
    .from("facility_initial_profile")
    .delete()
    .eq("user_id", user.id);

  if (deleteError) {
    console.error(
      `--- SUPABASE TEMP PROFILE DELETE ERROR ---: ${deleteError.message}`
    );
  } else {
    console.log(
      `Successfully deleted temporary profile for user_id: ${user.id}`
    );
  }

  console.log("SUCCESS! Provider registration fully completed for:", user.id);

  return {};
}
