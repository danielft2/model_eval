import type { Metadata } from "next";
import { Raleway, Work_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { AlertCircle, CircleCheck } from "lucide-react";
import { IndeterminateBar } from "@/components/ui/indeterminate-bar";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "model.eval",
  description:
    "Avalie o desempenho do seu modelo Flan/T5 na geração de questões educacionais com rapidez e simplicidade. Ferramenta prática para análise e aprimoramento de modelos de linguagem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${workSans.variable} ${raleway.variable} antialiased overflow-hidden`}>
        {children}
        <Toaster
          className="-tracking-wider font-heading"
          icons={{
            success: <CircleCheck size={18} className="text-green-700"/>,
            error: <AlertCircle size={18} className="text-red-700"/>,
          }}
          toastOptions={{
            unstyled: true,
            duration: 5000,
            classNames: {
              toast: "flex items-center space-x-4 bg-white shadow-md rounded-lg p-4 border min-w-[365px]",
              title: "text-slate-800 text-sm",
              description: "text-slate-600 text-sm",
              actionButton:
               `border border-slate-300 whitespace-nowrap text-sm text-slate-900 
                rounded-md h-[32px] px-3 hover:bg-slate-100 transition-colors`
            },
          }}
        />

        <IndeterminateBar />
      </body>
    </html>
  );
}
