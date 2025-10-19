import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET: Fetch all tasks for the logged-in user
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("pracsphere");
    const tasks = await db
      .collection("tasks")
      .find({ userId: new ObjectId(session.user.id) })
      .sort({ createdAt: -1 }) // Show newest tasks first
      .toArray();
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

// POST: Create a new task for the logged-in user
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, description, dueDate } = await request.json();
    if (!title) {
      return NextResponse.json({ message: "Title is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("pracsphere");

    const newTask = {
      title,
      description: description || "",
      dueDate: dueDate || null,
      status: "pending",
      userId: new ObjectId(session.user.id),
      createdAt: new Date(),
    };

    const result = await db.collection("tasks").insertOne(newTask);
    return NextResponse.json({ ...newTask, _id: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}