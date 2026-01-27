# BestUSTax - Modern Tax Website

A cutting-edge, interactive tax services website built with Next.js 14, featuring advanced animations, interactive elements, and modern web technologies.

## Features

- **Modern Design**: Sleek, professional UI with dark/light mode support
- **Advanced Animations**: Framer Motion, GSAP, and custom animations
- **Interactive Calculators**: Real-time tax refund estimation
- **Responsive**: Mobile-first design that works on all devices
- **SEO Optimized**: Built-in SEO best practices and metadata
- **Type-Safe**: Full TypeScript implementation
- **Performance**: Optimized for Core Web Vitals

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, GSAP
- **3D Graphics**: Three.js, React Three Fiber
- **Icons**: Phosphor Icons
- **Type Safety**: TypeScript
- **Theme**: next-themes for dark/light mode

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bestustax.git
cd bestustax
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
bestustax/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Input.tsx
│   │   ├── layout/            # Layout components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ThemeProvider.tsx
│   │   ├── animations/        # Animation components
│   │   ├── calculators/       # Tax calculator widgets
│   │   └── home/              # Homepage sections
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions
│   ├── styles/                # Global styles
│   ├── types/                 # TypeScript types
│   └── utils/                 # Helper functions
├── public/                    # Static assets
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── next.config.js            # Next.js configuration
```

## Key Components

### UI Components
- **Button**: Versatile button with multiple variants and animations
- **Card**: Flexible card component with 3D hover effects
- **Input**: Form input with validation and styling

### Layout Components
- **Navbar**: Responsive navigation with dropdown menus and theme toggle
- **Footer**: Comprehensive footer with links and newsletter signup
- **ThemeProvider**: Dark/light mode management

### Calculators
- **TaxCalculator**: Interactive tax refund estimator with real-time calculations

### Animations
- **FloatingNumbers**: Animated background elements
- **AnimatedCounter**: Scroll-triggered number animations

## Customization

### Theme Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  dark: {
    bg: {
      primary: '#0A0B0F',
      secondary: '#1A1B1F',
    },
    accent: {
      primary: '#00D9FF',
    },
    success: '#00FF88',
  },
  // ... light mode colors
}
```

### Navigation Links

Update navigation items in `src/components/layout/Navbar.tsx`:

```typescript
const navigation: NavLink[] = [
  {
    label: 'Services',
    href: '/services',
    subLinks: [...]
  },
  // ... more links
]
```

## Building for Production

```bash
npm run build
npm run start
```

## Performance Optimization

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- CSS optimization with Tailwind
- Font optimization with next/font
- Caching strategies

## SEO Features

- Structured metadata in layout.tsx
- OpenGraph tags for social sharing
- Twitter Card support
- Sitemap generation (add next-sitemap)
- robots.txt configuration

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- AWS Amplify
- Netlify
- Cloudflare Pages
- Docker containers

## Contributing

Contributions are welcome! Please read the contributing guidelines before submitting PRs.

## License

This project is proprietary software. All rights reserved.

## Support

For support, email info@bestustax.com or visit our website.

## Roadmap

- [ ] PWA support with offline functionality
- [ ] Client portal with authentication
- [ ] Document upload and management
- [ ] AI-powered tax assistant chatbot
- [ ] Multi-language support
- [ ] Integration with tax software APIs
- [ ] Mobile app (React Native)

## Acknowledgments

- Next.js team for the amazing framework
- Framer Motion for smooth animations
- Tailwind CSS for utility-first styling
- The open-source community

---

Built with ❤️ by the BestUSTax team
