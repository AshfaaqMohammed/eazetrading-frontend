import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './page/Home/Home'
import Navbar from './page/Navbar/Navbar'
import Portfolio from './page/portfolio/Portfolio'
import Activity from './page/activity/Activity'
import Wallet from './page/wallet/Wallet'
import Withdrawal from './page/withdrawal/Withdrawal'
import PaymentDetails from './page/paymentDetails/PaymentDetails'
import StockDetails from './page/stockDetails/StockDetails'
import Watchlist from './page/watchlist/Watchlist'
import Profile from './page/profile/Profile'
import SearchCoin from './page/search/SearchCoin'
import WithdrawalAdmin from './page/Admin/WithdrawalAdmin'
import NotFound from './page/notFound/NotFound'
import Auth from './page/auth/Auth'

function App() {

  return (
    <>
      <Auth/>
      {false && 
        <div>
          <Navbar></Navbar>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/portfolio' element={<Portfolio/>}></Route>
            <Route path='/activity' element={<Activity/>}></Route>
            <Route path='/wallet' element={<Wallet/>}></Route>
            <Route path='/withdrawal' element={<Withdrawal/>}></Route>
            <Route path='/payment-details' element={<PaymentDetails/>}></Route>
            <Route path='/market/:id' element={<StockDetails/>}></Route>
            <Route path='/watchlist' element={<Watchlist/>}></Route>
            <Route path='/profile' element={<Profile/>}></Route>
            <Route path='/search-coin' element={<SearchCoin/>}></Route>
            <Route path='/withdrawal-admin' element={<WithdrawalAdmin/>}></Route>
            <Route path='*' element={<NotFound/>}></Route>
          </Routes>
        </div>
      }
    </>
  )
}

export default App
