'use client'

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
    style.textContent = `
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
  `
    document.head.appendChild(style)
}
