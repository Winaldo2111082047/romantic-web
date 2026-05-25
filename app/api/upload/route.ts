import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    // Validasi: File harus ada
    if (!file) {
      return NextResponse.json(
        { error: "Tidak ada gambar yang ditemukan." },
        { status: 400 }
      );
    }

    // Validasi: Hanya gambar
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File harus berupa gambar (JPG, PNG, WEBP)." },
        { status: 400 }
      );
    }

    // Validasi: Maks 5MB
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Ukuran gambar harus kurang dari 5MB." },
        { status: 400 }
      );
    }

    // Konversi file ke Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload ke Cloudinary & dapatkan secure_url
    const secureUrl = await uploadToCloudinary(buffer, file.name);

    // Simpan URL ke PostgreSQL via Prisma
    const uploadRecord = await prisma.upload.create({
      data: {
        imageUrl: secureUrl,
      },
    });

    return NextResponse.json({ success: true, data: uploadRecord });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Gagal mengunggah gambar. Silakan coba lagi." },
      { status: 500 }
    );
  }
}
