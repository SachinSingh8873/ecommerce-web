import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export const dynamic = 'force-dynamic';


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, description, price, category, images } = body;

        if (!name || !price || !category || !description || !images) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price,
                category,
                images,
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.log('[PRODUCTS_POST]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get("categoryId") || undefined;
        // Basic filtering example
        // Access prisma using global singleton
        const products = await prisma.product.findMany({
            where: {
                category: categoryId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return NextResponse.json(products);
    } catch (error) {
        console.log('[PRODUCTS_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
