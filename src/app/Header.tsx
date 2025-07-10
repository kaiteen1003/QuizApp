"use client";

import { AppBar, Toolbar, Box, IconButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

interface Props {
  language: "ja" | "en";
  onToggleLanguage: () => void;
}

export function Header({ language, onToggleLanguage }: Props) {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#434242" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* 左側のアイコン */}
        <Box display="flex" alignItems="center">
          <Image
            src="/HeaderIcon.png"
            alt="Header Icon"
            width={60}
            height={60}
          />
        </Box>

        <div className="ml-auto flex gap-4 pr-8">
          <Link href="/" className="text-xl">
            Home
          </Link>
          <Link href="/view" className="text-xl">
            View
          </Link>
        </div>
        {/* 言語切り替えボタン */}
        <IconButton
          onClick={onToggleLanguage}
          sx={{
            color: "white",
            border: "1px solid white",
            fontSize: "0.8rem",
            px: 1.5,
            borderRadius: 1,
          }}
        >
          {language === "ja" ? "EN" : "JA"}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
