export const currencyFormat = (cash: number, currency: string) =>
  String(
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency
    }).format(cash)
  )
    .split("")
    .slice(0, -3)
    .join("");


export const formatARS = (cash: number) => currencyFormat(cash, "ARS");
export const formatUSD = (cash: number) => currencyFormat(cash, "USD");
