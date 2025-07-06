import { redirect } from "next/navigation";
import ProfileFacility from "./facility-profile";
import { getFacilityProfileData } from "./actions";

export default async function FacilityProfilePage() {
  // fetch data on the server before rendering
  const { data, error } = await getFacilityProfileData();

  // if there's an error or no user, redirect to login
  if (error || !data) {
    return redirect("/login");
  }

  // render the client component and pass the fetched data as a prop
  return <ProfileFacility initialData={data} />;
}
