import { NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { auth } from "@/auth";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const session = await auth();
        // Allow upload if generic user for now, or restrict to ADMIN
        if (!session || session.user.role !== "ADMIN") {
          return new NextResponse("Unauthorized", { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return new NextResponse("No file uploaded", { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const filename = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;
        const uploadDir = path.join(process.cwd(), "public/uploads");
        const filepath = path.join(uploadDir, filename);

        await writeFile(filepath, buffer);

        const fileUrl = `/uploads/${filename}`;

        return NextResponse.json({ url: fileUrl });
    } catch (error) {
        console.log("[UPLOAD_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await auth();
        if (!session || session.user?.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { url } = await req.json();
        if (!url) return new NextResponse("URL required", { status: 400 });

        const filename = url.split("/uploads/")[1];
        if (!filename) return new NextResponse("Invalid URL", { status: 400 });

        const filepath = path.join(process.cwd(), "public/uploads", filename);

        try {
            await unlink(filepath);
        } catch (e) {
            console.log("File not found or already deleted");
        }

        return new NextResponse("File deleted");
    } catch (error) {
        console.log("[UPLOAD_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
