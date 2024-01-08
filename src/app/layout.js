import React from "react";
import "./globals.css";

function Layout({ children }) {
  return (
    <div className="flex flex-col w-screen md:flex-row">
      <main>{children}</main>
    </div>
  );
}

export default Layout;
