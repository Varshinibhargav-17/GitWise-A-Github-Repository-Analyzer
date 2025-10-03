import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { repoUrl } = await request.json();

    if (!repoUrl) {
      return NextResponse.json({ error: "Repo URL is required" }, { status: 400 });
    }

    // Parse the GitHub repo URL to get owner and repo name
    const urlMatch = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!urlMatch) {
      return NextResponse.json({ error: "Invalid GitHub repo URL" }, { status: 400 });
    }

    const owner = urlMatch[1];
    const repo = urlMatch[2];

    // Fetch repo data from GitHub API
    const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    if (!repoResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch repo data" }, { status: 500 });
    }
    const repoData = await repoResponse.json();

    // Fetch languages data
    const languagesResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`);
    const languagesData = languagesResponse.ok ? await languagesResponse.json() : {};

    // Process languages data
    const totalBytes = Object.values(languagesData).reduce((sum: number, bytes: any) => sum + bytes, 0) as number;
    const languages = Object.entries(languagesData).map(([name, bytes]: [string, any]) => ({
      name,
      value: Math.round((bytes / totalBytes) * 100),
    }));

    // Calculate health score (simple calculation based on stars, forks, issues)
    const healthScore = Math.min(100, Math.round(
      (repoData.stargazers_count * 0.4) +
      (repoData.forks_count * 0.3) +
      ((repoData.open_issues_count > 0 ? 100 / repoData.open_issues_count : 100) * 0.3)
    ));

    // Mock commits data (in a real app, fetch from GitHub API)
    const commits = [
      { month: "Jan", commits: 40 },
      { month: "Feb", commits: 55 },
      { month: "Mar", commits: 30 },
      { month: "Apr", commits: 80 },
      { month: "May", commits: 60 },
      { month: "Jun", commits: 45 },
    ];

    const result = {
      repo: {
        name: repoData.name,
        owner: repoData.owner.login,
        avatar: repoData.owner.avatar_url,
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        issues: repoData.open_issues_count,
        watchers: repoData.watchers_count,
        language: repoData.language,
        license: repoData.license?.name || "No License",
        lastUpdated: new Date(repoData.updated_at).toLocaleDateString(),
        healthScore,
      },
      languages,
      commits,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching repo data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
