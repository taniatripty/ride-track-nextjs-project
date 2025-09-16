import Navbar from "@/components/Navbar";
import NextAuthProviders from "@/providers/NextAuthProviders";
import { Poppins, Roboto } from "next/font/google";
import Footer from "./footer/page";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-title",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en"  >
      <body className={`${poppins.variable} ${roboto.variable}`}>
         
       <NextAuthProviders>
          <Navbar />

         {children}
         </NextAuthProviders>
        <Footer></Footer>
       
      </body>
    </html>
  );
}
