import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'RailResponse',
  description: 'Sistema de resposta para ferrovias',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="bg-[#1b4263] min-h-screen">
        {children}
      </body>
    </html>
  );
}
