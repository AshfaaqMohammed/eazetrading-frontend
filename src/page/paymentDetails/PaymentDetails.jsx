import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { CreditCard, Building2, User, Hash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import PaymentDetailsForm from './PaymentDetailsForm'
import { useDispatch, useSelector } from 'react-redux'
import { getPaymentDetails } from '@/State/Withdrawal/Action'

const PaymentDetails = () => {
  const {withdrawal} = useSelector(store=>store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPaymentDetails(localStorage.getItem("jwt")))
  },[])
  const [open, setOpen] = useState(false)

  return (
    <div className='px-20'>
      <h1 className='text-3xl font-bold py-10'>Payment Details</h1>
      
      {withdrawal.paymentDetails ? 

        <Card className="max-w-lg border border-slate-700 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-xl">
          <CardHeader className="pb-4">
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='p-2 rounded-lg bg-blue-500/10'>
                  <Building2 className='h-5 w-5 text-blue-400' />
                </div>
                <CardTitle className='text-xl font-semibold'>{withdrawal.paymentDetails.bankName}</CardTitle>
              </div>
              <div className='px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20'>
                <span className='text-xs text-green-400 font-medium'>Verified</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className='flex items-center gap-3 p-3 rounded-lg bg-slate-800/50'>
              <CreditCard className='h-4 w-4 text-slate-400' />
              <div>
                <p className='text-xs text-slate-500 uppercase tracking-wide'>Account Number</p>
                <p className='text-sm font-mono text-slate-200'>**** **** {withdrawal.paymentDetails.accountNumber?.slice(-4)}</p>
              </div>
            </div>

            <div className='flex items-center gap-3 p-3 rounded-lg bg-slate-800/50'>
              <User className='h-4 w-4 text-slate-400' />
              <div>
                <p className='text-xs text-slate-500 uppercase tracking-wide'>Account Holder</p>
                <p className='text-sm font-medium text-slate-200'>{withdrawal.paymentDetails.accountHolderName}</p>
              </div>
            </div>

            <div className='flex items-center gap-3 p-3 rounded-lg bg-slate-800/50'>
              <Hash className='h-4 w-4 text-slate-400' />
              <div>
                <p className='text-xs text-slate-500 uppercase tracking-wide'>IFSC Code</p>
                <p className='text-sm font-mono text-slate-200'>{withdrawal.paymentDetails.ifsc}</p>
              </div>
            </div>
          </CardContent>
        </Card> 
      : 
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button className="py-6">Add payment details</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
            </DialogHeader>
            <PaymentDetailsForm onClose={() => setOpen(false)}/>
          </DialogContent>
        </Dialog>
      }
      
      
    </div>
  )
}

export default PaymentDetails
