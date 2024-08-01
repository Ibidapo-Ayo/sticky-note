import type { Metadata } from "next";
import NoteProvider from "@/context/NoteContext";

export const metadata: Metadata = {
    title: "Notes Page",
    description: "Sticky Notes",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={"min-h-screen font-sans antialiased bg-dark-300"}>
                <NoteProvider>
                    {children}
                </NoteProvider>
            </body>
        </html>

    );
}
