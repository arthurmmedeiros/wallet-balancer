import { IUserStock } from '../UserStocks/Types';

export interface IWalletBoard {
  stocksTotal: number;
}

export interface IAddStockModal {
  isOpen: boolean;
  selectedStockId?: string;
}

export interface IWalletBoardStore {
  userId: number;
  modal: IAddStockModal;
}
