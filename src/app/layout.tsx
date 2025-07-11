import { DM_Sans, Benne, Poppins } from "next/font/google";
import "../styles/globals.css";
import { createClient } from "../lib/supabase/server";
import Header from "../components/header";
import Footer from "../components/footer";

export type UserRole = "client" | "provider" | "guest";

const DmSansFont = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const BenneFont = Benne({
  weight: "400",
  variable: "--font-benne",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "600"],
  display: "swap",
});

export const metadata = {
  title: "servease",
  icons: {
    icon: "/logo.svg",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let avatarUrl = "/avatar.svg";
  let userRole: UserRole = "guest";
  let homePath = "/home";

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role, picture_url")
      .eq("id", user.id)
      .single();

    if (profile) {
      userRole = profile.role;

      if (profile.role === "client") {
        homePath = "/client-dashboard";
      } else if (profile.role === "provider") {
        homePath = "/provider-dashboard";
      }

      if (profile.picture_url) {
        if (profile.picture_url.startsWith("http")) {
          avatarUrl = profile.picture_url;
        } else {
          const { data: publicUrlData } = supabase.storage
            .from("avatars")
            .getPublicUrl(profile.picture_url);

          if (publicUrlData && publicUrlData.publicUrl) {
            avatarUrl = publicUrlData.publicUrl;
          }
        }
      }
    }
  }

  console.log(userRole);
  return (
    <html lang="en">
      <body
        className={`${DmSansFont.variable} ${BenneFont.variable} ${poppins.variable} antialiased`}
      >
        <Header avatarUrl={avatarUrl} userRole={userRole} homePath={homePath} />
        <main>{children}</main>
        <Footer userRole={userRole} />
      </body>
    </html>
  );
}
