import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { handleAPIError, APIError, createErrorResponse } from '@/lib/api-error';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, description, price, category, images } = body;

        // Validate required fields
        const missingFields = [];
        if (!name) missingFields.push("name");
        if (!price) missingFields.push("price");
        if (!category) missingFields.push("category");
        if (!description) missingFields.push("description");
        if (!images || !Array.isArray(images) || images.length === 0) missingFields.push("images");

        if (missingFields.length > 0) {
            throw new APIError(
                400,
                `Missing required fields: ${missingFields.join(", ")}`,
                { missingFields }
            );
        }

        // Validate field types and values
        if (typeof price !== "number" || price < 0) {
            throw new APIError(400, "Price must be a positive number");
        }

        if (typeof name !== "string" || name.trim().length < 2) {
            throw new APIError(400, "Product name must be at least 2 characters");
        }

        if (typeof description !== "string" || description.trim().length < 5) {
            throw new APIError(400, "Product description must be at least 5 characters");
        }

        const product = await prisma.product.create({
            data: {
                name: name.trim(),
                description: description.trim(),
                price,
                category: category.trim(),
                images,
            },
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        return handleAPIError(error);
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get("categoryId") || undefined;
        const limit = parseInt(searchParams.get("limit") || "50", 10);
        const offset = parseInt(searchParams.get("offset") || "0", 10);

        // Validate pagination params
        if (isNaN(limit) || limit < 1 || limit > 100) {
            throw new APIError(400, "Limit must be between 1 and 100");
        }

        if (isNaN(offset) || offset < 0) {
            throw new APIError(400, "Offset must be a non-negative number");
        }

        const products = await prisma.product.findMany({
            where: {
                ...(categoryId && { category: categoryId })
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: limit,
            skip: offset,
        });

        return NextResponse.json(products);
    } catch (error) {
        return handleAPIError(error);
    }
}
