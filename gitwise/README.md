# 🔍 GitWise - GitHub Repository Analyzer

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Deployed](https://img.shields.io/badge/Deployed-Live-success)

> Comprehensive GitHub repository health analysis with intelligent metrics and actionable insights


## 🎯 Problem Statement

Developers and teams often struggle to assess repository health, identify technical debt, and understand contribution patterns. GitWise provides instant, actionable insights about any GitHub repository.

## ✨ Features

### 📊 Repository Health Score
- Overall health rating (0-100)
- Based on commit frequency, issue resolution, and code quality indicators
- Color-coded visual feedback

### 📈 Key Metrics Dashboard
- **Commit Activity**: Weekly/monthly trends
- **Issue Management**: Open vs closed ratio, avg resolution time
- **Pull Request Analytics**: Merge rate, review time
- **Contributor Analysis**: Active contributors, contribution distribution

### 🎨 Interactive Visualizations
- Commit history graph
- Language distribution pie chart
- Contributor activity heatmap
- Issue trends over time

### 🔍 Code Quality Insights
- Repository complexity score
- Documentation coverage
- Code duplication detection (if applicable)
- Dependency analysis

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Recharts / Chart.js (for visualizations)

**Backend:**
- GitHub REST API
- Vercel Serverless Functions

**Deployment:**
- Vercel

## 🚀 Quick Start

### Prerequisites
```bash
Node.js 18+
npm or yarn
GitHub Personal Access Token (optional, for higher rate limits)
```

### Installation
```bash
# Clone repository
git clone https://github.com/Varshinibhargav-17/GitWise-A-Github-Repository-Analyzer.git
cd GitWise-A-Github-Repository-Analyzer

# Install dependencies
npm install

# Create .env.local file
echo "GITHUB_TOKEN=your_token_here" > .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Usage

1. Enter any public GitHub repository URL
   - Example: `https://github.com/facebook/react`
2. Click "Analyze"
3. View comprehensive health report with metrics and visualizations


## 🧮 How It Works

1. **Input Parsing**: Extracts owner and repo name from URL
2. **API Calls**: Fetches data from multiple GitHub API endpoints
   - Repository info
   - Commits history
   - Issues and PRs
   - Contributors
   - Languages
3. **Data Processing**: Calculates health scores and metrics
4. **Visualization**: Renders interactive charts and insights

## 📊 Health Score Calculation
```typescript
Health Score = (
  Commit Frequency × 0.3 +
  Issue Resolution Rate × 0.25 +
  PR Merge Rate × 0.2 +
  Contributor Activity × 0.15 +
  Documentation Score × 0.1
) × 100
```

## 🔒 Privacy & Rate Limits

- **No data stored**: All analysis is real-time
- **GitHub API limits**: 60 req/hour (unauthenticated), 5000 req/hour (with token)
- **Public repos only**: Private repos require authentication

## 🚧 Limitations & Future Improvements

### Current Limitations
- Public repositories only
- Basic code quality metrics
- English language bias in documentation analysis

### Roadmap
- [ ] Support for private repositories
- [ ] Historical trend comparison
- [ ] Export reports as PDF
- [ ] Integration with GitLab, Bitbucket
- [ ] Machine learning-based code quality predictions
- [ ] Team collaboration features

## 🎓 Key Learnings

- **API Rate Limiting**: Implemented efficient caching to minimize API calls
- **Data Visualization**: Learned Recharts for responsive, interactive charts
- **Next.js App Router**: Leveraged server components for better performance
- **Error Handling**: Graceful fallbacks for API failures and edge cases

## 🐛 Known Issues

- Large repos (>10K commits) may take longer to analyze
- Rate limiting can occur with frequent analyses



## 🤝 Contributing

Contributions welcome! Please open an issue or PR.


---

⭐ Star this repo if you found it useful!
```

---
