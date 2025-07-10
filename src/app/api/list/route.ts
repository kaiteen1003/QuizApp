// quiz-app/src/app/api/list/route.ts

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const imageDir = path.join(process.cwd(), "public", "input");

  try {
    const files = fs
      .readdirSync(imageDir)
      .filter((file) => file.toLowerCase().match(/\.(jpg|jpeg|png)$/));

    return NextResponse.json(files);
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to list files" },
      { status: 500 }
    );
  }
}
