'use client';

import Navbar from '@/components/ui/navbar';
import { useTaskBuddyContext } from '@/context/TaskBuddyContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  const { getCurrUser } = useTaskBuddyContext();
  const router = useRouter();

  useEffect(() => {
    checkUserPresent();
  }, []);

  const checkUserPresent = async () => {
    let currUser: Object = await getCurrUser();
    if (!currUser) {
      router.push('/login');
    } else {
      localStorage.setItem('UserInfo', JSON.stringify(currUser));
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <main className="flex flex-grow">{children}</main>
    </div>
  );
}
