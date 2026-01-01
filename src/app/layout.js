import Navbar from "@/components/common/Navbar";
import "./globals.css";
import { AuthProvider } from "@/contexts/authContext";

export const metadata = {
  title: "Bookify Project",
  description: "Biggest Online Book Store Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthProvider>
        <Navbar />
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
