'use client'

import * as React from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
    children: React.ReactNode
    className?: string
    title?: string
    language?: string
}

export function CodeBlock({ children, className, title, language }: CodeBlockProps) {
    const [copied, setCopied] = React.useState(false)

    const copyToClipboard = async () => {
        if (typeof children === 'string') {
            await navigator.clipboard.writeText(children)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className={cn('group relative', className)}>
            {/* Header with title and copy button */}
            {(title || language) && (
                <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border rounded-t-lg">
                    <div className="flex items-center gap-2">
                        {language && (
                            <span className="text-xs font-medium text-muted-foreground bg-background px-2 py-1 rounded">
                                {language}
                            </span>
                        )}
                        {title && (
                            <span className="text-sm font-medium text-foreground">{title}</span>
                        )}
                    </div>
                    <button
                        onClick={copyToClipboard}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 hover:bg-muted rounded-md"
                        title="Copy code"
                    >
                        {copied ? (
                            <Check className="h-4 w-4 text-green-600" />
                        ) : (
                            <Copy className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        )}
                    </button>
                </div>
            )}

            {/* Code content */}
            <div className="relative">
                <pre className="bg-muted p-4 rounded-b-lg overflow-x-auto text-sm font-mono leading-relaxed">
                    <code className="text-foreground">{children}</code>
                </pre>

                {/* Copy button overlay for blocks without header */}
                {!title && !language && (
                    <button
                        onClick={copyToClipboard}
                        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 bg-background/80 hover:bg-background border border-border rounded-md shadow-sm"
                        title="Copy code"
                    >
                        {copied ? (
                            <Check className="h-4 w-4 text-green-600" />
                        ) : (
                            <Copy className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        )}
                    </button>
                )}
            </div>

            {/* Success message */}
            {copied && (
                <div className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded-md text-sm font-medium animate-in fade-in-0 slide-in-from-top-2 duration-200">
                    Copied!
                </div>
            )}
        </div>
    )
}

// Inline code component
export function InlineCode({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <code className={cn('bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground', className)}>
            {children}
        </code>
    )
}
