import { redirect } from "next/navigation";
import { getServices } from "./actions";
import ServicesOffered from "./services";

export default async function ServicesOfferedPage() {
  // fetch the data on the server before the page loads
  const { data: initialServices, error } = await getServices();

  // handle potential errors during the server fetch
  if (error) {
    return redirect("/facility-profile");
  }

  // render and and pass the fetched data as a prop
  return <ServicesOffered initialData={initialServices || []} />;
}
