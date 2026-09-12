import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendVerificationOtp, enableTwoFactorAuth } from '@/State/Auth/Action'

const AccountVarificationForm = () => {
    const [otp, setOtp] = useState("")
    const dispatch = useDispatch()
    const { auth } = useSelector(store => store)

    const handleSendOtp = () => {
        dispatch(sendVerificationOtp(localStorage.getItem("jwt"), "EMAIL"))
    }

    const handleSubmit = () => {
        dispatch(enableTwoFactorAuth(localStorage.getItem("jwt"), otp))
        setOtp("")
    }

    return (
        <div className='flex justify-center'>
            <div className='space-y-5 mt-10 w-full'>
                <div className='flex items-center gap-3'>
                    <p className='shrink-0'>Email: </p>
                    <p className='truncate'>{auth.user?.email}</p>
                    <Dialog>
                        <DialogTrigger>
                            <Button onClick={handleSendOtp} className="shrink-0">Send OTP</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Enter OTP</DialogTitle>
                            </DialogHeader>
                            <div className='py-5 flex flex-col gap-5 items-center'>
                                <InputOTP value={otp} onChange={(value) => setOtp(value)} maxLength={6}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                                <DialogClose className='w-full'>
                                    <Button onClick={handleSubmit} className="w-full">Submit</Button>
                                </DialogClose>
                                <Button onClick={handleSendOtp} variant="link">
                                    Resend OTP
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default AccountVarificationForm
