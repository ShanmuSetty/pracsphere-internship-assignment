import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// PUT: Update the logged-in user's profile
export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name } = await request.json();
    if (!name) {
      return NextResponse.json({ message: "Name is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("pracsphere");

    // Find the user by their ID and update their name
    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(session.user.id) },
      { $set: { name } }
    );

    if (result.matchedCount === 0) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}