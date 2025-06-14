import { firestore } from "firebase-admin";
import { initFirebaseAdminSDK } from "@/config/firebase-admin-config";
import { NextRequest, NextResponse } from "next/server";

initFirebaseAdminSDK();

const fsdb = firestore();

export async function GET() {
  try {
    // Query the 'emails' collection, order by 'internal_date' descending, limit to 10.
    const snapshot = await fsdb
      .collection("emails")
      .orderBy("internal_date", "desc")
      .limit(10)
      .get();

    const data = snapshot.docs.map((doc) => doc.data());
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
