import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const galleryDir = path.join(process.cwd(), "public", "gallery");
    
    // Ensure directory exists
    if (!fs.existsSync(galleryDir)) {
      fs.mkdirSync(galleryDir, { recursive: true });
    }

    const files = fs.readdirSync(galleryDir);
    
    // Filter out only images and videos
    const mediaFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return [".png", ".jpg", ".jpeg", ".webp", ".gif", ".mp4", ".webm"].includes(ext);
    });

    const items = mediaFiles.map((file, index) => {
      const ext = path.extname(file).toLowerCase();
      const isVideo = [".mp4", ".webm"].includes(ext);
      
      // Try to generate a readable title from filename, removing extension and hyphens/underscores
      const title = file.replace(ext, "").replace(/[-_]/g, " ").replace(/\b\w/g, l => l.toUpperCase());

      return {
        id: `gal-${index}`,
        type: isVideo ? "video" : "image",
        url: `/gallery/${file}`,
        thumbnail: `/gallery/${file}`,
        title: title || "Gallery Media",
        category: "E-Cell Gallery"
      };
    });

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Failed to read gallery directory:", error);
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}
