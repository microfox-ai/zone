export default function Homepage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container flex min-h-screen max-w-4xl flex-col items-center justify-center mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold tracking-tight mb-6">Zone</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-center">
          Zone is an application for building AI agents and workers.
        </p>
        {/* Footer */}
        <div className="text-center mt-12 text-muted-foreground">
          <p>Built with ❤️ by the Microfox team</p>
        </div>
      </div>
    </div>
  );
}
