// Defines the shape of the appointment data we fetch from Supabase
export type Appointment = {
  id: number;
  start_time: string;
  status: "pending" | "confirmed" | "completed" | "canceled";

  // FIX: 'service' is an array of one item, or null.
  // We access the service name with appointment.service[0].name
  service:
    | {
        name: string;
      }[]
    | null;

  // FIX: 'provider' is an array of one item, or null.
  // We access the provider name with appointment.provider[0].business_name
  provider:
    | {
        business_name: string;
        address: string;
      }[]
    | null;
};

// Defines the shape of the service data we fetch
export type Service = {
  id: number;
  name: string;
  price: number;

  // FIX: 'provider' is also an array here.
  provider:
    | {
        business_name: string;
        avatar_url: string | null;
      }[]
    | null;
};
