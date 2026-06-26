import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScamCheck",
  description: "Công cụ hỗ trợ nhận diện rủi ro lừa đảo trực tuyến.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-canvas text-body font-sans">
        {children}
      </body>
    </html>
  );
}
