import '@/app/globals.css';
import React from 'react';
import TaskBuddyContextProvider from '@/context/TaskBuddyContextProvider';

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
        <TaskBuddyContextProvider>{children}</TaskBuddyContextProvider>
      </body>
    </html>
  );
}
