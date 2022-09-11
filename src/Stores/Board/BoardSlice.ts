import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import { IAddStock, IUserStock } from '../UserStocks/Types';
import { IWalletBoardStore } from './Types';

const INITIAL_STATE: IWalletBoardStore = {
  userId: 1,
  modal: {
    isOpen: false,
    selectedStockId: undefined,
  },
};

const BoardSlice = createSlice({
  name: 'board',
  initialState: INITIAL_STATE,
  reducers: {
    load: (state: IWalletBoardStore) => {
      // FYI Arturo
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.userId = 2;
    },
    addStock: (state: IWalletBoardStore, action: PayloadAction<IAddStock>) => {
      const newUserStock = {
        amount: action.payload.amount,
        idealPercentage: action.payload.idealPercentage,
        stock: {
          code: action.payload.code,
          price: 90,
        },
        tempId: v4(),
      } as IUserStock;
    },
    openAddModal: (state: IWalletBoardStore, action: PayloadAction<string | undefined>) => {
      state.modal.selectedStockId = action.payload;
      state.modal.isOpen = true;
    },
    closeAddModal: (state: IWalletBoardStore) => {
      state.modal.isOpen = false;
      state.modal.selectedStockId = undefined;
    },
  },
});

export const {
  load, addStock, openAddModal, closeAddModal,
} = BoardSlice.actions;

export default BoardSlice.reducer;
