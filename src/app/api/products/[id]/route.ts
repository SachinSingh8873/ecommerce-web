import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export const dynamic = 'force-dynamic';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        if (!id) return new NextResponse("Product ID required", { status: 400 });

        const product = await prisma.product.findUnique({
            where: { id }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.log('[PRODUCT_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const body = await req.json();
        const { name, description, price, category, images } = body;
        const { id } = await params;

        if (!id) return new NextResponse("Product ID required", { status: 400 });

        const product = await prisma.product.update({
            where: { id },
            data: {
                name,
                description,
                price,
                category,
                images
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.log('[PRODUCT_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (!id) return new NextResponse("Product ID required", { status: 400 });

        const product = await prisma.product.delete({
            where: { id }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.log('[PRODUCT_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
