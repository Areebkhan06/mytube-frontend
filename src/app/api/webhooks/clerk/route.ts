import { db } from "@/database";
import { users } from "@/database/schema";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { type, data } = evt;

    if (!data.id) {
      return new Response("Missing User id", { status: 400 });
    }

    switch (type) {
      case "user.created":
        await db.insert(users).values({
          clerkId: data.id,
          name: data.username || data.first_name || "New Channel",
          imageUrl: data.image_url,
        });
        break;

      case "user.updated":
        await db
          .update(users)
          .set({
            name: data.username || data.first_name || "Updated Channel",
            imageUrl: data.image_url,
            updatedAt: new Date(),
          })
          .where(eq(users.clerkId, data.id));
        break;

      case "user.deleted":
        await db.delete(users).where(eq(users.clerkId, users.id));
        break;
    }

    console.log(
      `Received webhook with ID ${data.id} and event type of ${type}`
    );
    console.log("Webhook payload:", evt.data);

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
