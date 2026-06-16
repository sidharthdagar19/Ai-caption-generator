# Caption AI

AI-powered caption generation platform built with Next.js, TypeScript,
Clerk authentication, and Supabase.

> Generate engaging captions for your content quickly and efficiently.

## ✨ Features

-   🤖 AI-generated captions
-   🔐 User authentication with Clerk
-   ☁️ Data storage with Supabase
-   ⚡ Fast and responsive UI with Next.js
-   🎨 Modern styling with Tailwind CSS
-   📱 Mobile-friendly design

## 🛠️ Tech Stack

-   **Framework:** Next.js 16
-   **Language:** TypeScript
-   **Frontend:** React 19
-   **Authentication:** Clerk
-   **Database / Backend:** Supabase
-   **Styling:** Tailwind CSS 4


## 🚀 Getting Started

### Prerequisites

-   Node.js 20.9 or later
-   npm, pnpm, or yarn

### Installation

``` bash
git clone https://github.com/sidharthdagar19/Ai-caption-generator.git
cd Ai-caption-generator
npm install
```

### Environment Variables

Create a `.env.local` file:

``` env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

GROQ_API_KEY=your_groq_api_key
```

## ▶️ Development

Start the development server:

``` bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## 📦 Production

Build the project:

``` bash
npm run build
```

Start the production server:

``` bash
npm start
```

Run linting:

``` bash
npm run lint
```

## 🧠 How It Works

1.  Users authenticate with Clerk.
2.  Users submit prompts or content details.
3.  AI generates optimized captions.
4.  Captions are stored and managed with Supabase.

## 🗺️ Roadmap

-   [ ] Multiple caption styles
-   [ ] Platform-specific caption templates
-   [ ] Caption history
-   [ ] Export and sharing options
-   [ ] Team collaboration
-   [ ] Analytics dashboard

## 🤝 Contributing

1.  Fork the repository
2.  Create a feature branch
3.  Commit your changes
4.  Open a pull request

## 📄 License

MIT License
