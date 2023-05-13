'use client';

import { Models } from 'appwrite';
import { createContext, useContext } from 'react';

type ContextProps = {
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  githubSignin: () => void;
  getCurrUser: () => Object;
  isLoading: boolean;
  logout: () => void;
  loggedInUser: {
    $createdAt?: String;
    $id?: String;
    $updatedAt?: String;
    email?: String;
    emailVerification?: Boolean;
    name?: String;
    passwordUpdate?: String;
    phone?: String;
    phoneVerification?: Boolean;
    prefs?: Object;
    registration?: String;
    status?: boolean;
  };
  createPage: (
    name: String,
    description: String,
    userId: String,
  ) => Promise<void>;
  editPage: (
    name: String,
    description: String,
    pageId: String,
  ) => Promise<void>;
  deletePage: (pageId: String) => Promise<void>;
  listPages: (
    userId: String,
  ) => Promise<Models.DocumentList<Models.Document> | undefined>;
};

export const TaskBuddyContext = createContext<ContextProps>({
  login(email, password) {},
  signup() {},
  githubSignin() {},
  getCurrUser(): Object {
    return {};
  },
  isLoading: false,
  logout() {},
  loggedInUser: {},
  createPage(name, description, userId) {
    return Promise.resolve();
  },
  editPage(name, description, pageId) {
    return Promise.resolve();
  },
  deletePage(pageId) {
    return Promise.resolve();
  },
  listPages(userId) {
    return Promise.resolve(undefined);
  },
});

export const useTaskBuddyContext = () => useContext(TaskBuddyContext);
