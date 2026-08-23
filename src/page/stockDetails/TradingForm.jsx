import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DotIcon } from '@radix-ui/react-icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { payOrder } from '@/State/Order/Action'
import { getAssetByUserIdAndCoinId } from '@/State/Asset/Action'

const TradingForm = () => {
    const [orderType, setOrderType] = useState("BUY")
    const [amount, setAmount] = useState("")
    const dispatch = useDispatch()
    const { coin, wallet, asset, order } = useSelector(store => store)

    useEffect(() => {
        if (coin.coinDetails?.id) {
            dispatch(getAssetByUserIdAndCoinId(localStorage.getItem("jwt"), coin.coinDetails.id))
        }
    }, [coin.coinDetails?.id])

    const handleChange = (e) => {
        setAmount(e.target.value)
    }

    const currentPrice = coin.coinDetails?.market_data.current_price.usd

    const calculateOutput = () => {
        if (!amount || !currentPrice) return 0
        if (orderType === "BUY") {
            return (amount / currentPrice).toFixed(6)
        } else {
            return (amount * currentPrice).toFixed(2)
        }
    }

    const handleSubmit = () => {
        const jwt = localStorage.getItem("jwt")
        const quantity = orderType === "BUY" ? calculateOutput() : amount
        const orderData = {
            coinId: coin.coinDetails?.id,
            quantity: quantity,
            orderType: orderType
        }
        dispatch(payOrder(jwt, orderData))
        setAmount("")
    }

    const insufficientBalance = orderType === "BUY" && Number(amount) > (wallet.userWallet?.balance || 0)
    const insufficientQuantity = orderType === "SELL" && Number(amount) > (asset.asset?.quantity || 0)

    return (
        <div className='space-y-10 p-5'>
            <div>
                <div className='flex gap-4 items-center justify-between'>
                    <Input
                        className="py-7 focus:outline-none"
                        placeholder={orderType === "BUY" ? "Enter amount" : "Enter quantity"}
                        onChange={handleChange}
                        type="number"
                        name="amount"
                        value={amount}
                    />
                    <div>
                        <p className='border text-2xl flex justify-center items-center w-36 h-14 rounded-md'>
                            {orderType === "BUY" ? calculateOutput() : `$${calculateOutput()}`}
                        </p>
                    </div>
                </div>
                {insufficientBalance && (
                    <h1 className='text-red-600 text-center pt-4'>Insufficient wallet balance to buy</h1>
                )}
                {insufficientQuantity && (
                    <h1 className='text-red-600 text-center pt-4'>Insufficient quantity to sell</h1>
                )}
            </div>

            <div className='flex gap-5 items-center'>
                <div>
                    <Avatar>
                        <AvatarImage src={coin.coinDetails?.image.large} />
                    </Avatar>
                </div>
                <div>
                    <div className='flex items-center gap-2'>
                        <p>{coin.coinDetails?.symbol?.toUpperCase()}</p>
                        <DotIcon className='text-gray-400'></DotIcon>
                        <p className='text-gray-400'>{coin.coinDetails?.name}</p>
                    </div>
                    <div className='flex items-end gap-2'>
                        <p className='text-xl font-bold'>${currentPrice}</p>
                        <p className={coin.coinDetails?.market_data.market_cap_change_percentage_24h < 0 ? 'text-red-600' : 'text-green-600'}>
                            <span>{coin.coinDetails?.market_data.market_cap_change_24h}</span>
                            <span> ({coin.coinDetails?.market_data.market_cap_change_percentage_24h}%)</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className='flex items-center justify-between'>
                <p>Order Type</p>
                <p>Market Order</p>
            </div>

            <div className='flex items-center justify-between'>
                <p>{orderType === "BUY" ? "Available Cash" : "Available Quantity"}</p>
                <p>{orderType === "BUY"
                    ? `$${wallet.userWallet?.balance || 0}`
                    : (asset.asset?.quantity || 0)
                }</p>
            </div>

            <div>
                <Button
                    className={`w-full py-6 ${orderType === "SELL" ? "bg-red-600 text-white hover:bg-red-700" : "bg-green-600 text-white hover:bg-green-700"}`}
                    onClick={handleSubmit}
                    disabled={!amount || order.loading || insufficientBalance || insufficientQuantity}
                >
                    {orderType}
                </Button>
                <Button
                    variant='link'
                    className="w-full mt-5 text-xl"
                    onClick={() => { setOrderType(orderType === "BUY" ? "SELL" : "BUY"); setAmount("") }}
                >
                    {orderType === "BUY" ? "or Sell" : "or Buy"}
                </Button>
            </div>
        </div>
    )
}

export default TradingForm
