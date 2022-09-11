import { useEffect } from 'react';
import { useAppDispatch } from '../../Stores/Hooks';
import AddStockModal from './Modals/AddStockModal';
import Table from './Table';
import { openAddModal } from '../../Stores/Board/BoardSlice';
import { loadUserStocks } from '../../Stores/UserStocks/UserStocksSlice';

const WalletTable = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUserStocks());
  }, [dispatch]);

  // useEffect(() => {
  //   const xhr: XMLHttpRequest = new XMLHttpRequest();

  //   xhr.addEventListener('load', () => {
  //     console.log(xhr.responseText);
  //   });
  //   xhr.open('GET', 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=UYN2D5NYIYY26MMW');
  //   xhr.send();
  // }, []);

  return (
    <div className='container'>
      <h1 className='mb-3'>Wallet balancer</h1>
      <button type='button' className='btn btn-primary mb-3' onClick={() => { dispatch(openAddModal()); }}>
        New stock
      </button>
      <Table />
      <AddStockModal />
    </div>
  );
};

export default WalletTable;
