import { Transaction, CategoryGroup, MonthlySummary } from '@/types';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function getTotalIncome(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
}

export function getTotalExpenses(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
}

export function getBalance(transactions: Transaction[]): number {
  return getTotalIncome(transactions) - getTotalExpenses(transactions);
}

export function getCategoryBreakdown(
  transactions: Transaction[],
  type: 'income' | 'expense'
): CategoryGroup[] {
  const filtered = transactions.filter((t) => t.type === type);
  const total = filtered.reduce((sum, t) => sum + t.amount, 0);

  const groups: Record<string, { total: number; count: number }> = {};

  filtered.forEach((t) => {
    if (!groups[t.category]) {
      groups[t.category] = { total: 0, count: 0 };
    }
    groups[t.category].total += t.amount;
    groups[t.category].count += 1;
  });

  return Object.entries(groups)
    .map(([category, data]) => ({
      category,
      total: data.total,
      count: data.count,
      percentage: total > 0 ? (data.total / total) * 100 : 0,
    }))
    .sort((a, b) => b.total - a.total);
}

export function getMonthlySummaries(transactions: Transaction[]): MonthlySummary[] {
  const groups: Record<string, { income: number; expenses: number; count: number }> = {};

  transactions.forEach((t) => {
    const month = t.date.substring(0, 7); // YYYY-MM
    if (!groups[month]) {
      groups[month] = { income: 0, expenses: 0, count: 0 };
    }
    if (t.type === 'income') {
      groups[month].income += t.amount;
    } else {
      groups[month].expenses += t.amount;
    }
    groups[month].count += 1;
  });

  return Object.entries(groups)
    .map(([month, data]) => {
      const [year, m] = month.split('-');
      const date = new Date(parseInt(year), parseInt(m) - 1);
      const label = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric',
      }).format(date);

      return {
        month,
        label,
        income: data.income,
        expenses: data.expenses,
        balance: data.income - data.expenses,
        count: data.count,
      };
    })
    .sort((a, b) => b.month.localeCompare(a.month));
}

export function filterTransactions(
  transactions: Transaction[],
  search: string,
  typeFilter: 'all' | 'income' | 'expense',
  categoryFilter: string
): Transaction[] {
  return transactions.filter((t) => {
    const matchesSearch =
      search === '' ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || t.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;
    return matchesSearch && matchesType && matchesCategory;
  });
}
