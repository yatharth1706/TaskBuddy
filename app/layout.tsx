import '@/styles/globals.css';
import React from 'react';

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
      <body className="overflow-y-scroll">{children}</body>
    </html>
  );
}
