# Customer Portal Demo

A professional, customer-facing construction project dashboard that provides real-time visibility into multi-site rollouts. Built with React, TypeScript, and Tailwind CSS.

**🔗 Live Demo:** [apps.jesseprojects.com/customer-portal](https://apps.jesseprojects.com/customer-portal/)

---

## Overview

This application demonstrates how construction companies can provide their customers with transparent, real-time project visibility. Instead of spending hours manually creating status reports, give customers direct access to a clean, professional dashboard.

### The Problem

Construction project managers spend 2+ hours per week:
- Creating PowerPoint status reports
- Updating Excel spreadsheets
- Sending email updates to customers
- Answering "How's the project going?" calls

### The Solution

A customer-facing portal that provides:
- **Real-time financial transparency** - Contract value, invoiced amounts, payment status
- **Interactive project tracking** - Progress charts, location maps, completion percentages
- **Proactive communication** - RFIs, submittals, and action items in one place
- **Professional presentation** - PowerBI-style dashboards that build trust

---

## Features

### 📊 Financial Overview
- Contract value and budget breakdown
- Amount invoiced vs. paid tracking
- Remaining balance with visual indicators
- Financial summary charts (pie/donut)

### 📈 Progress Tracking
- Planned vs. actual progress charts
- Month-by-month completion tracking
- Visual indicators for schedule adherence

### 🗺️ Interactive Map
- Geographic view of all project locations
- Color-coded status indicators (complete, in progress, not started)
- Click pins for detailed location information

### 📍 Location Management
- Sortable table of all project locations
- Progress bars for each location
- Completion percentages and last updated timestamps

### 📋 Project Activity
- **RFIs** (Requests for Information) - Track open questions and responses
- **Submittals** - Monitor equipment and material approval status
- **Action Items** - View upcoming milestones and next steps

### 🎨 User Experience
- **Dark mode toggle** - Persists preference to localStorage
- **Responsive design** - Works on desktop, tablet, and mobile
- **Professional aesthetic** - Clean PowerBI-style interface
- **Fast performance** - Static build, no backend required

---

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety and developer experience
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Beautiful, responsive charts
- **Leaflet** - Interactive maps
- **Lucide React** - Icon library

---

## Project Structure

```
customer-portal/
├── public/
│   └── data/
│       └── projects.json              # Mock project data
├── src/
│   ├── components/
│   │   ├── ProjectSelector.tsx        # Project dropdown
│   │   ├── OverviewCards.tsx          # Financial summary cards
│   │   ├── ProgressChart.tsx          # Planned vs actual timeline
│   │   ├── FinancialChart.tsx         # Budget breakdown (donut chart)
│   │   ├── LocationMap.tsx            # Interactive map
│   │   ├── LocationTable.tsx          # Location list view
│   │   ├── RFIList.tsx                # RFIs table
│   │   ├── SubmittalList.tsx          # Submittals table
│   │   └── ActionItemList.tsx         # Action items table
│   ├── lib/
│   │   └── utils.ts                   # Helper functions
│   ├── types/
│   │   └── project.ts                 # TypeScript types
│   ├── App.tsx                        # Main app with layout
│   ├── main.tsx                       # Entry point
│   └── index.css                      # Tailwind + custom styles
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: 18 LTS)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/customer-portal-demo.git
cd customer-portal-demo

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/customer-portal/` to see the app running.

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory, ready for deployment.

---

## Mock Data

The application uses static JSON data with 3 sample projects:

1. **Starbucks - Pacific Northwest Store Expansion** (5 locations)
2. **Dollar Tree - Southeast Retail Rollout** (5 locations)
3. **Target - West Coast Equipment Upgrades** (4 locations)

To customize the data, edit `public/data/projects.json`.

### Data Structure

```typescript
interface Project {
  id: string
  name: string
  customer: string
  status: 'On Track' | 'At Risk' | 'Behind'
  startDate: string
  endDate: string
  contract: {
    total: number
    invoiced: number
    paid: number
    remaining: number
  }
  locations: Location[]
  rfis: RFI[]
  submittals: Submittal[]
  actionItems: ActionItem[]
  progress: ProgressData[]
}
```

See `src/types/project.ts` for complete type definitions.

---

## Deployment

### Static Hosting

This is a static site that can be deployed anywhere:

- **Vercel** - `vercel deploy`
- **Netlify** - Drag and drop `dist/` folder
- **GitHub Pages** - Push `dist/` to `gh-pages` branch
- **AWS S3** - Upload `dist/` to S3 bucket
- **Self-hosted** - Serve `dist/` with nginx, Apache, or Caddy

### Traefik (VPS)

If using Traefik reverse proxy:

1. Build: `npm run build`
2. Copy `dist/` to your server
3. Configure Traefik route for `/customer-portal`

Example Traefik labels:
```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.customer-portal.rule=Host(`apps.example.com`) && PathPrefix(`/customer-portal`)"
  - "traefik.http.services.customer-portal.loadbalancer.server.port=80"
```

---

## Customization

### Branding

Replace the logo in the header:

```tsx
// src/App.tsx
<img
  src="../resources/logos/your-logo.svg"
  alt="Your Company"
  className="h-12 w-12"
/>
```

### Colors

Update Tailwind CSS variables in `src/index.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96.1%;
  /* ... customize other colors */
}
```

### Dark Mode

Dark mode is enabled by default. The toggle button is in the header. Users' preferences are saved to localStorage.

To disable dark mode, remove the toggle button from `src/App.tsx` and remove dark mode classes from components.

---

## Use Cases

### For Construction Companies
- Provide customers with 24/7 access to project status
- Reduce manual reporting time by 80%
- Build trust through transparency
- Win more contracts by demonstrating technological sophistication

### For Facility Managers
- Track multiple projects across different locations
- Monitor budget and schedule adherence
- Stay informed without constant status calls
- Download reports for internal stakeholders

### For General Contractors
- Differentiate from competitors who can't provide real-time visibility
- Reduce customer anxiety about project status
- Proactively communicate issues before customers ask
- Build long-term relationships through transparency

---

## Roadmap

### Phase 1 - Static Demo ✅
- [x] React + TypeScript + Vite setup
- [x] Mock data with 3 sample projects
- [x] All dashboard components
- [x] Dark mode support
- [x] Responsive design

### Phase 2 - Backend Integration (Future)
- [ ] PocketBase or SQLite backend
- [ ] Real-time data updates
- [ ] User authentication (per customer)
- [ ] Email notifications for RFI responses

### Phase 3 - Production Features (Future)
- [ ] Document upload/download
- [ ] PDF report generation
- [ ] Mobile app (React Native)
- [ ] Advanced analytics and reporting

---

## Contributing

Contributions are welcome! If you'd like to improve this demo:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Built by [JesseProjects](https://jesseprojects.com)
- Inspired by real challenges in construction project management
- Designed to demonstrate the power of customer-facing transparency

---

## Contact

**Jesse** - Solutions Architect & Developer

- Website: [jesseprojects.com](https://jesseprojects.com)
- LinkedIn: [linkedin.com/in/jesse-projects](https://linkedin.com/in/jesse-projects)
- Email: hello@jesseprojects.com

---

## Screenshots

### Light Mode
*(Coming soon - add screenshot here)*

### Dark Mode
*(Coming soon - add screenshot here)*

### Mobile View
*(Coming soon - add screenshot here)*

---

**⭐ If this demo helped you, consider giving it a star on GitHub!**
