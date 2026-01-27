# BestUSTax - Quick Start Guide

## Get Up and Running in 5 Minutes

### Prerequisites
- Node.js 18 or higher
- npm, yarn, or pnpm

### Step 1: Navigate to Project
```bash
cd /var/bestustax
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install all required packages:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Phosphor Icons
- And more...

### Step 3: Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 4: Start Exploring

#### Homepage Features
- **Hero Section**: Animated background, 3D tax form, CTAs
- **Services Grid**: 5 tax services with hover effects
- **Tax Calculator**: Interactive refund estimator
- **Trust Indicators**: Stats and credibility markers

#### Navigation
- Click **Services** to see dropdown menu
- Try **Tax Tools** for calculator options
- Toggle dark/light mode with the theme switcher
- Test mobile responsiveness (hamburger menu)

### Project Structure Quick Reference

```
src/
├── app/                    # Pages (Next.js App Router)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── services/          # Service pages
├── components/            # React components
│   ├── ui/               # Reusable UI (Button, Card, Input)
│   ├── layout/           # Layout components (Navbar, Footer)
│   ├── animations/       # Animation components
│   ├── calculators/      # Tax calculators
│   └── home/             # Homepage sections
├── hooks/                # Custom hooks
├── lib/                  # Utilities
├── styles/               # Global styles
└── types/                # TypeScript types
```

### Common Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript check
```

### Quick Customization

#### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  dark: {
    accent: {
      primary: '#YOUR_COLOR',  // Change accent color
    }
  }
}
```

#### Update Navigation
Edit `src/components/layout/Navbar.tsx`:
```typescript
const navigation: NavLink[] = [
  // Add/remove/modify navigation items
]
```

#### Modify Homepage
Edit `src/app/page.tsx` to change homepage content.

#### Add New Page
Create file in `src/app/your-page/page.tsx`:
```typescript
export default function YourPage() {
  return <div>Your content</div>
}
```

### What's Already Built

✅ Complete design system
✅ Dark/light mode
✅ Responsive navigation
✅ Animated homepage
✅ Tax calculator
✅ Service pages
✅ Footer with newsletter
✅ SEO optimization
✅ TypeScript types
✅ Reusable components

### Next Steps

1. **Customize Content**: Update text, images, and branding
2. **Add Pages**: Create additional service and resource pages
3. **Integrate CMS**: Connect Sanity or Strapi for content management
4. **Add Authentication**: Implement client portal with NextAuth
5. **Payment Integration**: Add Stripe for payment processing
6. **Analytics**: Set up Google Analytics tracking
7. **Deploy**: Push to Vercel or your hosting platform

### Environment Variables

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration.

### Need Help?

- **README.md** - Full documentation
- **PROJECT_SUMMARY.md** - Detailed project overview
- **Component Files** - Well-commented code

### Testing Checklist

- [ ] Homepage loads correctly
- [ ] Dark/light mode toggle works
- [ ] Navigation dropdowns function
- [ ] Mobile menu opens/closes
- [ ] Tax calculator computes results
- [ ] Service cards have hover effects
- [ ] Footer links are accessible
- [ ] Responsive on mobile/tablet/desktop

### Pro Tips

1. **Use TypeScript**: Types are defined in `src/types/index.ts`
2. **Component Library**: Check `src/components/ui/` for reusable components
3. **Animations**: Framer Motion examples in hero and cards
4. **Styling**: Use Tailwind utility classes + custom CSS in `globals.css`
5. **Icons**: Import from `@phosphor-icons/react`

### Performance

The site is optimized for:
- Fast initial load
- Smooth animations
- Code splitting
- Image optimization (when images added)
- Font optimization

### Browser Support

Tested on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

**You're all set!** Start customizing and building your tax website. 🚀
