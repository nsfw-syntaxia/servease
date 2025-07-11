import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(req: Request) {
  // 1. Security Check: Ensure the request is coming from Supabase
  const headersList = req.headers;
  const authToken = headersList.get("auth-token");

  if (authToken !== process.env.SUPABASE_WEBHOOK_SECRET) {
    console.warn("Unauthorized webhook call attempt");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await req.json();

    // 2. Logic Check: Only act on profile updates for approval
    const isProfileUpdate =
      payload.table === "profiles" && payload.type === "UPDATE";
    const oldStatus = payload.old_record?.status;
    const newStatus = payload.record?.status;

    // Kept your change to check for "verified"
    if (
      isProfileUpdate &&
      oldStatus === "pending" &&
      newStatus === "verified"
    ) {
      const providerEmail = payload.record.email;
      const facilityName = payload.record.business_name;

      if (!providerEmail || !facilityName) {
        console.error("Webhook payload missing email or business name");
        return NextResponse.json(
          { error: "Missing required data in payload" },
          { status: 400 }
        );
      }

      console.log(
        `Approval detected for ${facilityName}. Triggering email to ${providerEmail}.`
      );

      // 3. Trigger Email: Call your existing email API
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      await fetch(`${appUrl}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailType: "facilityApproved",
          data: {
            facilityEmail: providerEmail,
            facilityName: facilityName,
          },
        }),
      });
    }

    return NextResponse.json({ success: true, message: "Webhook received" });
  } catch (error: any) {
    console.error("Database Webhook Error:", error.message);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}
