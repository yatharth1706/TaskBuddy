'use client';

import { createContext, useContext } from 'react';

interface ContextProps {
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  githubSignin: () => void;
  getCurrUser: () => Object;
  isLoading: boolean;
  logout: () => void;
}

export const TaskBuddyContext = createContext<ContextProps>({
  login(email, password) {},
  signup() {},
  githubSignin() {},
  getCurrUser(): Object {
    return {};
  },
  isLoading: false,
  logout() {},
});

export const useTaskBuddyContext = () => useContext(TaskBuddyContext);
