import { firestore } from "firebase-admin";
import { initFirebaseAdminSDK } from "@/config/firebase-admin-config";
import { NextRequest, NextResponse } from "next/server";

initFirebaseAdminSDK();

const fsdb = firestore();

export async function GET() {
  try {
    const snapshot = await fsdb.collection("feeds").get();
    const data = snapshot.docs.map((doc) => doc.data());
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ error: "Missing 'id' field." }, { status: 400 });
    }

    await fsdb.collection("feeds").doc(body.id).set(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
