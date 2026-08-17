import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { paymentHandler } from '@/State/Wallet/Action'
import { DotFilledIcon } from '@radix-ui/react-icons'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const TopupForm = () => {
    const dispatch = useDispatch();
    const [amount, setAmount] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('RAZORPAY')

    const handlePaymentMethodChange = (value) => {
        setPaymentMethod(value)
    }

    const handleChange = (e) => {
        setAmount(e.target.value)
    }

    const handleSubmit = () => {
        console.log(amount, paymentMethod);
        dispatch(paymentHandler(localStorage.getItem("jwt"),paymentMethod,Number(amount)))
    }

  return (
    <div className='pt-10 space-y-5'>
        <div>
            <h1 className='pb-1'>Enter Amount</h1>
            <Input onChange={handleChange} value={amount} className="py-7 text-lg" placeholder="$9999"></Input>
        </div>

        <div>
            <h1 className='pb-2'>Select payment method</h1>
            <RadioGroup onValueChange={(value)=>handlePaymentMethodChange(value)} className="flex gap-3" defaultValue="RAZORPAY">
                <div className='flex items-center space-x-2 border p-3 rounded-md cursor-pointer'>
                    <RadioGroupItem icon={DotFilledIcon} className="h-5 w-5" value="RAZORPAY" id="r1"></RadioGroupItem>
                    <Label htmlFor="r1">
                        <div className='bg-white rounded-md px-3 py-2 w-24'>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Razorpay_logo.svg/1200px-Razorpay_logo.svg.png" alt="Razorpay" />
                        </div>
                    </Label>
                </div>

                <div className='flex items-center space-x-2 border p-3 rounded-md cursor-pointer'>
                    <RadioGroupItem icon={DotFilledIcon} className="h-5 w-5" value="STRIPE" id="s1"></RadioGroupItem>
                    <Label htmlFor="s1">
                        <div className='bg-white rounded-md px-3 py-2 w-24'>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/1200px-Stripe_Logo%2C_revised_2016.svg.png" alt="Stripe" />
                        </div>
                    </Label>
                </div>
            </RadioGroup>
        </div>
        <Button onClick={handleSubmit} className="w-full py-7">
            Submit
        </Button>
    </div>
  )
}

export default TopupForm
