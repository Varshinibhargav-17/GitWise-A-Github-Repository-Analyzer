import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SavedAnalysis from "@/models/SavedAnalysis";

export async function POST(req: NextRequest) {
  try {
    console.log("POST /api/save-analysis called");

    const body = await req.json();
    console.log("Raw request body received");

    const { userEmail, repoData, repoUrl } = body;
    console.log("Parsed request data:", { userEmail: userEmail ? "present" : "missing", repoUrl: repoUrl ? "present" : "missing", repoData: repoData ? "present" : "missing" });

    if (!userEmail || !repoData || !repoUrl) {
      console.log("Missing required fields:", { userEmail, repoUrl, hasRepoData: !!repoData });
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log("Connecting to DB...");
    await connectDB();
    console.log("Connected to DB successfully");

    console.log("Attempting to save analysis...");
    // Try to save the analysis, will fail if duplicate exists due to unique index
    const savedAnalysis = await SavedAnalysis.findOneAndUpdate(
      { userEmail, repoUrl },
      { repoData, savedAt: new Date() },
      { upsert: true, new: true }
    );
    console.log("Analysis saved successfully:", savedAnalysis._id);

    return NextResponse.json({ message: "Analysis saved successfully", savedAnalysis });
  } catch (error) {
    console.error("Error saving analysis:", error);
    console.error("Error stack:", (error as Error).stack);
    return NextResponse.json({
      error: "Failed to save analysis",
      details: (error as Error).message,
      type: (error as Error).name
    }, { status: 500 });
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
