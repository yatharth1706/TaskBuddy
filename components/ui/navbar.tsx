import { useTaskBuddyContext } from '@/context/TaskBuddyContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function Navbar() {
  const { logout } = useTaskBuddyContext();

  return (
    <>
      <div className="flex w-full items-center justify-between border border-b border-zinc-100 px-6 py-3">
        <h2>
          Task <span className="text-[#22BDFF]">Buddy</span>
        </h2>
        <button className="py-1 text-sm font-light" onClick={logout}>
          Logout
        </button>
      </div>
      <div className="flex w-full items-center space-x-6 border border-b border-zinc-200 px-6 pt-4">
        <Link
          href="/ui/pages"
          className={
            'pb-3 ' +
            (usePathname()?.endsWith('/pages') && 'border-b-2 border-[#22BDFF]')
          }
        >
          Pages
        </Link>
        <Link
          href="/ui/members"
          className={
            'pb-3 ' +
            (usePathname()?.endsWith('/members') &&
              'border-b-2 border-[#22BDFF]')
          }
        >
          Members
        </Link>
        <Link
          href="/ui/settings"
          className={
            'pb-3 ' +
            (usePathname()?.endsWith('/settings') &&
              'border-b-2 border-[#22BDFF]')
          }
        >
          Settings
        </Link>
      </div>
    </>
  );
}
