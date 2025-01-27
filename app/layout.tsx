
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import AuthProvider from "@/providers/session-provider."

const font = localFont({
  src: "../assets/fonts/Obviously.otf",
  display: "swap",
  variable: "--font-obviously",
})

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: {
    default: "Eat Five Foods",
    template: "%s | Eat Five Foods",
  },
  description: "Discover and enjoy a variety of delicious foods with Eat Five Foods",
  keywords: ["food", "recipes", "healthy eating", "meal planning"],
  authors: [{ name: "Your Name", url: "https://yourwebsite.com" }],
  creator: "Your Name or Company",
  publisher: "Your Company Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eat5foods.vercel.app",
    title: "Eat Five Foods",
    description: "Discover and enjoy a variety of delicious foods with Eat Five Foods",
    siteName: "Eat Five Foods",
    images: [
      {
        url: "https://eat5foods.vercel.app/eat5foods.png",
        width: 1200,
        height: 630,
        alt: "Eat Five Foods - Delicious and Healthy Meals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eat Five Foods",
    description: "Discover and enjoy a variety of delicious foods with Eat Five Foods",
    images: ["https://eatfivefoods.vercel.app/eat5foods.png"],
    creator: "@onesamket",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/eat5foods.png",
    apple: "/eat5foods.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${font.variable} ${inter.variable}`}>
      <body className={font.className}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}