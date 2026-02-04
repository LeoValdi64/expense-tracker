'use client';

import { Transaction } from '@/types';
import { getMonthlySummaries, formatCurrency } from '@/lib/utils';
import { Calendar, TrendingUp, TrendingDown } from 'lucide-react';

interface MonthlySummaryProps {
  transactions: Transaction[];
}

export default function MonthlySummary({ transactions }: MonthlySummaryProps) {
  const summaries = getMonthlySummaries(transactions);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-5">
        <Calendar className="w-5 h-5 text-purple-400" />
        <h2 className="text-lg font-semibold text-white">Monthly Summary</h2>
      </div>

      {summaries.length === 0 ? (
        <p className="text-center text-gray-500 py-6 text-sm">
          No data to show yet.
        </p>
      ) : (
        <div className="space-y-3">
          {summaries.map((summary) => {
            const maxVal = Math.max(summary.income, summary.expenses) || 1;
            const incomeWidth = (summary.income / maxVal) * 100;
            const expenseWidth = (summary.expenses / maxVal) * 100;

            return (
              <div
                key={summary.month}
                className="p-4 rounded-lg bg-gray-700/50 border border-gray-700"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-white">{summary.label}</h3>
                  <span
                    className={`text-sm font-bold ${
                      summary.balance >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {summary.balance >= 0 ? '+' : ''}
                    {formatCurrency(summary.balance)}
                  </span>
                </div>

                {/* Income bar */}
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <div className="flex-1 bg-gray-600 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full bg-emerald-500 transition-all duration-500"
                      style={{ width: `${incomeWidth}%` }}
                    />
                  </div>
                  <span className="text-xs text-emerald-400 w-24 text-right shrink-0">
                    {formatCurrency(summary.income)}
                  </span>
                </div>

                {/* Expense bar */}
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <div className="flex-1 bg-gray-600 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full bg-red-500 transition-all duration-500"
                      style={{ width: `${expenseWidth}%` }}
                    />
                  </div>
                  <span className="text-xs text-red-400 w-24 text-right shrink-0">
                    {formatCurrency(summary.expenses)}
                  </span>
                </div>

                <p className="text-xs text-gray-500 mt-2">
                  {summary.count} transaction{summary.count !== 1 ? 's' : ''}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
