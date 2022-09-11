import { useAppDispatch, useAppSelector } from '../../Stores/Hooks';
import {
  availableColumns, getColumnNames, getStockIdealTotal, getMissingInWallet,
  getMissingUnits, getStockTotalPercent, getStockTotal,
} from './Helpers/ColumnsHelper';
import { openAddModal } from '../../Stores/Board/BoardSlice';

function Table() {
  const dispatch = useAppDispatch();

  const currentBalance = 20000;

  const userStocks = useAppSelector((state) => state.userStocks.stocks);

  const walletTotal = userStocks.reduce((accumulator, userStock) => {
    const stockTotal = getStockTotal(userStock.amount, userStock.stock.price);

    return accumulator + stockTotal;
  }, 0);

  const totalPercent = userStocks.reduce((accumulator, userStock) => {
    const stockTotal = getStockTotal(userStock.amount, userStock.stock.price);
    const percent = getStockTotalPercent(stockTotal, walletTotal);

    return accumulator + percent;
  }, 0);

  const sharesTotal = userStocks.reduce((accumulator, userStock) => accumulator + userStock.amount, 0);

  const total = userStocks.reduce((accumulator, userStock) => accumulator + getStockTotal(userStock.amount, userStock.stock.price), 0);

  const stockTotalPercent = userStocks.reduce((accumulator, userStock) => {
    const stockTotal = getStockTotal(userStock.amount, userStock.stock.price);
    const percentInWallet = getStockTotalPercent(stockTotal, walletTotal);

    return accumulator + percentInWallet;
  }, 0);

  const stockIdealPercentTotal = userStocks.reduce((accumulator, userStock) => accumulator + userStock.idealPercentage, 0);

  const stockIdealTotal = userStocks.reduce((accumulator, userStock) => {
    const totalIdealInWallet = getStockIdealTotal(userStock.idealPercentage, totalPercent, currentBalance);

    return accumulator + totalIdealInWallet;
  }, 0);

  const renderFooter = () => (
    <tr>
      <th>Total</th>
      <td />
      <td>{sharesTotal}</td>
      <td>{total}</td>
      <td>{stockTotalPercent}</td>
      <td>{stockIdealPercentTotal}</td>
      <td>{stockIdealTotal}</td>
      <td>-</td>
      <td>-</td>
    </tr>
  );

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            {availableColumns.map((a) => (
              <th key={`th-${a}`} className="px-6 py-3">
                {getColumnNames(a)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userStocks.map((s) => {
            const stockTotal = getStockTotal(s.amount, s.stock.price);
            const stockTotalPercentII = getStockTotalPercent(stockTotal, walletTotal);
            const stockIdeal = getStockIdealTotal(s.idealPercentage, totalPercent, currentBalance);
            return (
              <tr key={`id-${s.stock.tempId}`}>
                <td>
                  <button
                    className="btn btn-link"
                    type="button"
                    onClick={() => {
                      dispatch(openAddModal(s.stock.tempId));
                    }}
                  >
                    {s.stock.code}
                  </button>
                </td>
                <td>{s.stock.price}</td>
                <td>{s.amount}</td>
                <td>{stockTotal}</td>
                <td>{stockTotalPercentII}</td>
                <td>{s.idealPercentage}</td>
                <td>{stockIdeal}</td>
                <td>{getMissingInWallet(stockTotal, stockIdeal)}</td>
                <td>{getMissingUnits(stockIdeal, s.stock.price, s.amount)}</td>
              </tr>
            );
          })}
          {renderFooter()}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
