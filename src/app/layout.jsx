import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ModalWrapper from "@/components/modalWrapper/ModalWrapper";
import AuthProvider from "@/providers/AuthProvider";
import { Work_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const works_sans = Work_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Musify",
  description: "Cloned a music streaming website for learnig perpose!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${works_sans.className} bg-zinc-950`}>
        <AuthProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              className: "",
              style: {
                padding: "4px 8px",
                color: "white",
                backgroundColor: "rgb(63 63 70)",
              },
            }}
          />
          <ModalWrapper />
          <Sidebar>
            <Header />
            {children}
          </Sidebar>
        </AuthProvider>
      </body>
    </html>
  );
}
