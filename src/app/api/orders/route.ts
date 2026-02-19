import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { sendOrderConfirmationEmail } from "@/lib/email";
import { auth } from "@/auth";
import { handleAPIError, APIError, createErrorResponse } from "@/lib/api-error";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { items, totalAmount, shippingDetails } = body;

        // Validate items
        if (!items || !Array.isArray(items) || items.length === 0) {
            throw new APIError(400, "Order must contain at least one item");
        }

        // Validate total amount
        if (typeof totalAmount !== "number" || totalAmount <= 0) {
            throw new APIError(400, "Total amount must be a positive number");
        }

        // Validate shipping details
        if (!shippingDetails || typeof shippingDetails !== "object") {
            throw new APIError(400, "Valid shipping details are required");
        }

        // Get current user session
        const session = await auth();

        // Create the order
        const order = await prisma.order.create({
            data: {
                totalAmount,
                status: "Pending",
                shippingDetails,
                products: items,
                userId: session?.user?.id,
            }
        });

        // Generate order number
        const orderNumber = `ORD-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}${order.id.slice(-6).toUpperCase()}`;

        // Send confirmation email
        try {
            if (shippingDetails?.email) {
                await sendOrderConfirmationEmail(shippingDetails.email, {
                    orderId: order.id,
                    orderNumber,
                    totalAmount,
                    items: items.map((item: any) => ({
                        name: item.productId || item.name || "Product",
                        quantity: item.quantity || 1,
                        price: item.price || 0,
                    })),
                    shippingDetails: {
                        name: shippingDetails.name || "Customer",
                        address: shippingDetails.address || "",
                        city: shippingDetails.city || "",
                        zip: shippingDetails.zip || "",
                    },
                });
            }
        } catch (emailError) {
            console.error("[EMAIL_ERROR]", emailError);
            // Don't fail the order if email fails, just log it
        }

        return NextResponse.json({
            ...order,
            orderNumber,
            message: "Order created successfully. Confirmation email sent."
        }, { status: 201 });
    } catch (error) {
        return handleAPIError(error);
    }
}

export async function GET(req: Request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            throw new APIError(401, "Unauthorized - Please log in");
        }

        const orders = await prisma.order.findMany({
            where: {
                userId: session.user.id,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(orders);
    } catch (error) {
        return handleAPIError(error);
    }
}
