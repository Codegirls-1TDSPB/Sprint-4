'use client';

import React from 'react';

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
}

export function DashboardCard({ title, children }: DashboardCardProps) {
  return (
    <div className="bg-[#205375] text-white p-6 rounded-2xl shadow-lg w-full">
      <h2 className="text-2xl font-bold text-orange-400 mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
