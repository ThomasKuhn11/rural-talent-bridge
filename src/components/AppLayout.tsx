import { ReactNode } from 'react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      <Header />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};
