import type { Metadata } from "next";
import NoteProvider from "@/context/NoteContext";
import { Plus_Jakarta_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Notes Page",
    description: "Sticky Notes",
};

const fontSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-sans"
  });

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
