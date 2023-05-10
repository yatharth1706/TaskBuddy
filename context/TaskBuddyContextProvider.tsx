'use client';

import { useRouter } from 'next/navigation';
import { TaskBuddyContext } from './TaskBuddyContext';
import { Client, Account, ID } from 'appwrite';

interface ContextProviderProps {
  children: React.ReactNode;
}

export default function TaskBuddyContextProvider({
  children,
}: ContextProviderProps) {
  const router = useRouter();
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject(process.env.PROJECT_ID as string);

  const login = async (email: string, password: string) => {
    const account = new Account(client);

    const promise = account.createEmailSession(email, password);

    promise.then(
      function (response) {
        router.push('/dashboard');
      },
      function (error) {
        alert(error);
      },
    );
  };

  const signup = (name: string, email: string, password: string) => {
    const account = new Account(client);

    const promise = account.create(ID.unique(), email, password, name);

    promise.then(
      function (response) {
        router.push('/login');
      },
      function (error) {
        alert(error);
      },
    );
  };

  const githubSignin = () => {
    const account = new Account(client);

    const promise = account.createOAuth2Session(
      'github',
      'http://localhost:3000/dashboard',
      'http://localhost:3000/login',
    );
  };

  return (
    <TaskBuddyContext.Provider value={{ login, signup, githubSignin }}>
      {children}
    </TaskBuddyContext.Provider>
  );
}
