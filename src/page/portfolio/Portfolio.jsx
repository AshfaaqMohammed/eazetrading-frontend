import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

const Portfolio = () => {
  return (
    <div className='p-5 lg:px-20'>
      <h1 className='font-bold text-3xl pb-5'>Portfolio</h1>
      <Table>
        <TableHeader>
            <TableRow>
                <TableHead className="">Asset</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Change%</TableHead>
                <TableHead className="text-right">Value</TableHead>
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
                <TableCell className="text-right">$69249</TableCell>
            </TableRow>)}
            
        </TableBody>
    </Table>
    </div>
  )
}

export default Portfolio