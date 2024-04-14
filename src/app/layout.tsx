import "~/styles/globals.css";

import { Inter } from "next/font/google";
import Navbar from "./_components/_navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Ecommerce ",
  description: "Ecommerce",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <Navbar />
        <ToastContainer position="top-center" />

        {children}
      </body>
    </html>
  );
}
