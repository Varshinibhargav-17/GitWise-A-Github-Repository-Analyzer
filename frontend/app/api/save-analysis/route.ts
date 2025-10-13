import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SavedAnalysis from "@/models/SavedAnalysis";

export async function POST(req: NextRequest) {
  try {
    const { userEmail, repoData, repoUrl } = await req.json();

    if (!userEmail || !repoData || !repoUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();

    // Try to save the analysis, will fail if duplicate exists due to unique index
    const savedAnalysis = await SavedAnalysis.findOneAndUpdate(
      { userEmail, repoUrl },
      { repoData, savedAt: new Date() },
      { upsert: true, new: true }
    );

    return NextResponse.json({ message: "Analysis saved successfully", savedAnalysis });
  } catch (error) {
    console.error("Error saving analysis:", error);
    return NextResponse.json({ error: "Failed to save analysis" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("userEmail");

    if (!userEmail) {
      return NextResponse.json({ error: "User email required" }, { status: 400 });
    }

    await connectDB();

    const savedAnalyses = await SavedAnalysis.find({ userEmail }).sort({ savedAt: -1 });

    return NextResponse.json({ savedAnalyses });
  } catch (error) {
    console.error("Error fetching saved analyses:", error);
    return NextResponse.json({ error: "Failed to fetch saved analyses" }, { status: 500 });
  }
}
