import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./_components/navbar/Navbar";
import { Toaster } from "@/components/ui/toast";
import MySessionProvider from "./_components/mySessionProvider/MySessionProvider";
import Footer from "./_components/footer/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth";
import { CartContextProvider } from "@/context/CartContext";
import { WishlistContextProvider } from "@/context/WishlistContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const freshCartIconSvg = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <rect width="64" height="64" rx="16" fill="#10b981"/>
    <path d="M16 20h6l5 18h20l5-13H25" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="29" cy="45" r="3.5" fill="#ffffff"/>
    <circle cx="45" cy="45" r="3.5" fill="#ffffff"/>
    <circle cx="46" cy="18" r="5" fill="#dcfce7"/>
  </svg>`
);

export const metadata: Metadata = {
  title: {
    default: "FreshCart",
    template: "%s | FreshCart",
  },
  description:
    "FreshCart — shop fresh groceries, electronics, fashion, and daily essentials with fast delivery.",
  icons: {
    icon: `data:image/svg+xml,${freshCartIconSvg}`,
    shortcut: `data:image/svg+xml,${freshCartIconSvg}`,
    apple: `data:image/svg+xml,${freshCartIconSvg}`,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className=" flex flex-col min-h-screen" suppressHydrationWarning>
        <MySessionProvider mySession={session}>
          <CartContextProvider>
            <WishlistContextProvider>
              <Navbar />

              <main className="grow">{children}</main>

              <Toaster />

              <Footer />
            </WishlistContextProvider>
          </CartContextProvider>
        </MySessionProvider>
      </body>
    </html>
  );
}