'use client';

import { useRouter } from 'next/navigation';
import { TaskBuddyContext } from './TaskBuddyContext';
import { Client, Account, ID } from 'appwrite';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface ContextProviderProps {
  children: React.ReactNode;
}

export default function TaskBuddyContextProvider({
  children,
}: ContextProviderProps) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject(process.env.PROJECT_ID as string);
  const account = new Account(client);

  const getCurrUser = async () => {
    try {
      const response = await account.get();
      return response;
    } catch (err) {
      return null;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      validateBeforeSignin(email, password);

      const response = await account.createEmailSession(email, password);
      toast({
        title: 'Success',
        description: 'Successfully logged in',
      });
      router.push('/ui/pages');
    } catch (err) {
      toast({
        title: 'Error',
        description: String(err),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      validateBeforeSignup(name, email, password);
      const response = await account.create(ID.unique(), email, password, name);
      toast({
        title: 'Success',
        description: 'Successfully signed up',
      });
      router.push('/login');
    } catch (err) {
      toast({
        title: 'Error',
        description: String(err),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    const response = await account.deleteSessions();
    router.push('/login');
  };

  const validateBeforeSignup = (
    name: String,
    email: String,
    password: String,
  ) => {
    if (name.length === 0 || email.length === 0 || password.length === 0) {
      throw new Error('Name / email / password all are required');
    }
  };

  const validateBeforeSignin = (email: String, password: String) => {
    if (email.length === 0 || password.length === 0) {
      throw new Error('Email / Password are required');
      return;
    }
  };

  const githubSignin = async () => {
    try {
      setIsLoading(true);

      const response = account.createOAuth2Session(
        'github',
        'http://localhost:3000/ui/pages',
        'http://localhost:3000/login',
      );
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TaskBuddyContext.Provider
      value={{ login, signup, githubSignin, isLoading, getCurrUser, logout }}
    >
      {children}
    </TaskBuddyContext.Provider>
  );
}
