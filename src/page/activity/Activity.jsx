import React, { useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersForUser } from '@/State/Order/Action'

const Activity = () => {
  const dispatch = useDispatch()
  const { order } = useSelector(store => store)

  useEffect(() => {
    dispatch(getAllOrdersForUser(localStorage.getItem("jwt")))
  }, [])

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString()
    }
  }

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
            {order.orders?.map((item) => {
              const { date, time } = formatDate(item.timestamp)
              const buyPrice = item.orderItem?.buyPrice
              const sellPrice = item.orderItem?.sellPrice
              const quantity = item.orderItem?.quantity
              const profitLoss = item.orderType === "SELL"
                ? ((sellPrice - buyPrice) * quantity).toFixed(2)
                : "-"

              return (
                <TableRow key={item.id}>
                    <TableCell>
                      <p>{date}</p>
                      <p className='text-gray-500'>{time}</p>
                    </TableCell>
                    <TableCell className="font-medium flex items-center gap-2">
                        <Avatar className="-z-50">
                            <AvatarImage src={item.orderItem?.coin?.image}></AvatarImage>
                        </Avatar>
                        <span>{item.orderItem?.coin?.name}</span>
                    </TableCell>
                    <TableCell>${buyPrice}</TableCell>
                    <TableCell>{item.orderType === "SELL" ? `$${sellPrice}` : "-"}</TableCell>
                    <TableCell>
                      <span className={item.orderType === "BUY" ? "text-green-600" : "text-red-600"}>
                        {item.orderType}
                      </span>
                    </TableCell>
                    <TableCell className={profitLoss !== "-" && Number(profitLoss) >= 0 ? "text-green-600" : "text-red-600"}>
                      {profitLoss !== "-" ? `$${profitLoss}` : "-"}
                    </TableCell>
                    <TableCell className="text-right">${item.price}</TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
    </div>
  )
}

export default Activity
