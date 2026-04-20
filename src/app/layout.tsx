import type { Metadata } from "next";
import "./globals.css";
import { Oxanium, Raleway } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const ralewayHeading = Raleway({ subsets: ['latin'], variable: '--font-heading' });

const oxanium = Oxanium({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "Ridwan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", "font-sans", oxanium.variable, ralewayHeading.variable)}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
