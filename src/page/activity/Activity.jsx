import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

const Activity = () => {
  return (
    <div className='p-5 lg:px-20'>
      <h1 className='font-bold text-3xl pb-5'>Activity</h1>
      <Table className="border">
        <TableHeader>
            <TableRow>
                <TableHead className="py-4">Date & Time</TableHead>
                <TableHead>Trading Pair</TableHead>
                <TableHead>Buy Price</TableHead>
                <TableHead>Selling Price</TableHead>
                <TableHead>Order Type</TableHead>
                <TableHead>Profit/Loss</TableHead>
                <TableHead className="text-right">Value</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {[1,1,1,1,1,1,1,1,1].map((item, index) => 
            <TableRow key={index}>
                <TableCell>
                  <p>29-06-2026</p>
                  <p text-gray-500>23:07:24</p>
                </TableCell>
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
                <TableCell className="text-right">345</TableCell>
            </TableRow>)}
            
        </TableBody>
    </Table>
    </div>
  )
}

export default Activity