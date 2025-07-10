"use client";

import ImageManager from "@/components/ImageManager";
import { Header } from "../Header";
import { useState } from "react";

export default function ViewPage() {
  const [language, setLanguage] = useState<"ja" | "en">("ja");

  return (
    <>
      <Header
        language={language}
        onToggleLanguage={() =>
          setLanguage((prev) => (prev === "ja" ? "en" : "ja"))
        }
      />
      <ImageManager />
    </>
  );
}
