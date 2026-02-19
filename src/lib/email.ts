import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOrderConfirmationEmail = async (
  email: string,
  orderData: {
    orderId: string;
    orderNumber: string;
    totalAmount: number;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
    shippingDetails: {
      name: string;
      address: string;
      city: string;
      zip: string;
    };
  }
) => {
  try {
    const itemsList = orderData.items
      .map((item) => `${item.name} (Qty: ${item.quantity}) - $${item.price.toFixed(2)}`)
      .join("\n");

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1e3a5f; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f8fafc; padding: 20px; }
            .order-details { background-color: white; padding: 15px; margin: 15px 0; border-radius: 8px; border: 1px solid #e2e8f0; }
            .order-number { font-size: 24px; font-weight: bold; color: #1e3a5f; }
            .items-list { white-space: pre-wrap; font-family: monospace; background-color: #f1f5f9; padding: 10px; border-radius: 4px; margin: 10px 0; }
            .total { font-size: 18px; font-weight: bold; color: #10b981; text-align: right; margin-top: 15px; }
            .footer { background-color: #1e3a5f; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
            .button { display: inline-block; background-color: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 15px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>YesDeal</h1>
              <p>Order Confirmation</p>
            </div>
            
            <div class="content">
              <p>Hi ${orderData.shippingDetails.name},</p>
              <p>Thank you for your order! We're excited to process and ship your items.</p>
              
              <div class="order-details">
                <p><strong>Order Number:</strong> <span class="order-number">#${orderData.orderNumber}</span></p>
                <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
              </div>

              <div class="order-details">
                <h3 style="margin-top: 0;">Order Items</h3>
                <div class="items-list">${itemsList}</div>
                <div class="total">Total: $${orderData.totalAmount.toFixed(2)}</div>
              </div>

              <div class="order-details">
                <h3 style="margin-top: 0;">Shipping Address</h3>
                <p>
                  ${orderData.shippingDetails.name}<br>
                  ${orderData.shippingDetails.address}<br>
                  ${orderData.shippingDetails.city}, ${orderData.shippingDetails.zip}
                </p>
              </div>

              <p>You can track your order by visiting your account dashboard on our website. We'll send you shipping updates as soon as your order is dispatched.</p>
              
              <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://yesdeal.com"}/orders/${orderData.orderId}" class="button">View Order Details</a>

              <p style="margin-top: 30px; color: #666;">If you have any questions, please don't hesitate to contact us at support@yesdeal.com</p>
            </div>

            <div class="footer">
              <p>&copy; 2024 YesDeal. All rights reserved.</p>
              <p>This is an automated email. Please do not reply to this address.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const response = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "noreply@yesdeal.com",
      to: email,
      subject: `Order Confirmation - YesDeal #${orderData.orderNumber}`,
      html: emailHtml,
    });

    return { success: true, messageId: response.data?.id };
  } catch (error) {
    console.error("Failed to send order confirmation email:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
};

export const sendWelcomeEmail = async (email: string, name?: string) => {
  try {
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1e3a5f; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f8fafc; padding: 20px; }
            .button { display: inline-block; background-color: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 15px; }
            .footer { background-color: #1e3a5f; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to YesDeal</h1>
            </div>
            
            <div class="content">
              <p>Hi ${name || "there"},</p>
              <p>Welcome to YesDeal! We're thrilled to have you on board. Get ready to discover premium products and exceptional quality.</p>
              
              <p>Here's what you can do next:</p>
              <ul>
                <li>Browse our curated collection of premium products</li>
                <li>Add items to your wishlist</li>
                <li>Enjoy free shipping on orders over $250</li>
                <li>Track your orders in real-time</li>
              </ul>

              <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://yesdeal.com"}/products" class="button">Start Shopping</a>

              <p style="margin-top: 30px; color: #666;">If you have any questions, feel free to reach out to us at support@yesdeal.com</p>
            </div>

            <div class="footer">
              <p>&copy; 2024 YesDeal. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const response = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "noreply@yesdeal.com",
      to: email,
      subject: "Welcome to YesDeal!",
      html: emailHtml,
    });

    return { success: true, messageId: response.data?.id };
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
};
