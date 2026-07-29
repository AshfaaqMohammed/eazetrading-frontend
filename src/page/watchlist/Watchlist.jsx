import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { BookmarkFilledIcon } from '@radix-ui/react-icons'

const Watchlist = () => {

  const handleRemoveFromWatchlist = (value) => {
    console.log(value);
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
            {[1,1,1,1,1,1,1,1,1].map((item, index) => 
            <TableRow key={index}>
                <TableCell className="font-medium flex items-center gap-2">
                    <Avatar className="-z-50">
                        <AvatarImage src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"></AvatarImage>
                    </Avatar>
                    <span>Bitcoin</span>
                </TableCell>
                <TableCell>BTC</TableCell>
                <TableCell>9746372</TableCell>
                <TableCell>12334234675</TableCell>
                <TableCell>-0.2009</TableCell>
                <TableCell className="">$69249</TableCell>
                <TableCell className="text-right">
                  <Button onClick={() => handleRemoveFromWatchlist(item)} variant='outline' size='icon' className="h-10 w-10">
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