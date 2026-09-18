import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '@/State/Auth/Action'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, Loader2, MailWarning } from 'lucide-react'
import AuthToast from './AuthToast'
import { validateSignup } from './validation'

// Pull a plain message string out of auth.error, which may be a string
// (legacy) or an object { message, status } (register failures).
const readError = (error) => {
  if (!error) return ''
  if (typeof error === 'string') return error
  return error.message || ''
}
const readStatus = (error) =>
  error && typeof error === 'object' ? error.status : undefined

const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { auth } = useSelector((store) => store)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  })

  // Only react to errors caused by *this* submit.
  const [attempted, setAttempted] = useState(false)
  // Bumped after each attempt so the shake/glow animation replays via `key`.
  const [shakeToken, setShakeToken] = useState(0)
  // Per-field client-side validation errors, e.g. { email: 'Email is required.' }
  const [fieldErrors, setFieldErrors] = useState({})

  const errorMessage = readError(auth.error)
  const errorStatus = readStatus(auth.error)
  const showError = attempted && !!errorMessage && !auth.loading

  // Duplicate email = HTTP 409 (preferred) or a message that mentions it.
  const isEmailTaken =
    showError &&
    (errorStatus === 409 ||
      /already used|already registered|already exists|email.*taken/i.test(
        errorMessage
      ))

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    // Clear the server error UI as soon as the user starts fixing their input.
    if (attempted) setAttempted(false)
    // Clear this field's validation error while the user edits it.
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const handleSubmit = async () => {
    // Client-side validation first — surfaces "X is required" instead of
    // silently doing nothing when fields are empty/invalid.
    const errors = validateSignup(formData)
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) {
      setShakeToken((t) => t + 1) // shake the form to draw attention
      return
    }

    setAttempted(true)
    await dispatch(register(formData, navigate))
    setShakeToken((t) => t + 1)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  // Send the returning user to sign-in with their email prefilled.
  const goToLogin = () => {
    navigate('/sigin', { state: { email: formData.email } })
  }

  return (
    <div
      key={shakeToken}
      className={`relative pt-5 space-y-5 p-4 rounded-lg ${
        showError ? 'authShake' : ''
      }`}
    >
      {/* Floating error toast — portaled to <body> and pinned to the top-right
          corner of the viewport, so it never overlaps the card or changes its size. */}
      {showError && (
        <AuthToast>
          {isEmailTaken ? (
            <div
              role='alert'
              aria-live='assertive'
              className='authAlert flex items-start gap-3 rounded-lg border border-amber-500/40 bg-[#2a2213]/95 px-4 py-3 text-amber-200 shadow-xl'
            >
              <MailWarning className='authIconPop mt-0.5 h-5 w-5 shrink-0 text-amber-400' />
              <div className='space-y-1'>
                <p className='font-semibold text-amber-100'>This email already has an account</p>
                <p className='text-sm text-amber-200/90'>
                  Looks like you've been here before.{' '}
                  <button
                    type='button'
                    onClick={goToLogin}
                    className='font-semibold underline underline-offset-2 hover:text-amber-100'
                  >
                    Log in instead &rarr;
                  </button>
                </p>
              </div>
            </div>
          ) : (
            <div
              role='alert'
              aria-live='assertive'
              className='authAlert flex items-start gap-3 rounded-lg border border-red-500/40 bg-[#2a1414]/95 px-4 py-3 text-red-300 shadow-xl'
            >
              <AlertTriangle className='authIconPop mt-0.5 h-5 w-5 shrink-0 text-red-400' />
              <div className='space-y-0.5'>
                <p className='font-semibold text-red-200'>Couldn't create account</p>
                <p className='text-sm text-red-300/90'>
                  {errorMessage || 'Something went wrong. Please try again.'}
                </p>
              </div>
            </div>
          )}
        </AuthToast>
      )}

      <h1 className='text-xl font-bold text-center'>Create New Account</h1>

      <div className='space-y-2'>
        <Label htmlFor='fullName'>Full Name</Label>
        <Input
          id='fullName'
          name='fullName'
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={formData.fullName}
          aria-invalid={!!fieldErrors.fullName}
          className={`py-5 ${
            fieldErrors.fullName ? 'border-red-500 focus-visible:ring-red-500' : ''
          }`}
          placeholder='Enter your full name'
        />
        {fieldErrors.fullName && (
          <p className='text-sm text-red-400'>{fieldErrors.fullName}</p>
        )}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          name='email'
          type='email'
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={formData.email}
          aria-invalid={isEmailTaken || !!fieldErrors.email}
          className={`py-5 ${
            isEmailTaken
              ? 'border-amber-500 focus-visible:ring-amber-500'
              : fieldErrors.email
              ? 'border-red-500 focus-visible:ring-red-500'
              : ''
          }`}
          placeholder='Enter your email'
        />
        {fieldErrors.email && (
          <p className='text-sm text-red-400'>{fieldErrors.email}</p>
        )}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='password'>Password</Label>
        <Input
          id='password'
          name='password'
          type='password'
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={formData.password}
          aria-invalid={!!fieldErrors.password}
          className={`py-5 ${
            fieldErrors.password ? 'border-red-500 focus-visible:ring-red-500' : ''
          }`}
          placeholder='Enter your password'
        />
        {fieldErrors.password && (
          <p className='text-sm text-red-400'>{fieldErrors.password}</p>
        )}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={auth.loading}
        className='w-full py-5'
      >
        {auth.loading ? (
          <span className='flex items-center justify-center gap-2'>
            <Loader2 className='h-4 w-4 animate-spin' />
            Creating account...
          </span>
        ) : (
          'Sign Up'
        )}
      </Button>
    </div>
  )
}

export default Signup
