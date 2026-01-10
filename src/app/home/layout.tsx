import NavBar from '@/components/navbar';
import React from 'react';

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full h-full">
      <NavBar />
      <div className="w-full h-[89vh]">{children}</div>
    </div>
  );
}
