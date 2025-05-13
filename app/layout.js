"use client";
import "./globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import Nav from "./FixedComponent/Nav";
import { Footer } from "./FixedComponent/Footer";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AuthProvider>
            <Nav />
            {children}
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
