import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SavedAnalysis from "@/models/SavedAnalysis";

export async function POST(req: NextRequest) {
  try {
    console.log("POST /api/save-analysis called");

    const { userEmail, repoData, repoUrl } = await req.json();
    console.log("Request data:", { userEmail, repoUrl });

    if (!userEmail || !repoData || !repoUrl) {
      console.log("Missing required fields");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log("Connecting to DB...");
    await connectDB();
    console.log("Connected to DB successfully");

    // Try to save the analysis, will fail if duplicate exists due to unique index
    const savedAnalysis = await SavedAnalysis.findOneAndUpdate(
      { userEmail, repoUrl },
      { repoData, savedAt: new Date() },
      { upsert: true, new: true }
    );
    console.log("Analysis saved:", savedAnalysis);

    return NextResponse.json({ message: "Analysis saved successfully", savedAnalysis });
  } catch (error) {
    console.error("Error saving analysis:", error);
    return NextResponse.json({ error: "Failed to save analysis", details: (error as Error).message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    console.log("GET /api/save-analysis called");

    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("userEmail");
    console.log("User email:", userEmail);

    if (!userEmail) {
      return NextResponse.json({ error: "User email required" }, { status: 400 });
    }

    console.log("Connecting to DB...");
    await connectDB();
    console.log("Connected to DB successfully");

    const savedAnalyses = await SavedAnalysis.find({ userEmail }).sort({ savedAt: -1 });
    console.log("Found saved analyses:", savedAnalyses.length);

    return NextResponse.json({ savedAnalyses });
  } catch (error) {
    console.error("Error fetching saved analyses:", error);
    return NextResponse.json({ error: "Failed to fetch saved analyses", details: (error as Error).message }, { status: 500 });
  }
}
