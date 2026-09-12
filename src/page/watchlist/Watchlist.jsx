import React, { useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { BookmarkFilledIcon } from '@radix-ui/react-icons'
import { useDispatch, useSelector } from 'react-redux'
import { getUserWatchlist, addCoinToWatchlist } from '@/State/WatchList/Action'
import { useNavigate } from 'react-router-dom'

const Watchlist = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { watchlist } = useSelector(store => store)

  useEffect(() => {
    dispatch(getUserWatchlist(localStorage.getItem("jwt")))
  }, [])

  const handleRemoveFromWatchlist = (coinId) => {
    dispatch(addCoinToWatchlist(localStorage.getItem("jwt"), coinId))
  }

  return (
    <div className='p-5 lg:px-20'>
      <h1 className='font-bold text-3xl pb-5'>WatchList</h1>
      <Table className="border">
        <TableHeader>
            <TableRow>
                <TableHead className="py-4">Coin</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Market Cap</TableHead>
                <TableHead>24H</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right text-red-600">Remove</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {watchlist.watchlist?.coins?.map((item) => 
            <TableRow key={item.id}>
                <TableCell
                  className="font-medium flex items-center gap-2 cursor-pointer"
                  onClick={() => navigate(`/market/${item.id}`)}
                >
                    <Avatar className="-z-50">
                        <AvatarImage src={item.image}></AvatarImage>
                    </Avatar>
                    <span>{item.name}</span>
                </TableCell>
                <TableCell>{item.symbol}</TableCell>
                <TableCell>{item.total_volume}</TableCell>
                <TableCell>{item.market_cap}</TableCell>
                <TableCell className={item.price_change_percentage_24h < 0 ? 'text-red-600' : 'text-green-600'}>
                  {item.price_change_percentage_24h?.toFixed(2)}%
                </TableCell>
                <TableCell>${item.current_price}</TableCell>
                <TableCell className="text-right">
                  <Button onClick={() => handleRemoveFromWatchlist(item.id)} variant='outline' size='icon' className="h-10 w-10">
                    <BookmarkFilledIcon className='w-6 h-6'/>
                  </Button>
                </TableCell>
            </TableRow>)}
        </TableBody>
      </Table>
    </div>
  )
}

export default Watchlist
