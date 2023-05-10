import '@/app/globals.css';
import React from 'react';
import TaskBuddyContextProvider from '@/context/TaskBuddyContextProvider';
import { Toaster } from '@/components/ui/toaster';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>Task Buddy</title>
      </head>
      <body className="overflow-y-scroll">
        <TaskBuddyContextProvider>
          <main>{children}</main>
        </TaskBuddyContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
