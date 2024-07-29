import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NoteProvider from "@/context/NoteContext";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "Sticky Notes",
  description: "A sticky note project by Ibidapo Ayomide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body className={cn("min-h-screen font-sans antialiased bg-dark-300", fontSans.variable)}>
        <NoteProvider>
          {children}
        </NoteProvider>
      </body>
    </html>

  );
}
