import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'

const PaymentDetailsForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    accountHolderName: '',
    ifsc: '',
    accountNumber: '',
    confirmAccountNumber: '',
    bankName: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (formData.accountNumber !== formData.confirmAccountNumber) {
      alert('Account numbers do not match')
      return
    }
    console.log(formData)
    onClose()
  }

  return (
    <div className='pt-5 space-y-5'>
      <div className='space-y-2'>
        <Label htmlFor='accountHolderName'>Account Holder Name</Label>
        <Input
          id='accountHolderName'
          name='accountHolderName'
          onChange={handleChange}
          value={formData.accountHolderName}
          className='py-5'
          placeholder='Enter account holder name'
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='ifsc'>IFSC Code</Label>
        <Input
          id='ifsc'
          name='ifsc'
          onChange={handleChange}
          value={formData.ifsc}
          className='py-5'
          placeholder='e.g. YESB0000001'
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='accountNumber'>Account Number</Label>
        <Input
          id='accountNumber'
          name='accountNumber'
          onChange={handleChange}
          value={formData.accountNumber}
          className='py-5'
          placeholder='Enter account number'
          inputMode='numeric'
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='confirmAccountNumber'>Confirm Account Number</Label>
        <Input
          id='confirmAccountNumber'
          name='confirmAccountNumber'
          onChange={handleChange}
          value={formData.confirmAccountNumber}
          className='py-5'
          placeholder='Re-enter account number'
          inputMode='numeric'
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='bankName'>Bank Name</Label>
        <Input
          id='bankName'
          name='bankName'
          onChange={handleChange}
          value={formData.bankName}
          className='py-5'
          placeholder='e.g. Yes Bank'
        />
      </div>

      <Button onClick={handleSubmit} className='w-full py-7 text-lg'>
        Submit
      </Button>
    </div>
  )
}

export default PaymentDetailsForm
