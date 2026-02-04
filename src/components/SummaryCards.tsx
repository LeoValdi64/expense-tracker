'use client';

import { Transaction } from '@/types';
import { formatCurrency, getTotalIncome, getTotalExpenses, getBalance } from '@/lib/utils';
import { Wallet, TrendingUp, TrendingDown, Receipt } from 'lucide-react';

interface SummaryCardsProps {
  transactions: Transaction[];
}

export default function SummaryCards({ transactions }: SummaryCardsProps) {
  const balance = getBalance(transactions);
  const income = getTotalIncome(transactions);
  const expenses = getTotalExpenses(transactions);
  const count = transactions.length;

  const cards = [
    {
      title: 'Total Balance',
      value: formatCurrency(balance),
      icon: Wallet,
      color: balance >= 0 ? 'text-emerald-400' : 'text-red-400',
      bg: balance >= 0 ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20',
      iconBg: balance >= 0 ? 'bg-emerald-500/20' : 'bg-red-500/20',
    },
    {
      title: 'Income',
      value: formatCurrency(income),
      icon: TrendingUp,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      iconBg: 'bg-emerald-500/20',
    },
    {
      title: 'Expenses',
      value: formatCurrency(expenses),
      icon: TrendingDown,
      color: 'text-red-400',
      bg: 'bg-red-500/10 border-red-500/20',
      iconBg: 'bg-red-500/20',
    },
    {
      title: 'Transactions',
      value: count.toString(),
      icon: Receipt,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
      iconBg: 'bg-blue-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className={`rounded-xl border p-5 ${card.bg} transition-all hover:scale-[1.02]`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400 font-medium">{card.title}</span>
              <div className={`p-2 rounded-lg ${card.iconBg}`}>
                <Icon className={`w-5 h-5 ${card.color}`} />
              </div>
            </div>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
          </div>
        );
      })}
    </div>
  );
}
