import { redirect } from "next/navigation";
import ProfileClient from "./client-profile";
import { getUserProfileData } from "./actions";

export default async function ProfilePage() {
  const { data, error } = await getUserProfileData();

  if (error || !data) {
    return redirect("/login"); 
  }

  return <ProfileClient initialData={data} />;
}