'use client';

import { useState, useEffect } from 'react';
import { Transaction } from '@/types';
import { getTransactions, addTransaction, deleteTransaction } from '@/lib/storage';
import SummaryCards from '@/components/SummaryCards';
import AddTransaction from '@/components/AddTransaction';
import TransactionList from '@/components/TransactionList';
import CategoryBreakdown from '@/components/CategoryBreakdown';
import MonthlySummary from '@/components/MonthlySummary';
import { BarChart3 } from 'lucide-react';

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTransactions(getTransactions());
    setMounted(true);
  }, []);

  const handleAdd = (transaction: Transaction) => {
    const updated = addTransaction(transaction);
    setTransactions(updated);
  };

  const handleDelete = (id: string) => {
    const updated = deleteTransaction(id);
    setTransactions(updated);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pb-12">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="p-2 bg-emerald-600/20 rounded-lg">
            <BarChart3 className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">ExpenseWise</h1>
            <p className="text-xs text-gray-500">Smart expense tracking</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 mt-6 space-y-6">
        {/* Summary Cards */}
        <SummaryCards transactions={transactions} />

        {/* Add Transaction */}
        <AddTransaction onAdd={handleAdd} />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transaction List - takes 2 cols */}
          <div className="lg:col-span-2">
            <TransactionList transactions={transactions} onDelete={handleDelete} />
          </div>

          {/* Sidebar - takes 1 col */}
          <div className="space-y-6">
            <CategoryBreakdown transactions={transactions} />
            <MonthlySummary transactions={transactions} />
          </div>
        </div>
      </div>
    </main>
  );
}
