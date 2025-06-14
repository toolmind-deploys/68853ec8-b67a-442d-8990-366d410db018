import { firestore } from "firebase-admin";
import { initFirebaseAdminSDK } from "@/config/firebase-admin-config";
import { NextRequest, NextResponse } from "next/server";

initFirebaseAdminSDK();
const fsdb = firestore();

// Utility function to get the start of today's date in milliseconds or as a Firestore Timestamp.
function getStartOfToday(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  return start.getTime();
}

export async function GET(_req: NextRequest) {
  try {
    // Using query for all customers with createdAt >= startOfDay.
    // In actual practice, you would ensure 'createdAt' is stored as a Firestore Timestamp or a numeric date.
    const startOfDay = getStartOfToday();

    const snapshot = await fsdb
      .collection("customers")
      .where("createdAt", ">=", startOfDay)
      .get();

    const data = snapshot.docs.map((doc) => doc.data());
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
