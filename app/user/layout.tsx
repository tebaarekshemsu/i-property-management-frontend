import type React from "react";
import { Header } from "@/components/reusable/header";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div style={{ marginTop: "20px" }}>{children}</div>
    </>
  );
}
