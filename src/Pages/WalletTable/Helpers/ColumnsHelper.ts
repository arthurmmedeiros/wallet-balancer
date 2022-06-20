import Columns from '../../../Models/Columns';

export const getStockTotal = (amount: number, price: number) => amount * price;

export const getStockTotalPercent = (stockTotal: number, walletTotal: number) => {
  if (walletTotal <= 0) { return 0; }

  return (stockTotal * 100) / walletTotal;
};

export const getStockIdealTotal = (percentIdeal: number, percentIdealTotal: number, walletRealTotal: number) => {
  if (percentIdealTotal <= 0) { return 0; }

  return (percentIdeal * walletRealTotal) / percentIdealTotal;
};

export const getMissingInWallet = (totalInWallet: number, idealTotalInWallet: number) => idealTotalInWallet - totalInWallet;

export const getMissingUnits = (idealTotalInWallet: number, price: number, amount: number) => {
  if (price <= 0) { return 0; }

  return (idealTotalInWallet / price) - amount;
};

export const getColumnNames = (column: Columns) => {
  switch (column) {
    case Columns.Item:
      return 'Ativo';
    case Columns.Price:
      return 'Preco';
    case Columns.Amount:
      return 'Quantidade';
    case Columns.Total:
      return 'Total na carteira';
    case Columns.TotalPercent:
      return 'Total % na carteira';
    case Columns.IdealPercent:
      return 'Total % ideal na carteira';
    case Columns.IdealTotal:
      return 'Total ideal';
    case Columns.Missing:
      return 'Quanto falta';
    case Columns.MissingUnits:
      return 'Quanto falta unidade';
    default:
      throw new Error('This column does not exist ');
  }
};

export const availableColumns = [
  Columns.Item,
  Columns.Price,
  Columns.Amount,
  Columns.Total,
  Columns.TotalPercent,
  Columns.IdealPercent,
  Columns.IdealTotal,
  Columns.Missing,
  Columns.MissingUnits,
];
