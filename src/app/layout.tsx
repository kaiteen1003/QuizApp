import "./globals.css";
import { Poppins } from "next/font/google";
import { Header } from "@/app/Header";
import { LanguageProvider } from "@/contexts/LanguageContext";

const poppins = Poppins({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={poppins.className}>
        <LanguageProvider>
          <main>{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
