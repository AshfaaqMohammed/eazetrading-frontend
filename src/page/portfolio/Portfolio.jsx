import React, { useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { getAssetsForUser } from '@/State/Asset/Action'

const Portfolio = () => {
  const dispatch = useDispatch()
  const { asset } = useSelector(store => store)

  useEffect(() => {
    dispatch(getAssetsForUser(localStorage.getItem("jwt")))
  }, [])

  return (
    <div className='p-5 lg:px-20'>
      <h1 className='font-bold text-3xl pb-5'>Portfolio</h1>
      <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Change%</TableHead>
                <TableHead className="text-right">Value</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {asset.assets?.map((item) => {
            const currentPrice = item.coin?.current_price
            const buyPrice = item.buyPrice
            const change = currentPrice - buyPrice
            const changePercent = ((currentPrice - buyPrice) / buyPrice) * 100
            const value = item.quantity * currentPrice

            return (
            <TableRow key={item.id}>
                <TableCell className="font-medium flex items-center gap-2">
                    <Avatar className="-z-50">
                        <AvatarImage src={item.coin?.image}></AvatarImage>
                    </Avatar>
                    <span>{item.coin?.name}</span>
                </TableCell>
                <TableCell>${currentPrice}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell className={change < 0 ? 'text-red-600' : 'text-green-600'}>
                    {change >= 0 ? '+' : ''}{change?.toFixed(2)}
                </TableCell>
                <TableCell className={changePercent < 0 ? 'text-red-600' : 'text-green-600'}>
                    {changePercent >= 0 ? '+' : ''}{changePercent?.toFixed(2)}%
                </TableCell>
                <TableCell className="text-right">
                    ${value?.toFixed(2)}
                </TableCell>
            </TableRow>
            )})}
        </TableBody>
      </Table>
    </div>
  )
}

export default Portfolio
