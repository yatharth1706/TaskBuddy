'use client';

import { createContext, useContext } from 'react';

interface ContextProps {
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  githubSignin: () => void;
}

export const TaskBuddyContext = createContext<ContextProps>({
  login(email, password) {},
  signup() {},
  githubSignin() {},
});

export const useTaskBuddyContext = () => useContext(TaskBuddyContext);
