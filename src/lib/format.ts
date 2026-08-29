export const fmt = (n: number) => new Intl.NumberFormat('ru-RU', { maximumFractionDigits: n < 10 ? 2 : 0 }).format(n);
export const money = (n: number) => `${new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(n)} ₽`;
export const fmtSales = (n: number) => new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(n);
