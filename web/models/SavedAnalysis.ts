import mongoose from "mongoose";

const savedAnalysisSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    repoUrl: { type: String, required: true },
    repoData: { type: mongoose.Schema.Types.Mixed, required: true },
    savedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Create compound index for userEmail and repoUrl to prevent duplicates
savedAnalysisSchema.index({ userEmail: 1, repoUrl: 1 }, { unique: true });

export default mongoose.models.SavedAnalysis || mongoose.model("SavedAnalysis", savedAnalysisSchema);
