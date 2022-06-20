export interface IWalletBoard {
  stocksTotal: number;
}

export interface IStock {
  tempId?: string;
  code: string;
  price: number;
}

export interface IUserStock {
  stock: IStock;
  amount: number;
  idealPercentage: number;
}

export interface IAddStock {
  code: string;
  amount: number;
  idealPercentage: number;
}

export interface IAddStockModal {
  isOpen: boolean;
  selectedStockId?: string;
}

export interface IWalletBoardStore {
  userId: number;
  userStocks: IUserStock[];
  modal: IAddStockModal;
}
