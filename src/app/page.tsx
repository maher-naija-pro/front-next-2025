export default function HelloPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
            <div className="text-center space-y-6">
                <h1 className="text-6xl font-bold text-primary">
                    Hello World!
                </h1>
                <p className="text-xl text-muted-foreground max-w-md">
                    Welcome to your clean Next.js application with shadcn/ui components.
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <span>Built with</span>
                    <span className="font-mono bg-muted px-2 py-1 rounded">Next.js</span>
                    <span>+</span>
                    <span className="font-mono bg-muted px-2 py-1 rounded">shadcn/ui</span>
                </div>
            </div>
        </div>
    )
}
