'use client';

import { createContext, useContext } from 'react';

interface ContextProps {
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  githubSignin: () => void;
  isLoading: boolean;
}

export const TaskBuddyContext = createContext<ContextProps>({
  login(email, password) {},
  signup() {},
  githubSignin() {},
  isLoading: false,
});

export const useTaskBuddyContext = () => useContext(TaskBuddyContext);
