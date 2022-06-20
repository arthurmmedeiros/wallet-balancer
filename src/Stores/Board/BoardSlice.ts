import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAddStock, IUserStock, IWalletBoardStore } from './Types';

const INITIAL_STATE: IWalletBoardStore = {
  userId: 1,
  userStocks: [
    {
      stock: {
        code: 'ALUP11',
        price: 21,
        tempId: 'aa',
      },
      amount: 20,
      idealPercentage: 20,
    },
    {
      stock: {
        code: 'BCFF11',
        price: 30,
        tempId: 'bb',
      },
      amount: 35,
      idealPercentage: 20,
    },
    {
      stock: {
        code: 'EGIE3',
        price: 40,
        tempId: 'cc',
      },
      amount: 45,
      idealPercentage: 60,
    },
  ] as IUserStock[],
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
      } as IUserStock;
      state.userStocks = [
        ...state.userStocks,
        newUserStock,
      ];
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
