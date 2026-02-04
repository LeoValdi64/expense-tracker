'use client';

import { Transaction } from '@/types';
import { getCategoryBreakdown, formatCurrency } from '@/lib/utils';
import { PieChart } from 'lucide-react';

interface CategoryBreakdownProps {
  transactions: Transaction[];
}

const CATEGORY_COLORS: Record<string, string> = {
  // Income
  Salary: 'bg-emerald-500',
  Freelance: 'bg-emerald-400',
  Investment: 'bg-teal-500',
  Gift: 'bg-green-400',
  // Expense
  Food: 'bg-red-500',
  Transport: 'bg-orange-500',
  Housing: 'bg-amber-500',
  Entertainment: 'bg-pink-500',
  Shopping: 'bg-purple-500',
  Health: 'bg-cyan-500',
  Education: 'bg-blue-500',
  Bills: 'bg-yellow-500',
  Other: 'bg-gray-500',
};

export default function CategoryBreakdown({ transactions }: CategoryBreakdownProps) {
  const expenseBreakdown = getCategoryBreakdown(transactions, 'expense');
  const incomeBreakdown = getCategoryBreakdown(transactions, 'income');

  const renderSection = (
    title: string,
    data: ReturnType<typeof getCategoryBreakdown>,
    accentColor: string
  ) => {
    if (data.length === 0) return null;

    return (
      <div>
        <h3 className={`text-sm font-medium ${accentColor} mb-3`}>{title}</h3>
        <div className="space-y-3">
          {data.map((item) => (
            <div key={item.category}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-300">{item.category}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    {item.count} txn{item.count !== 1 ? 's' : ''}
                  </span>
                  <span className="text-sm font-medium text-white">
                    {formatCurrency(item.total)}
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${CATEGORY_COLORS[item.category] || 'bg-gray-500'} transition-all duration-500`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{item.percentage.toFixed(1)}%</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const hasData = expenseBreakdown.length > 0 || incomeBreakdown.length > 0;

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-5">
        <PieChart className="w-5 h-5 text-blue-400" />
        <h2 className="text-lg font-semibold text-white">Category Breakdown</h2>
      </div>

      {!hasData ? (
        <p className="text-center text-gray-500 py-6 text-sm">
          Add transactions to see the breakdown.
        </p>
      ) : (
        <div className="space-y-6">
          {renderSection('Expenses', expenseBreakdown, 'text-red-400')}
          {renderSection('Income', incomeBreakdown, 'text-emerald-400')}
        </div>
      )}
    </div>
  );
}
