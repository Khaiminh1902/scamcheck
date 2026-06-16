import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ScamCheck - Công cụ kiểm tra tin nhắn lừa đảo",
  description: "Công cụ kiểm tra nhanh tin nhắn nghi ngờ lừa đảo qua SMS, Zalo, Messenger, Email dành cho người lớn tuổi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cosmos-off-white font-serif text-cosmos-black">
        {children}
      </body>
    </html>
  );
}
