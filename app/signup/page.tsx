'use client';

import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useTaskBuddyContext } from '@/context/TaskBuddyContext';
import { useState } from 'react';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { githubSignin, signup } = useTaskBuddyContext();
  return (
    <div className="flex h-screen max-w-full items-center justify-center">
      <div className="flex max-w-4xl flex-col items-center justify-center space-y-6">
        <h1 className="text-lg font-medium">
          Welcome to Task <span className="text-[#22BDFF]">Buddy</span>
        </h1>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          variant={'outline'}
          className="btn-primary w-96 px-6 font-medium"
          onClick={() => signup(name, email, password)}
        >
          Sign up
        </Button>
        <span>Or</span>
        <Button className="w-96" onClick={githubSignin}>
          <Github width={18} className="mr-2" />
          Sign up with Github
        </Button>
        <span className="text-sm font-thin text-gray-600">
          Already have an account.{' '}
          <Link href="/login">
            <span className="cursor-pointer font-bold text-zinc-700">
              Login here
            </span>
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Signup;
