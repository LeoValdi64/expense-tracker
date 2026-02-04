export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string; // ISO date string YYYY-MM-DD
  createdAt: string; // ISO datetime
}

export interface CategoryGroup {
  category: string;
  total: number;
  count: number;
  percentage: number;
}

export interface MonthlySummary {
  month: string; // YYYY-MM
  label: string; // e.g. "January 2026"
  income: number;
  expenses: number;
  balance: number;
  count: number;
}

export const INCOME_CATEGORIES = [
  'Salary',
  'Freelance',
  'Investment',
  'Gift',
  'Other',
] as const;

export const EXPENSE_CATEGORIES = [
  'Food',
  'Transport',
  'Housing',
  'Entertainment',
  'Shopping',
  'Health',
  'Education',
  'Bills',
  'Other',
] as const;

export type IncomeCategory = (typeof INCOME_CATEGORIES)[number];
export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];
