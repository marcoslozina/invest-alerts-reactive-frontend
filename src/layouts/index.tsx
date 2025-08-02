// Layout general de ejemplo (Dashboard)

import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="p-4 bg-gray-800 text-xl font-bold">Invest Alerts</header>
      <main className="p-6">{children}</main>
      <footer className="p-4 bg-gray-800 text-sm text-center">
        &copy; {new Date().getFullYear()} Invest Alerts
      </footer>
    </div>
  );
}
