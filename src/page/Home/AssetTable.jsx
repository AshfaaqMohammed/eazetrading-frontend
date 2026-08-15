import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AssetTable = ({coin,category}) => {
    const dispatch=useDispatch()
    const navigate=useNavigate()

    
  return (
    <Table>
        <ScrollArea className={`${category=="all"?"h-[68vh]":"h-[82vh]"}`}>
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
                {coin.map((item) => 
                <TableRow key={item.id}>
                    <TableCell onClick={()=>navigate(`/market/${item.id}`)} className="font-medium flex items-center gap-2 cursor-pointer">
                        <Avatar className="-z-50">
                            <AvatarImage src={item.image}></AvatarImage>
                        </Avatar>
                        <span>{item.name}</span>
                    </TableCell>
                    <TableCell>{item.symbol}</TableCell>
                    <TableCell>{item.total_volume}</TableCell>
                    <TableCell>{item.market_cap}</TableCell>
                    <TableCell>{item.price_change_24h}</TableCell>
                    <TableCell className="text-right">${item.current_price}</TableCell>
                </TableRow>)}
                
            </TableBody>
        </ScrollArea>
    </Table>
  )
}

export default AssetTable