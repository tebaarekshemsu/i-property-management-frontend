import type React from "react";
import { Header } from "@/components/reusable/header";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { cookies } from "next/headers";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("lang")?.value || "en") as "en" | "am";

  return (
    <LanguageProvider lang={lang}>
      <Header />
      <div style={{ marginTop: "20px" }}>{children}</div>
    </LanguageProvider>
  );
}
