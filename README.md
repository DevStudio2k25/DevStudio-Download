# DevStudio Download

A modern, animated landing page for DevStudio built with Next.js 16, React 19, and Tailwind CSS.

## Features

- 🎨 12 Dynamic Animations for device mockups
- 📱 Fully Responsive Design
- 🌙 Modern Dark Theme
- ⚡ Fast Performance with Next.js 16
- 🎭 Smooth Transitions & Effects
- 📊 Multiple Pages (Home, Features, Gallery, Download, Changelog)

## Tech Stack

- **Framework:** Next.js 16
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **Components:** Radix UI + shadcn/ui
- **Icons:** Lucide React
- **Animations:** Custom CSS Animations

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/DevStudio2k25/DevStudio-Download.git
cd DevStudio-Download
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy to Vercel

### Option 1: Deploy via GitHub (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel
```

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── page.tsx         # Home page
│   ├── features/        # Features page
│   ├── gallery/         # Gallery pages
│   ├── download/        # Download page
│   └── changelog/       # Changelog page
├── components/          # React components
│   ├── hero.tsx        # Hero section with animations
│   ├── navbar.tsx      # Navigation bar
│   └── ui/             # UI components (shadcn)
├── public/             # Static assets
│   └── assets/         # Images and mockups
├── styles/             # Global styles
└── lib/                # Utility functions
```

## Environment Variables

Create a `.env.local` file if you need Supabase integration:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Build for Production

```bash
npm run build
npm start
```

## License

MIT License - feel free to use this project for your own purposes.

## Author

DevStudio Team

---

Made with ❤️ using Next.js and Tailwind CSS
