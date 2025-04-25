"use client";
import "./globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import Nav from "./FixedComponent/Nav";
import { Footer } from "./FixedComponent/Footer";



export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body
      >
        <ThemeProvider>
          <Nav />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
