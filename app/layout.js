"use client";
import "./globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import Nav from "./FixedComponent/Nav";
import { Footer } from "./FixedComponent/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <Toaster position="top-center" />
              <Nav />
              {children}
              <Footer />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
