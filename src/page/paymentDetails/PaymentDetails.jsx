import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import PaymentDetailsForm from './PaymentDetailsForm'

const PaymentDetails = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className='px-20'>
      <h1 className='text-3xl font-bold py-10'>Payment Details</h1>
      
      {false ? 

        <Card>
          <CardHeader>
            Yes Bank
          </CardHeader>
          <CardDescription>
            A/C No: 
            **** **** **** 1234
          </CardDescription>
          <CardHeader>
            <div className='flex items-center'>
              <p className='w-32'>A/C Holder:</p>
              <p className='text-gray-400'>EazeCoding</p>
            </div>

            <div className='flex items-center'>
              <p className='w-32'>IFSC code:</p>
              <p className='text-gray-400'>YES00008383</p>
            </div>
          </CardHeader>
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
