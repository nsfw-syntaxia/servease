import { DM_Sans } from "next/font/google";
import { Benne } from "next/font/google";
import { Poppins } from "next/font/google";
import Loading from "@/components/components/ui/loading";
import "./styles/globals.css";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${DmSansFont.variable} ${BenneFont.variable} ${poppins.variable} antialiased`}
      >
        <Loading />
        {children}
      </body>
    </html>
  );
}
