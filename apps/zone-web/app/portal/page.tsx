'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ProtectedPage } from '@/components/auth/ProtectedPage';
import { useSession } from '@/components/session-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function PortalContent() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const session = useSession();
  const clientLabel = session?.session?.clientId ?? 'Unknown client';

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/logout', { method: 'POST' });
    } finally {
      router.push('/login');
      router.refresh();
      setIsLoggingOut(false);
    }
  };

  return (
    <main className="container mx-auto max-w-6xl px-4 py-10">
      <section className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portal</h1>
          <p className="mt-2 text-muted-foreground">
            Protected workspace boilerplate for internal tools and quick actions.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Logged in as: <span className="font-medium text-foreground">{clientLabel}</span>
          </p>
        </div>
        <Button variant="destructive" onClick={handleLogout} disabled={isLoggingOut}>
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </Button>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>High-level status area</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Add metrics, account info, or navigation summaries here.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common operator tasks</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button variant="default">Create new task</Button>
            <Button variant="outline">Open recent jobs</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity</CardTitle>
            <CardDescription>Recent updates feed</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Plug in logs, queue updates, or user activity timeline.
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

export default function PortalPage() {
  return (
    <ProtectedPage>
      <PortalContent />
    </ProtectedPage>
  );
}
