import Navbar from "@/components/common/Navbar";
import "./globals.css";

export const metadata = {
  title: "Bookify Project",
  description: "Biggest Online Book Store Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
