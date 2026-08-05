import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const ForgotPass = () => {
  const [formData, setFormData] = useState({
    email: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    console.log(formData)
  }

  return (
    <div className='pt-5 space-y-5'>
      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          name='email'
          type='email'
          onChange={handleChange}
          value={formData.email}
          className='py-5'
          placeholder='Enter your email'
        />
      </div>

      <Button onClick={handleSubmit} className='w-full py-5'>
        Reset Password
      </Button>
    </div>
  )
}

export default ForgotPass
