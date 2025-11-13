import { WebhookEvent } from '@clerk/nextjs/server';
import { EventType } from './../../../../node_modules/svix/src/api/eventType';
import { Webhook } from "svix";
import { create } from 'domain';
import createUser from '@/lib/actions/user.actions';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';


export async function POST(req: Request) {
  const svix_id = headers().get("svix-id") ?? "";
  const svix_timestamp = headers().get("svix-timestamp") ?? "";
  const svix_signature = headers().get("svix-signature") ?? "";

  if(!process.env.WEBHOOK_SECRET) {
    throw new Error("WEBHOOK_SECRET is not defined");
  }
  if(!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Bad Request", { status: 400 });
  }
  const payload = await req.json();
  const body = JSON.stringify(payload);

  const sivx = new Webhook(process.env.WEBHOOK_SECRET);

  let msg:WebhookEvent;

  try {
    msg = sivx.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    return new Response("Bad Request", { status: 400 });
  }
const EventType = msg.type;
 if(EventType === "user.created") {
  const {id,username,email_addresses,image_url} = msg.data;
  const user = await createUser({
    clerkId: id,
    username: username!,
    name: username!,
    email: email_addresses[0].email_address,
    avatar: image_url,
  })
    return NextResponse.json({ message: "OK", user });
 }

  // Rest



  return new Response("OK", { status: 200 });
}
