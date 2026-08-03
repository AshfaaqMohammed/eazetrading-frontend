import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AssetTable = () => {
    const navigate=useNavigate()
  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead className="w-[100px]">Coin</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Market Cap</TableHead>
                <TableHead>24h</TableHead>
                <TableHead className="text-right">Price</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {[1,1,1,1,1,1,1,1,1].map((item, index) => 
            <TableRow key={index}>
                <TableCell onClick={()=>navigate("/market/bitcoin")} className="font-medium flex items-center gap-2 cursor-pointer">
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
  )
}

export default AssetTable