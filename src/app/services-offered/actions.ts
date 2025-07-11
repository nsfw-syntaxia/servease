"use server";

import { createClient } from "../../utils/supabase/server";
import { revalidatePath } from "next/cache";

export type Service = {
  id: number;
  name: string;
  description: string;
  price: string;
};

export type ServicePayload = {
  name: string;
  description: string;
  price: number;
};

/**
 * fetches all services for the currently authenticated provider
 * @returns a promise that resolves to an object containing the service data or an error
 */
export async function getServices(): Promise<{
  data?: Service[];
  error?: string;
}> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: "User not authenticated." };
    }

    const { data: services, error } = await supabase
      .from("services")
      .select("id, name, description, price")
      .eq("provider_id", user.id)
      .order("created_at", { ascending: true });

    if (error) {
      throw error;
    }

    const formattedData: Service[] = services.map((service) => ({
      ...service,
      price: `Php${Number(service.price).toFixed(2)}`,
    }));

    return { data: formattedData };
  } catch (error: any) {
    console.error("Error fetching services:", error.message);
    return { error: "Failed to fetch services." };
  }
}

/**
 * adds a new service for the authenticated provider
 * @param payload - the service data to add
 * @returns a promise that resolves to the newly created service or an error
 */
export async function addService(payload: ServicePayload): Promise<{
  data?: Service;
  error?: string;
}> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: "You must be logged in to add a service." };
    }

    const { data: newService, error } = await supabase
      .from("services")
      .insert({
        ...payload,
        provider_id: user.id,
      })
      .select("id, name, description, price")
      .single();

    if (error) {
      throw error;
    }

    revalidatePath("/services-offered");

    const formattedService: Service = {
      ...newService,
      price: `Php${Number(newService.price).toFixed(2)}`,
    };

    return { data: formattedService };
  } catch (error: any) {
    console.error("Error adding service:", error.message);
    return { error: "Could not add the new service." };
  }
}

/**
 * updates an existing service for the authenticated provider
 * @param id - the id of the service to update
 * @param payload - the new data for the service
 * @returns a promise that resolves to an empty object on success or an error object
 */
export async function updateService(
  id: number,
  payload: ServicePayload
): Promise<{ error?: string }> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: "You must be logged in to update a service." };
    }

    const { error } = await supabase
      .from("services")
      .update(payload)
      .eq("id", id)
      .eq("provider_id", user.id);

    if (error) {
      throw error;
    }

    revalidatePath("/services-offered");
    return {};
  } catch (error: any) {
    console.error("Error updating service:", error.message);
    return { error: "Could not update the service." };
  }
}

/**
 * deletes a service for the authenticated provider
 * @param id - the id of the service to delete
 * @returns a promise that resolves to an empty object on success or an error object
 */
export async function deleteService(id: number): Promise<{ error?: string }> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: "You must be logged in to delete a service." };
    }

    const { error } = await supabase
      .from("services")
      .delete()
      .eq("id", id)
      .eq("provider_id", user.id);

    if (error) {
      throw error;
    }

    revalidatePath("/services-offered");
    return {};
  } catch (error: any) {
    console.error("Error deleting service:", error.message);
    return { error: "Could not delete the service." };
  }
}
