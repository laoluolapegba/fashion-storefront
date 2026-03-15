import type { Database } from "@/types/database.types";
import type { CartItem } from "@/types/cart";
import { resend } from "@/lib/email/resend";

type OrderRow = Database["public"]["Tables"]["orders"]["Row"];

export async function sendOrderConfirmationEmail(
  order: OrderRow,
  items: CartItem[],
) {
  const reference = order.paystack_ref ?? order.id;
  const firstName = order.customer_name.split(" ")[0];
  const itemRows = items
    .map((item) => {
      const lineTotal = item.price * item.quantity;
      return `<tr>
        <td style="padding:8px 0;border-bottom:1px solid #F0EDE8;font-family:DM Sans,system-ui,sans-serif;font-size:13px;color:#2E2E2E;">${item.name}</td>
        <td style="padding:8px 0;border-bottom:1px solid #F0EDE8;font-family:DM Sans,system-ui,sans-serif;font-size:13px;color:#2E2E2E;">${item.size}</td>
        <td style="padding:8px 0;border-bottom:1px solid #F0EDE8;font-family:DM Sans,system-ui,sans-serif;font-size:13px;color:#2E2E2E;">${item.quantity}</td>
        <td style="padding:8px 0;border-bottom:1px solid #F0EDE8;font-family:DM Sans,system-ui,sans-serif;font-size:13px;color:#2E2E2E;">₦${item.price.toLocaleString("en-NG")}</td>
        <td style="padding:8px 0;border-bottom:1px solid #F0EDE8;font-family:DM Sans,system-ui,sans-serif;font-size:13px;color:#2E2E2E;">₦${lineTotal.toLocaleString("en-NG")}</td>
      </tr>`;
    })
    .join("");

  const html = `
  <div style="background:#FAF7F2;padding:20px;">
    <div style="max-width:640px;margin:0 auto;background:#FFFFFF;border:1px solid #F0EDE8;">
      <div style="background:#1A1208;padding:28px 24px;">
        <div style="font-family:Georgia,serif;font-size:32px;font-weight:300;color:#FFFFFF;letter-spacing:0.16em;">ELEVEN08</div>
        <div style="font-family:DM Sans,system-ui,sans-serif;font-size:13px;color:#F0EDE8;margin-top:8px;">Your order is confirmed.</div>
      </div>
      <div style="padding:24px;">
        <p style="margin:0 0 12px;font-family:DM Sans,system-ui,sans-serif;font-size:14px;color:#2E2E2E;">Thank you, ${firstName}.</p>
        <p style="margin:0 0 20px;font-family:DM Sans,system-ui,sans-serif;font-size:13px;color:#C4611A;">Order reference: ${reference}</p>
        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr>
              <th align="left" style="padding-bottom:8px;font-family:DM Sans,system-ui,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#6B6B6B;">Item</th>
              <th align="left" style="padding-bottom:8px;font-family:DM Sans,system-ui,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#6B6B6B;">Size</th>
              <th align="left" style="padding-bottom:8px;font-family:DM Sans,system-ui,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#6B6B6B;">Qty</th>
              <th align="left" style="padding-bottom:8px;font-family:DM Sans,system-ui,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#6B6B6B;">Unit</th>
              <th align="left" style="padding-bottom:8px;font-family:DM Sans,system-ui,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#6B6B6B;">Subtotal</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
        </table>
        <p style="margin:16px 0 0;font-family:DM Sans,system-ui,sans-serif;font-size:14px;color:#1A1208;">Total: ₦${Number(order.total_amount).toLocaleString("en-NG")}</p>
        <div style="margin-top:18px;padding:14px;background:#F5E6D8;border-left:3px solid #C4611A;">
          <p style="margin:0 0 8px;font-family:DM Sans,system-ui,sans-serif;font-size:12px;color:#2E2E2E;">Shipping Address</p>
          <p style="margin:0;font-family:DM Sans,system-ui,sans-serif;font-size:13px;color:#2E2E2E;line-height:1.6;">${order.shipping_address ?? "-"}, ${order.shipping_city ?? "-"}, ${order.shipping_state ?? "-"}, ${order.shipping_country ?? "Nigeria"}</p>
        </div>
        <p style="margin:16px 0 0;font-family:DM Sans,system-ui,sans-serif;font-size:13px;color:#2E2E2E;line-height:1.6;">Ready-to-wear orders are dispatched within 2–5 working days. You will receive a shipping notification once your order is on its way.</p>
        <p style="margin:10px 0 0;font-family:DM Sans,system-ui,sans-serif;font-size:13px;color:#2E2E2E;">Questions? Message us on WhatsApp: +234 703 000 0117</p>
      </div>
      <div style="background:#1A1208;padding:14px 24px;font-family:DM Sans,system-ui,sans-serif;font-size:12px;color:#FAF7F2;">© Eleven08. Lagos, Nigeria.</div>
    </div>
  </div>`;

  try {
    await resend.emails.send({
      from: "Eleven08 <orders@eleven08.com>",
      to: order.customer_email,
      subject: `Your Eleven08 order is confirmed — Ref: ${reference}`,
      html,
    });
  } catch (error) {
    console.error("Failed to send order confirmation email", error);
  }
}
