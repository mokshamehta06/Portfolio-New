# Moksha Mehta — Portfolio 🌸

A premium Barbie-themed (pink & white) developer portfolio built with **React + Vite**, **Tailwind CSS**, **GSAP**, and **Framer Motion**.

## 🚀 Getting Started

```bash
# 1. Install dependencies
pnpm install

# 2. Start development server
pnpm dev

# 3. Open in browser
# → http://localhost:5173
```

## 🏗️ Build for Production

```bash
pnpm build
pnpm preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Sticky glassmorphism navbar
│   ├── Hero.jsx            # Landing hero with GSAP animations
│   ├── About.jsx           # About section with stats
│   ├── Skills.jsx          # Skill categories with tags
│   ├── Projects.jsx        # Project cards with details
│   ├── Experience.jsx      # Timeline section
│   ├── Achievements.jsx    # Achievement cards
│   ├── CodingProfiles.jsx  # GitHub & LeetCode profiles
│   ├── Contact.jsx         # Contact form
│   ├── Footer.jsx          # Footer with links
│   ├── BackToTop.jsx       # Floating back-to-top button
│   └── Cursor.jsx          # Custom cursor
├── App.jsx
├── main.jsx
└── index.css               # Global styles & Barbie theme
```

## 🎨 Theme

- **Primary:** `#FF1F8E` (Hot Pink)
- **Accent:** `#FF69B4` (Barbie Pink)
- **Light:** `#FFB3D9` (Blush)
- **Background:** `#FFF5F9` (Cream)

## ✏️ Customization

Update these files to add real data:
- **GitHub URL:** Search for `href="https://github.com/"` in `Hero.jsx`
- **LinkedIn URL:** Search for `href="https://linkedin.com/"` in `Hero.jsx`
- **Resume:** Replace `href="#"` on the Download Resume button
- **Profile URLs:** Update in `CodingProfiles.jsx`
- **Project GitHub links:** Update `github` field in `Projects.jsx`
- **Contact info:** Update in `Contact.jsx`

