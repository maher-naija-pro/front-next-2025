# Next.js Project Setup Guide

This guide explains how to set up and use a [Next.js](https://nextjs.org) project with modern UI components and animations.

## 🚀 Quick Start

### Prerequisites

- Node.js (LTS version recommended)
- Git installed on your system
- Package manager (npm, yarn, pnpm, or bun)

## 📥 Option 1: Clone an Existing Project

If you want to use an existing Next.js project from a Git repository:

### 1. Clone the Project
```bash
# Clone the repository
git clone https://github.com/Amperon-Technologies/frontend.git

# Navigate to the project folder
cd frontend
```

### 2. Install Dependencies
```bash
# With npm
npm install

# Or with yarn
yarn install

# Or with pnpm
pnpm install

# Or with bun
bun install
```

### 3. Environment Setup
```bash
# Copy the example environment file 
cp .env.example .env

# Edit environment variables according to your needs
nano .env 
```

### 4. Launch the Project
```bash
# Start the development server
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🆕 Option 2: Create a New Project

### 1. Install Node.js with NVM (recommended)
```bash
# Download and install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Reload shell and verify installation
source ~/.bashrc  # or restart your terminal
nvm --version

# Install and use latest LTS Node.js
nvm install --lts
nvm use --lts
```

### 2. Create a new Next.js project
```bash
npx create-next-app@latest core
cd core
```

During setup, you'll be prompted with configuration options:
- ✅ **TypeScript**: Yes (recommended)
- ✅ **ESLint**: Yes
- ✅ **Tailwind CSS**: Yes ⚠️ *Make sure to select "Yes" for this*
- ✅ **App Router**: Yes (recommended)
- ✅ **Import alias**: Yes

### 3. Install additional dependencies
```bash
# UI components and animations
npm install framer-motion lucide-react

# Initialize shadcn/ui
npx shadcn@latest init
```

During shadcn initialization:
- Accept default settings
- Choose your preferred base color scheme

## 🛠️ Using the Project

### Main Commands

```bash
# Development - Start the development server
npm run dev

# Production - Create an optimized build
npm run build

# Start - Launch the production version
npm run start

# Linting - Check code quality
npm run lint
```

### Project Structure

Here's how to navigate your project:

```
├── app/                   # App Router directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── home/              
│       └── page.tsx       # Home page
├── components/            # Reusable components
│   └── ui/                # shadcn/ui components
├── lib/                   # Utility functions
├── public/                # Static assets
├── .env                   # Local environment variables
├── next.config.js        # Next.js configuration
└── package.json          # Dependencies and scripts
```

### Key Features

- **Hot Reload**: Pages auto-update as you edit files
- **Font Optimization**: Uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) with [Geist](https://vercel.com/font) font family
- **Modern UI**: Pre-configured with Tailwind CSS and shadcn/ui components
- **Smooth Animations**: Framer Motion integration for enhanced UX

## 🎨 Adding UI Components

Add shadcn/ui components as needed:

```bash
# Example: Add a button component
npx shadcn@latest add button

# Add multiple components
npx shadcn@latest add card dialog 
```

Browse available components at [ui.shadcn.com](https://ui.shadcn.com/docs/components)

## 🔧 Customization

### Modifying Styles
- **Global styles**: Edit `app/globals.css`
- **Tailwind configuration**: Modify `tailwind.config.js`


## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy your Next.js app:

1. Push your code to GitHub/GitLab/Bitbucket
2. Visit [vercel.com/new](https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app)
3. Import your repository
4. Deploy with zero configuration

### Other Platforms

Check the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for guides on:
- Netlify
- AWS
- Docker
- Static export

## 🐛 Troubleshooting

### Common Issues

**Port 3000 already in use:**
```bash
# Use a different port
npm run dev -- -p 3001
```

**Dependency errors:**
```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```


### Static Assets
Place images, icons, and other static files in the `public/` directory:
```
public/
├── images/
├── icons/
└── favicon.ico
```

## 🔄 Git Workflow

### Initial Setup (for new projects)
```bash
# Initialize git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit"

# Add remote origin
git remote add origin https://github.com/username/project-name.git

# Push to remote
git push -u origin main
```

### Regular Development
```bash
# Check status
git status

# Add changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push changes
git push
```

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs) - Complete Next.js guide
- [Learn Next.js](https://nextjs.org/learn) - Interactive tutorial
- [Tailwind CSS Docs](https://tailwindcss.com/docs) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com) - Beautiful component library
- [Framer Motion](https://www.framer.com/motion/) - Animation library

## 🤝 Contributing

Contributions are welcome! Check out the [Next.js GitHub repository](https://github.com/vercel/next.js) for ways to contribute.

## 📞 Support

If you encounter issues:
1. Check the [official documentation](https://nextjs.org/docs)
2. Search through [GitHub issues](https://github.com/vercel/next.js/issues)
3. Ask questions on [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

a ajouter : npm install next-themes
npm install @tanstack/react-query
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier husky lint-staged

# front-next-2025
