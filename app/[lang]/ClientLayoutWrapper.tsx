'use client';
import { ReactNode } from 'react';
import TopNavBar from './components/_Navbar/TopNavBar';

interface ClientLayoutWrapperProps {
  children: ReactNode;
  lang: string;
}

export default function ClientLayoutWrapper({ children}: ClientLayoutWrapperProps) {


  return (
    <>
      <TopNavBar className={''}/>
      <main>
        {children}
      </main>
    </>
  );
}