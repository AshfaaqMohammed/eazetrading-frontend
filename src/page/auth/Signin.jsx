import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    console.log(formData)
  }

  return (
    <div className='pt-5 space-y-5'>
        <h1 className='text-xl font-bold text-center'>SignIn</h1>
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

      <div className='space-y-2'>
        <Label htmlFor='password'>Password</Label>
        <Input
          id='password'
          name='password'
          type='password'
          onChange={handleChange}
          value={formData.password}
          className='py-5'
          placeholder='Enter your password'
        />
      </div>

      <Button onClick={handleSubmit} className='w-full py-5'>
        Sign In
      </Button>
    </div>
  )
}

export default Signin
