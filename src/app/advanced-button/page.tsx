'use client'

import { useState } from 'react'
import { AdvancedButton } from '@/components/mycomponants/advanced-button'
import { CodeBlock } from '@/components/ui/code-block'
import {
  Heart,
  Star,
  Download,
  Settings,
  Play,
  Plus,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Zap
} from 'lucide-react'

export default function HelloPage() {
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)

  const handleAsyncAction = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setLoading(false)
    setCount(prev => prev + 1)
  }

  const downloadComponent = () => {
    // Create a file with the complete component code
    const componentCode = `'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'

const advancedButtonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transform hover:scale-[1.02] active:scale-[0.98]",
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl',
                destructive:
                    'bg-destructive text-white shadow-lg hover:bg-destructive/90 hover:shadow-xl focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
                outline:
                    'border-2 border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground hover:border-primary/50 dark:bg-input/30 dark:border-input dark:hover:bg-input/50 hover:shadow-md',
                secondary:
                    'bg-secondary text-secondary-foreground shadow-lg hover:bg-secondary/80 hover:shadow-xl',
                ghost:
                    'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 hover:shadow-sm',
                link: 'text-primary underline-offset-4 hover:underline hover:bg-primary/10 rounded-md px-3 py-2',
                gradient: 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg hover:from-primary/90 hover:to-primary/70 hover:shadow-xl',
                glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg hover:bg-white/20 hover:shadow-xl',
                neon: 'bg-black text-white border-2 border-primary shadow-[0_0_20px_rgba(var(--primary),0.5)] hover:shadow-[0_0_30px_rgba(var(--primary),0.8)] hover:bg-primary/10',
            },
            size: {
                default: 'h-10 px-4 py-2 has-[>svg]:px-3',
                sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-xs',
                lg: 'h-12 rounded-md px-6 has-[>svg]:px-4 text-base',
                xl: 'h-14 rounded-lg px-8 has-[>svg]:px-6 text-lg',
                icon: 'size-10',
                'icon-sm': 'size-8',
                'icon-lg': 'size-12',
            },
            animation: {
                none: '',
                bounce: 'hover:animate-bounce',
                pulse: 'hover:animate-pulse',
                spin: 'hover:animate-spin',
                wiggle: 'hover:animate-[wiggle_0.5s_ease-in-out]',
                shake: 'hover:animate-[shake_0.5s_ease-in-out]',
            },
            rounded: {
                default: 'rounded-md',
                full: 'rounded-full',
                lg: 'rounded-lg',
                xl: 'rounded-xl',
                none: 'rounded-none',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
            animation: 'none',
            rounded: 'default',
        },
    }
)

export interface AdvancedButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof advancedButtonVariants> {
    asChild?: boolean
    loading?: boolean
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    fullWidth?: boolean
    ripple?: boolean
}

const AdvancedButton = React.forwardRef<HTMLButtonElement, AdvancedButtonProps>(
    ({
        className,
        variant,
        size,
        animation,
        rounded,
        asChild = false,
        loading = false,
        leftIcon,
        rightIcon,
        fullWidth = false,
        ripple = false,
        children,
        disabled,
        onClick,
        ...props
    }, ref) => {
        const Comp = asChild ? Slot : 'button'
        const [rippleEffect, setRippleEffect] = React.useState<{ x: number; y: number } | null>(null)

        const handleClick = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
            if (ripple && !loading && !disabled) {
                const rect = e.currentTarget.getBoundingClientRect()
                const x = e.clientX - rect.left
                const y = e.clientY - rect.top
                setRippleEffect({ x, y })

                setTimeout(() => setRippleEffect(null), 600)
            }

            onClick?.(e)
        }, [ripple, loading, disabled, onClick])

        const isDisabled = disabled || loading

        return (
            <Comp
                data-slot="advanced-button"
                className={cn(
                    advancedButtonVariants({ variant, size, animation, rounded }),
                    fullWidth && 'w-full',
                    isDisabled && 'cursor-not-allowed opacity-50',
                    className
                )}
                ref={ref}
                disabled={isDisabled}
                onClick={handleClick}
                {...props}
            >
                {loading && (
                    <Loader2 className="size-4 animate-spin" />
                )}

                {!loading && leftIcon && (
                    <span className="flex-shrink-0">{leftIcon}</span>
                )}

                <span className="flex-shrink-0">{children}</span>

                {!loading && rightIcon && (
                    <span className="flex-shrink-0">{rightIcon}</span>
                )}

                {ripple && rippleEffect && (
                    <span
                        className="absolute inset-0 rounded-md bg-white/20 animate-[ripple_0.6s_linear] pointer-events-none"
                        style={{
                            left: rippleEffect.x - 20,
                            top: rippleEffect.y - 20,
                        }}
                    />
                )}
            </Comp>
        )
    }
)

AdvancedButton.displayName = 'AdvancedButton'

export { AdvancedButton, advancedButtonVariants }

// Add custom keyframes for animations
if (typeof document !== 'undefined') {
    const style = document.createElement('style')
    style.textContent = \`
    @keyframes wiggle {
      0%, 7% { transform: rotateZ(0); }
      15% { transform: rotateZ(-15deg); }
      20% { transform: rotateZ(10deg); }
      25% { transform: rotateZ(-10deg); }
      30% { transform: rotateZ(6deg); }
      35% { transform: rotateZ(-4deg); }
      40%, 100% { transform: rotateZ(0); }
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
      20%, 40%, 60%, 80% { transform: translateX(2px); }
    }
    
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  \`
    document.head.appendChild(style)
}`

    const blob = new Blob([componentCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'AdvancedButton.tsx'
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadComponentWithDependencies = () => {
    // Download multiple files as a package
    const packageJson = {
      name: "advanced-button-component",
      version: "1.0.0",
      description: "Advanced Button component with multiple variants, animations, and TypeScript support",
      main: "AdvancedButton.tsx",
      dependencies: {
        "@radix-ui/react-slot": "^1.0.2",
        "class-variance-authority": "^0.7.0",
        "clsx": "^2.0.0",
        "tailwind-merge": "^2.0.0",
        "lucide-react": "^0.263.1"
      },
      peerDependencies: {
        "react": "^18.0.0 || ^19.0.0",
        "react-dom": "^18.0.0 || ^19.0.0"
      },
      devDependencies: {
        "@types/react": "^18.0.0 || ^19.0.0",
        "@types/react-dom": "^18.0.0 || ^19.0.0",
        "typescript": "^5.0.0"
      }
    }

    const utilsCode = `import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`

    const readmeCode = `# AdvancedButton Component

A highly customizable button component built with React, TypeScript, and Tailwind CSS.

## Features

- **8 Variants**: default, secondary, outline, ghost, destructive, link, gradient, glass, neon
- **6 Sizes**: sm, default, lg, xl, icon, icon-sm, icon-lg
- **5 Animations**: none, bounce, pulse, spin, wiggle, shake
- **5 Rounded Options**: none, default, lg, xl, full
- **Advanced Features**: loading states, ripple effects, icon support, full width option

## Installation

1. Copy the \`AdvancedButton.tsx\` file to your components directory
2. Copy the \`utils.ts\` file to your lib directory
3. Install the required dependencies:

\`\`\`bash
npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react
\`\`\`

## Usage

\`\`\`tsx
import { AdvancedButton } from '@/components/AdvancedButton'

<AdvancedButton variant="gradient" size="lg" leftIcon={<Download />}>
  Download Now
</AdvancedButton>
\`\`\`

## Props

See the TypeScript interface in the component file for all available props and their types.

## License

MIT License - feel free to use in your projects!`

    // Download all files
    const files = [
      {
        name: 'AdvancedButton.tsx', content: `'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'

const advancedButtonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transform hover:scale-[1.02] active:scale-[0.98]",
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl',
                destructive:
                    'bg-destructive text-white shadow-lg hover:bg-destructive/90 hover:shadow-xl focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
                outline:
                    'border-2 border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground hover:border-primary/50 dark:bg-input/30 dark:border-input dark:hover:bg-input/50 hover:shadow-md',
                secondary:
                    'bg-secondary text-secondary-foreground shadow-lg hover:bg-secondary/80 hover:shadow-xl',
                ghost:
                    'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 hover:shadow-sm',
                link: 'text-primary underline-offset-4 hover:underline hover:bg-primary/10 rounded-md px-3 py-2',
                gradient: 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg hover:from-primary/90 hover:to-primary/70 hover:shadow-xl',
                glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg hover:bg-white/20 hover:shadow-xl',
                neon: 'bg-black text-white border-2 border-primary shadow-[0_0_20px_rgba(var(--primary),0.5)] hover:shadow-[0_0_30px_rgba(var(--primary),0.8)] hover:bg-primary/10',
            },
            size: {
                default: 'h-10 px-4 py-2 has-[>svg]:px-3',
                sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-xs',
                lg: 'h-12 rounded-md px-6 has-[>svg]:px-4 text-base',
                xl: 'h-14 rounded-lg px-8 has-[>svg]:px-6 text-lg',
                icon: 'size-10',
                'icon-sm': 'size-8',
                'icon-lg': 'size-12',
            },
            animation: {
                none: '',
                bounce: 'hover:animate-bounce',
                pulse: 'hover:animate-pulse',
                spin: 'hover:animate-spin',
                wiggle: 'hover:animate-[wiggle_0.5s_ease-in-out]',
                shake: 'hover:animate-[shake_0.5s_ease-in-out]',
            },
            rounded: {
                default: 'rounded-md',
                full: 'rounded-full',
                lg: 'rounded-lg',
                xl: 'rounded-xl',
                none: 'rounded-none',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
            animation: 'none',
            rounded: 'default',
        },
    }
)

export interface AdvancedButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof advancedButtonVariants> {
    asChild?: boolean
    loading?: boolean
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    fullWidth?: boolean
    ripple?: boolean
}

const AdvancedButton = React.forwardRef<HTMLButtonElement, AdvancedButtonProps>(
    ({
        className,
        variant,
        size,
        animation,
        rounded,
        asChild = false,
        loading = false,
        leftIcon,
        rightIcon,
        fullWidth = false,
        ripple = false,
        children,
        disabled,
        onClick,
        ...props
    }, ref) => {
        const Comp = asChild ? Slot : 'button'
        const [rippleEffect, setRippleEffect] = React.useState<{ x: number; y: number } | null>(null)

        const handleClick = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
            if (ripple && !loading && !disabled) {
                const rect = e.currentTarget.getBoundingClientRect()
                const x = e.clientX - rect.left
                const y = e.clientY - rect.top
                setRippleEffect({ x, y })

                setTimeout(() => setRippleEffect(null), 600)
            }

            onClick?.(e)
        }, [ripple, loading, disabled, onClick])

        const isDisabled = disabled || loading

        return (
            <Comp
                data-slot="advanced-button"
                className={cn(
                    advancedButtonVariants({ variant, size, animation, rounded }),
                    fullWidth && 'w-full',
                    isDisabled && 'cursor-not-allowed opacity-50',
                    className
                )}
                ref={ref}
                disabled={isDisabled}
                onClick={handleClick}
                {...props}
            >
                {loading && (
                    <Loader2 className="size-4 animate-spin" />
                )}

                {!loading && leftIcon && (
                    <span className="flex-shrink-0">{leftIcon}</span>
                )}

                <span className="flex-shrink-0">{children}</span>

                {!loading && rightIcon && (
                    <span className="flex-shrink-0">{rightIcon}</span>
                )}

                {ripple && rippleEffect && (
                    <span
                        className="absolute inset-0 rounded-md bg-white/20 animate-[ripple_0.6s_linear] pointer-events-none"
                        style={{
                            left: rippleEffect.x - 20,
                            top: rippleEffect.y - 20,
                        }}
                    />
                )}
            </Comp>
        )
    }
)

AdvancedButton.displayName = 'AdvancedButton'

export { AdvancedButton, advancedButtonVariants }

// Add custom keyframes for animations
if (typeof document !== 'undefined') {
    const style = document.createElement('style')
    style.textContent = \`
    @keyframes wiggle {
      0%, 7% { transform: rotateZ(0); }
      15% { transform: rotateZ(-15deg); }
      20% { transform: rotateZ(10deg); }
      25% { transform: rotateZ(-10deg); }
      30% { transform: rotateZ(6deg); }
      35% { transform: rotateZ(-4deg); }
      40%, 100% { transform: rotateZ(0); }
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
      20%, 40%, 60%, 80% { transform: translateX(2px); }
    }
    
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  \`
    document.head.appendChild(style)
}` },
      { name: 'utils.ts', content: utilsCode },
      { name: 'package.json', content: JSON.stringify(packageJson, null, 2) },
      { name: 'README.md', content: readmeCode }
    ]

    files.forEach(file => {
      const blob = new Blob([file.content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = file.name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    })
  }



  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Section */}
      <div className="text-center space-y-6 py-16 bg-gradient-to-b from-primary/5 to-transparent">
        <h1 className="text-6xl font-bold text-primary">
          Advanced Button Showcase
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore the power of our new AdvancedButton component with multiple variants,
          sizes, animations, and interactive features.
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <span>Built with</span>
          <span className="font-mono bg-muted px-2 py-1 rounded">Next.js</span>
          <span>+</span>
          <span className="font-mono bg-muted px-2 py-1 rounded">shadcn/ui</span>
          <span>+</span>
          <span className="font-mono bg-muted px-2 py-1 rounded">AdvancedButton</span>
        </div>
      </div>

      {/* Button Variants Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Basic Variants */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Button Variants</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AdvancedButton variant="default">Default</AdvancedButton>
            <AdvancedButton variant="secondary">Secondary</AdvancedButton>
            <AdvancedButton variant="outline">Outline</AdvancedButton>
            <AdvancedButton variant="ghost">Ghost</AdvancedButton>
            <AdvancedButton variant="destructive">Destructive</AdvancedButton>
            <AdvancedButton variant="link">Link</AdvancedButton>
            <AdvancedButton variant="gradient">Gradient</AdvancedButton>
            <AdvancedButton variant="glass">Glass</AdvancedButton>
          </div>

          {/* Code Example for Variants */}
          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-semibold">Code Example:</h3>
            <CodeBlock
              title="Button Variants"
              language="tsx"
            >{`import { AdvancedButton } from '@/components/ui/advanced-button'

// All available variants
<AdvancedButton variant="default">Default</AdvancedButton>
<AdvancedButton variant="secondary">Secondary</AdvancedButton>
<AdvancedButton variant="outline">Outline</AdvancedButton>
<AdvancedButton variant="ghost">Ghost</AdvancedButton>
<AdvancedButton variant="destructive">Destructive</AdvancedButton>
<AdvancedButton variant="link">Link</AdvancedButton>
<AdvancedButton variant="gradient">Gradient</AdvancedButton>
<AdvancedButton variant="glass">Glass</AdvancedButton>
<AdvancedButton variant="neon">Neon</AdvancedButton>`}</CodeBlock>
          </div>
        </section>

        {/* Sizes */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Button Sizes</h2>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <AdvancedButton size="sm">Small</AdvancedButton>
            <AdvancedButton size="default">Default</AdvancedButton>
            <AdvancedButton size="lg">Large</AdvancedButton>
            <AdvancedButton size="xl">Extra Large</AdvancedButton>
            <AdvancedButton size="icon"><Plus /></AdvancedButton>
            <AdvancedButton size="icon-sm"><Settings /></AdvancedButton>
            <AdvancedButton size="icon-lg"><Play /></AdvancedButton>
          </div>

          {/* Code Example for Sizes */}
          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-semibold">Code Example:</h3>
            <CodeBlock
              title="Button Sizes"
              language="tsx"
            >{`// All available sizes
    < AdvancedButton size = "sm" > Small</AdvancedButton >
<AdvancedButton size="default">Default</AdvancedButton>
<AdvancedButton size="lg">Large</AdvancedButton>
<AdvancedButton size="xl">Extra Large</AdvancedButton>
<AdvancedButton size="icon"><Plus /></AdvancedButton>
<AdvancedButton size="icon-sm"><Settings /></AdvancedButton>
<AdvancedButton size="icon-lg"><Play /></AdvancedButton>`}</CodeBlock>
          </div>
        </section>

        {/* With Icons */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Buttons with Icons</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <AdvancedButton leftIcon={<Heart />}>Like</AdvancedButton>
            <AdvancedButton rightIcon={<ArrowRight />}>Continue</AdvancedButton>
            <AdvancedButton leftIcon={<Download />} rightIcon={<ArrowRight />}>Download</AdvancedButton>
            <AdvancedButton leftIcon={<Star />} variant="outline">Favorite</AdvancedButton>
            <AdvancedButton leftIcon={<Settings />} variant="ghost">Settings</AdvancedButton>
            <AdvancedButton leftIcon={<Zap />} variant="gradient">Quick Action</AdvancedButton>
          </div>

          {/* Code Example for Icons */}
          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-semibold">Code Example:</h3>
            <CodeBlock
              title="Icon Integration"
              language="tsx"
            >{`import { Heart, ArrowRight, Download, Star, Settings, Zap } from 'lucide-react'

// Left icon
<AdvancedButton leftIcon={<Heart />}>Like</AdvancedButton>

// Right icon
<AdvancedButton rightIcon={<ArrowRight />}>Continue</AdvancedButton>

// Both icons
<AdvancedButton leftIcon={<Download />} rightIcon={<ArrowRight />}>
  Download
</AdvancedButton>

// With variant
<AdvancedButton leftIcon={<Star />} variant="outline">Favorite</AdvancedButton>
<AdvancedButton leftIcon={<Settings />} variant="ghost">Settings</AdvancedButton>
<AdvancedButton leftIcon={<Zap />} variant="gradient">Quick Action</AdvancedButton>`}</CodeBlock>
          </div>
        </section>

        {/* Animations */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Button Animations</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <AdvancedButton animation="bounce">Bounce</AdvancedButton>
            <AdvancedButton animation="pulse">Pulse</AdvancedButton>
            <AdvancedButton animation="spin">Spin</AdvancedButton>
            <AdvancedButton animation="wiggle">Wiggle</AdvancedButton>
            <AdvancedButton animation="shake">Shake</AdvancedButton>
            <AdvancedButton animation="none">No Animation</AdvancedButton>
          </div>

          {/* Code Example for Animations */}
          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-semibold">Code Example:</h3>
            <CodeBlock
              title="Animation Effects"
              language="tsx"
            >{`// Animation effects on hover
    < AdvancedButton animation = "bounce" > Bounce</AdvancedButton >
<AdvancedButton animation="pulse">Pulse</AdvancedButton>
<AdvancedButton animation="spin">Spin</AdvancedButton>
<AdvancedButton animation="wiggle">Wiggle</AdvancedButton>
<AdvancedButton animation="shake">Shake</AdvancedButton>
<AdvancedButton animation="none">No Animation</AdvancedButton>

// Combine with other props
<AdvancedButton 
  variant="outline" 
  size="lg" 
  animation="bounce"
>
  Animated Button
</AdvancedButton>`}</CodeBlock>
          </div>
        </section>

        {/* Rounded Variants */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Rounded Variants</h2>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <AdvancedButton rounded="none">Square</AdvancedButton>
            <AdvancedButton rounded="default">Default</AdvancedButton>
            <AdvancedButton rounded="lg">Large</AdvancedButton>
            <AdvancedButton rounded="xl">Extra Large</AdvancedButton>
            <AdvancedButton rounded="full">Full</AdvancedButton>
          </div>

          {/* Code Example for Rounded */}
          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-semibold">Code Example:</h3>
            <CodeBlock
              title="Rounded Variants"
              language="tsx"
            >{`// Rounded variants
    < AdvancedButton rounded = "none" > Square</AdvancedButton >
<AdvancedButton rounded="default">Default</AdvancedButton>
<AdvancedButton rounded="lg">Large</AdvancedButton>
<AdvancedButton rounded="xl">Extra Large</AdvancedButton>
<AdvancedButton rounded="full">Full</AdvancedButton>

// Combine with other props
<AdvancedButton 
  variant="outline" 
  size="lg" 
  rounded="full"
>
  Rounded Button
</AdvancedButton>`}</CodeBlock>
          </div>
        </section>

        {/* Interactive Examples */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Interactive Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Loading State */}
            <div className="space-y-4 p-6 border rounded-lg">
              <h3 className="text-xl font-semibold">Loading State</h3>
              <AdvancedButton
                loading={loading}
                onClick={handleAsyncAction}
                fullWidth
                leftIcon={<CheckCircle />}
              >
                {loading ? 'Processing...' : 'Click to Load'}
              </AdvancedButton>
              <p className="text-sm text-muted-foreground">
                Clicked {count} times
              </p>
            </div>

            {/* Ripple Effect */}
            <div className="space-y-4 p-6 border rounded-lg">
              <h3 className="text-xl font-semibold">Ripple Effect</h3>
              <AdvancedButton
                ripple
                variant="outline"
                fullWidth
                leftIcon={<AlertTriangle />}
              >
                Click for Ripple
              </AdvancedButton>
              <p className="text-sm text-muted-foreground">
                Click anywhere on the button to see the ripple effect
              </p>
            </div>
          </div>

          {/* Code Example for Interactive Features */}
          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-semibold">Code Example:</h3>
            <CodeBlock
              title="Interactive Features"
              language="tsx"
            >{`import { useState } from 'react'
  import { CheckCircle, AlertTriangle } from 'lucide-react'

  // Loading state
  const [loading, setLoading] = useState(false)

  const handleAsyncAction = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setLoading(false)
  }

<AdvancedButton
  loading={loading}
  onClick={handleAsyncAction}
  fullWidth
  leftIcon={<CheckCircle />}
>
  {loading ? 'Processing...' : 'Click to Load'}
</AdvancedButton>

// Ripple effect
<AdvancedButton
  ripple
  variant="outline"
  fullWidth
  leftIcon={<AlertTriangle />}
>
  Click for Ripple
</AdvancedButton>

// Full width
<AdvancedButton fullWidth>
  Full Width Button
</AdvancedButton>

// Disabled state
<AdvancedButton disabled>
  Disabled Button
</AdvancedButton>`}</CodeBlock>
          </div>
        </section>

        {/* Full Width Examples */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Full Width Buttons</h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            <AdvancedButton
              fullWidth
              variant="default"
              leftIcon={<Play />}
              size="lg"
            >
              Start Application
            </AdvancedButton>
            <AdvancedButton
              fullWidth
              variant="outline"
              leftIcon={<Settings />}
            >
              Configure Settings
            </AdvancedButton>
            <AdvancedButton
              fullWidth
              variant="ghost"
              leftIcon={<Heart />}
            >
              Add to Favorites
            </AdvancedButton>
          </div>

          {/* Code Example for Full Width */}
          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-semibold">Code Example:</h3>
            <CodeBlock
              title="Full Width Buttons"
              language="tsx"
            >{`import { Play, Settings, Heart } from 'lucide-react'

// Full width buttons
<AdvancedButton
  fullWidth
  variant="default"
  leftIcon={<Play />}
  size="lg"
>
  Start Application
</AdvancedButton>

<AdvancedButton
  fullWidth
  variant="outline"
  leftIcon={<Settings />}
>
  Configure Settings
</AdvancedButton>

<AdvancedButton
  fullWidth
  variant="ghost"
  leftIcon={<Heart />}
>
  Add to Favorites
</AdvancedButton>

// Responsive full width
<AdvancedButton
  fullWidth
  className="md:w-auto"
>
  Responsive Button
</AdvancedButton>`}</CodeBlock>
          </div>
        </section>

        {/* Custom Styling */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Custom Styling</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AdvancedButton
              className="bg-gradient-to-r from-pink-500 to-violet-500 text-white border-0 hover:from-pink-600 hover:to-violet-600"
              size="lg"
              leftIcon={<Heart className="text-pink-200" />}
            >
              Custom Gradient
            </AdvancedButton>
            <AdvancedButton
              className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0 hover:from-amber-500 hover:to-orange-600 shadow-lg hover:shadow-xl"
              size="lg"
              leftIcon={<Star className="text-amber-200" />}
            >
              Custom Colors
            </AdvancedButton>
          </div>

          {/* Code Example for Custom Styling */}
          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-semibold">Code Example:</h3>
            <CodeBlock
              title="Custom Styling"
              language="tsx"
            >{`import { Heart, Star } from 'lucide-react'

// Custom gradient
<AdvancedButton
  className="bg-gradient-to-r from-pink-500 to-violet-500 text-white border-0 hover:from-pink-600 hover:to-violet-600"
  size="lg"
  leftIcon={<Heart className="text-pink-200" />}
>
  Custom Gradient
</AdvancedButton>

// Custom colors with shadows
<AdvancedButton
  className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0 hover:from-amber-500 hover:to-orange-600 shadow-lg hover:shadow-xl"
  size="lg"
  leftIcon={<Star className="text-amber-200" />}
>
  Custom Colors
</AdvancedButton>

// Override any styles
<AdvancedButton
  className="bg-blue-600 text-white border-blue-800 hover:bg-blue-700"
  variant="outline"
>
  Custom Styled
</AdvancedButton>`}</CodeBlock>
          </div>
        </section>

        {/* Advanced Usage Examples */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Advanced Usage Examples</h2>

          {/* Polymorphic Component */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Polymorphic Component (asChild)</h3>
            <CodeBlock
              title="Polymorphic Usage"
              language="tsx"
            >{`import Link from 'next/link'

// Use asChild to render as different elements
<AdvancedButton asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</AdvancedButton>

<AdvancedButton asChild variant="outline">
  <a href="https://example.com" target="_blank">
    External Link
  </a>
</AdvancedButton>`}</CodeBlock>
          </div>

          {/* Combining Multiple Props */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Combining Multiple Props</h3>
            <CodeBlock
              title="Complex Configuration"
              language="tsx"
            >{`// Complex button configuration
    < AdvancedButton
  variant = "outline"
  size = "lg"
  animation = "bounce"
  rounded = "full"
  leftIcon = {< Star />}
ripple
fullWidth
onClick = { handleClick }
  >
  Advanced Configuration
</AdvancedButton >

  // Form submit button
  <AdvancedButton
    type="submit"
    loading={isSubmitting}
    fullWidth
    size="lg"
    leftIcon={<CheckCircle />}
    variant="default"
  >
    {isSubmitting ? 'Saving...' : 'Save Changes'}
  </AdvancedButton>`}</CodeBlock>
          </div>

          {/* Event Handling */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Event Handling</h3>
            <CodeBlock
              title="Event Handlers"
              language="tsx"
            >{`// Click event
    < AdvancedButton
onClick = {(e) => {
  e.preventDefault()
  console.log('Button clicked!')
}
}
>
  Click Handler
</AdvancedButton >

  // Multiple events
  <AdvancedButton
    onClick={handleClick}
    onMouseEnter={() => console.log('Mouse entered')}
    onMouseLeave={() => console.log('Mouse left')}
    onFocus={() => console.log('Focused')}
    onBlur={() => console.log('Blurred')}
  >
    Event Handler
  </AdvancedButton>

// Async event handling
const handleAsyncClick = async () => {
  try {
    await someAsyncOperation()
    showSuccess('Operation completed!')
  } catch (error) {
    showError('Operation failed!')
  }
}

<AdvancedButton onClick={handleAsyncClick}>
  Async Action
</AdvancedButton>`}</CodeBlock>
          </div>

          {/* Real-world Examples */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Real-world Examples</h3>
            <CodeBlock
              title="Practical Examples"
              language="tsx"
            >{`// Navigation button
  < AdvancedButton
variant = "ghost"
leftIcon = {< ArrowLeft />}
onClick = {() => router.back()}
>
  Go Back
</AdvancedButton >

// Action button with confirmation
<AdvancedButton 
  variant="destructive"
  leftIcon={<Trash2 />}
  onClick={handleDelete}
  disabled={isDeleting}
>
  {isDeleting ? 'Deleting...' : 'Delete Item'}
</AdvancedButton>

// Social media button
<AdvancedButton 
  variant="outline"
  leftIcon={<Twitter />}
  className="text-blue-500 border-blue-500 hover:bg-blue-50"
  onClick={handleShare}
>
  Share on Twitter
</AdvancedButton>

// Toggle button
<AdvancedButton 
  variant={isActive ? "default" : "outline"}
  leftIcon={isActive ? <Check /> : <Plus />}
  onClick={toggleActive}
>
  {isActive ? 'Active' : 'Inactive'}
</AdvancedButton>`}</CodeBlock>
          </div>

          {/* TypeScript Interface */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">TypeScript Interface</h3>
            <CodeBlock
              title="TypeScript Types"
              language="tsx"
            >{`interface AdvancedButtonProps {
  // Variants
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' |
  'destructive' | 'link' | 'gradient' | 'glass' | 'neon'

  // Sizes
  size?: 'sm' | 'default' | 'lg' | 'xl' |
  'icon' | 'icon-sm' | 'icon-lg'

  // Animations
  animation?: 'none' | 'bounce' | 'pulse' | 'spin' |
  'wiggle' | 'shake'

  // Rounded
  rounded?: 'none' | 'default' | 'lg' | 'xl' | 'full'

  // Features
  loading?: boolean
  ripple?: boolean
  fullWidth?: boolean
  asChild?: boolean

  // Icons
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode

  // Extends HTML button props
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  // ... all other button props
}`}</CodeBlock>
          </div>

          {/* Download Section */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-center">Download Super Component</h2>
            <div className="text-center space-y-4">
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get the complete AdvancedButton component with all its features, variants, and TypeScript support.
                Ready to use in your Next.js projects with shadcn/ui.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <AdvancedButton
                  variant="gradient"
                  size="lg"
                  leftIcon={<Download className="size-5" />}
                  onClick={() => downloadComponent()}
                  className="min-w-[200px]"
                >
                  Download AdvancedButton
                </AdvancedButton>

                <AdvancedButton
                  variant="outline"
                  size="lg"
                  leftIcon={<Download className="size-5" />}
                  onClick={() => downloadComponentWithDependencies()}
                  className="min-w-[200px]"
                >
                  Download with Dependencies
                </AdvancedButton>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="text-center p-4 rounded-lg border bg-card">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="size-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Production Ready</h3>
                  <p className="text-sm text-muted-foreground">
                    Fully tested component with TypeScript support
                  </p>
                </div>

                <div className="text-center p-4 rounded-lg border bg-card">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Settings className="size-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Highly Customizable</h3>
                  <p className="text-sm text-muted-foreground">
                    8 variants, 6 sizes, 5 animations, and more
                  </p>
                </div>

                <div className="text-center p-4 rounded-lg border bg-card">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="size-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">shadcn/ui Compatible</h3>
                  <p className="text-sm text-muted-foreground">
                    Follows design system patterns and conventions
                  </p>
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>
    </div>
  )
}
