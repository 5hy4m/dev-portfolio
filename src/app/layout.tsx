import "./globals.css";

import localFont from "@next/font/local";

const myLocalFont = localFont({
  src: "../../public/fonts/NimbusSanL-Reg.otf",
});

export const metadata = {
  title: "Shyam Kumar",
  description: "My personal portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="">
      <body className={myLocalFont.className + " h-screen"}>{children}</body>
    </html>
  );
}
