'use client';

import { useRouter } from 'next/navigation';
import { TaskBuddyContext } from './TaskBuddyContext';
import { Client, Account, ID, Databases, Query } from 'appwrite';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

interface ContextProviderProps {
  children: React.ReactNode;
}

export default function TaskBuddyContextProvider({
  children,
}: ContextProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    getCurrUser();
  }, []);

  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject(process.env.PROJECT_ID as string);
  const account = new Account(client);
  const databases = new Databases(client);

  const getCurrUser = async () => {
    try {
      const response = await account.get();
      setLoggedInUser(response);
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
    localStorage.removeItem('UserInfo');
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

  const createPage = async (
    name: String,
    description: String,
    userId: String,
  ) => {
    let currDateTime = moment(Date()).format('MMMM Do YYYY, h:mm:ss a');
    let documentId = uuidv4();

    const response = await databases.createDocument(
      process.env.DATABASE_ID as string,
      process.env.PAGE_COLLECTION_ID as string,
      documentId,
      {
        Name: name,
        Description: description,
        UserId: userId,
        CreatedAt: currDateTime,
        UpdatedAt: currDateTime,
      },
    );
  };

  const editPage = async (
    name: String,
    description: String,
    pageId: String,
  ) => {
    let currDateTime = moment(Date()).format('MMMM Do YYYY, h:mm:ss a');

    const response = await databases.updateDocument(
      process.env.DATABASE_ID as string,
      process.env.PAGE_COLLECTION_ID as string,
      pageId as string,
      {
        Name: name,
        Description: description,
        UpdatedAt: currDateTime,
      },
    );
  };

  const deletePage = async (pageId: String) => {
    const response = await databases.deleteDocument(
      process.env.DATABASE_ID as string,
      process.env.PAGE_COLLECTION_ID as string,
      pageId as string,
    );
  };

  const listPages = async (userId: String) => {
    const response = await databases.listDocuments(
      process.env.DATABASE_ID as string,
      process.env.PAGE_COLLECTION_ID as string,
      [Query.equal('UserId', [userId as string])],
    );

    return response;
  };

  return (
    <TaskBuddyContext.Provider
      value={{
        login,
        signup,
        githubSignin,
        isLoading,
        getCurrUser,
        logout,
        loggedInUser,
        createPage,
        listPages,
        editPage,
        deletePage,
      }}
    >
      {children}
    </TaskBuddyContext.Provider>
  );
}
