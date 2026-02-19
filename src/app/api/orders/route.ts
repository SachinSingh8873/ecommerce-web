import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { items, totalAmount, shippingDetails } = body;

        if (!items || items.length === 0) {
            return new NextResponse("No items in order", { status: 400 });
        }

        const order = await prisma.order.create({
            data: {
                totalAmount,
                status: "Pending",
                shippingDetails,
                products: items // Storing as JSON
            }
        });

        return NextResponse.json(order);
    } catch (error) {
        console.log('[ORDERS_POST]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
