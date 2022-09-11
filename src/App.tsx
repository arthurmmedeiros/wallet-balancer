import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Index';
import NotFound from './Pages/NotFound.tsx/Index';
import WalletTable from './Pages/WalletTable/Index';

const App = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='board' element={<WalletTable />} />
    <Route path='*' element={<NotFound />} />
  </Routes>
);

export default App;
