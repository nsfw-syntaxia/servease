import { DM_Sans } from "next/font/google";
import { Benne } from "next/font/google";
import "./styles/globals.css";

const DmSansFont = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const BenneFont = Benne({
  weight: "400",
  variable: "--font-benne",
  subsets: ["latin"],
});

export const metadata = {
  title: "servease"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${DmSansFont.variable} ${BenneFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
