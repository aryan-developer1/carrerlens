# 🚀 CareerLens - Full Stack AI Career Coach

**CareerLens** is a comprehensive AI-powered career coaching platform that helps professionals advance their careers through personalized assessments, interview preparation, and intelligent recommendations.

## 🔥 Tech Stack

This project is built with cutting-edge technologies:

- **[Next.js 15](https://nextjs.org)** - React framework with App Router
- **[Neon DB](https://neon.tech)** - Serverless PostgreSQL database
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[Prisma](https://prisma.io)** - Next-generation ORM
- **[Inngest](https://inngest.com)** - Reliable background job processing
- **[Shadcn/ui](https://ui.shadcn.com)** - Beautiful and accessible UI components
- **[Clerk](https://clerk.com)** - Complete user management and authentication
- **[Google Generative AI](https://ai.google.dev)** - AI-powered career insights
- **[Framer Motion](https://framer.com/motion)** - Smooth animations and transitions

## ✨ Features

- 🤖 **AI-Powered Career Assessment** - Get personalized career recommendations
- 📊 **Interactive Dashboard** - Track your career progress and goals
- 🎯 **Interview Preparation** - Practice with AI-generated interview questions
- 📈 **Progress Tracking** - Monitor your skill development over time
- 🎨 **Modern UI/UX** - Beautiful, responsive design with dark/light theme support
- 🔐 **Secure Authentication** - Complete user management with Clerk
- ⚡ **Real-time Updates** - Background job processing with Inngest

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm
- Neon DB account
- Clerk account
- Google AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/carrerlens.git
   cd carrerlens
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Database
   DATABASE_URL="your-neon-db-connection-string"
   
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
   CLERK_SECRET_KEY="your-clerk-secret-key"
   
   # Google AI
   GOOGLE_AI_API_KEY="your-google-ai-api-key"
   
   # Inngest
   INNGEST_EVENT_KEY="your-inngest-event-key"
   INNGEST_SIGNING_KEY="your-inngest-signing-key"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
carrerlens/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── interview/         # Interview preparation
│   └── onboarding/        # User onboarding flow
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn/ui components
│   └── dashboard_components/ # Dashboard-specific components
├── lib/                   # Utility functions and configurations
│   ├── inngest/          # Background job functions
│   └── prisma.js         # Database client
├── prisma/               # Database schema and migrations
├── data/                 # Static data and configurations
└── schemas/              # Zod validation schemas
```

## 🛠️ Key Features Implementation

### AI Career Assessment
- Personalized questionnaires using React Hook Form and Zod validation
- AI-powered analysis using Google Generative AI
- Industry-specific recommendations

### Dashboard Analytics
- Interactive charts with Recharts
- Progress tracking and goal setting
- Real-time data updates

### Interview Preparation
- AI-generated interview questions
- Practice session tracking
- Performance analytics

### Background Processing
- Inngest functions for heavy computations
- Reliable job processing and retries
- Event-driven architecture

## 🎨 UI Components

Built with **Shadcn/ui** components including:
- Responsive navigation and layouts
- Interactive forms and dialogs
- Progress indicators and charts
- Accessible dropdown menus and accordions
- Beautiful loading states and animations

## 📱 Responsive Design

- Mobile-first approach with Tailwind CSS
- Dark/light theme support with next-themes
- Smooth animations with Framer Motion
- Optimized for all screen sizes

## 🚀 Deployment

### Deploy on Vercel

The easiest way to deploy CareerLens is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables
4. Deploy!

### Environment Setup

Make sure to configure all environment variables in your deployment platform:
- Database connection string
- Authentication keys
- API keys for AI services
- Inngest configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) for the amazing React framework
- [Shadcn](https://ui.shadcn.com) for the beautiful UI components
- [Neon](https://neon.tech) for the serverless database
- [Inngest](https://inngest.com) for reliable background jobs

---

**Built with ❤️ using Next.js, Neon DB, Tailwind, Prisma, Inngest, and Shadcn UI** 🔥🔥
