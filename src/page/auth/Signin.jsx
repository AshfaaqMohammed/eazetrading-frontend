import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '@/State/Auth/Action'
import { useNavigate, useLocation } from 'react-router-dom'
import { AlertTriangle, Loader2 } from 'lucide-react'
import AuthToast from './AuthToast'
import { validateSignin } from './validation'

const Signin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { auth } = useSelector((store) => store)

  const [formData, setFormData] = useState({
    // Prefilled when arriving from Signup's "Log in instead" recovery link.
    email: location.state?.email || '',
    password: '',
  })

  // Local flag so we only react to errors caused by *this* submit.
  const [attempted, setAttempted] = useState(false)
  // A monotonically increasing token; changing it remounts the form via `key`
  // so the CSS shake/glow animation replays on every failed attempt.
  const [shakeToken, setShakeToken] = useState(0)
  // Per-field client-side validation errors.
  const [fieldErrors, setFieldErrors] = useState({})

  const showError = attempted && !!auth.error && !auth.loading

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
    // Client-side validation first so empty/invalid fields get clear feedback
    // instead of the button silently doing nothing.
    const errors = validateSignin(formData)
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) {
      setShakeToken((t) => t + 1)
      return
    }

    setAttempted(true)
    // The login thunk resolves after LOGIN_SUCCESS/LOGIN_FAILURE is dispatched.
    // Bumping the token here (in an event handler) remounts the form so the
    // shake/glow animation replays on every attempt — including repeat fails.
    await dispatch(login({ formData, navigate }))
    setShakeToken((t) => t + 1)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div
      key={shakeToken}
      className={`relative pt-5 space-y-5 p-4 rounded-lg ${
        showError ? 'authShake' : ''
      }`}
    >
      <h1 className='text-xl font-bold text-center'>SignIn</h1>

      {showError && (
        <AuthToast>
          <div
            role='alert'
            aria-live='assertive'
            className='authAlert flex items-start gap-3 rounded-lg border border-red-500/40 bg-[#2a1414]/95 px-4 py-3 text-red-300 shadow-xl'
          >
            <AlertTriangle className='authIconPop mt-0.5 h-5 w-5 shrink-0 text-red-400' />
            <div className='space-y-0.5'>
              <p className='font-semibold text-red-200'>Login failed</p>
              <p className='text-sm text-red-300/90'>
                The email or password you entered is incorrect. Please try again.
              </p>
            </div>
          </div>
        </AuthToast>
      )}

      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          name='email'
          type='email'
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={formData.email}
          aria-invalid={showError || !!fieldErrors.email}
          className={`py-5 ${
            fieldErrors.email ? 'border-red-500 focus-visible:ring-red-500' : ''
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
          aria-invalid={showError || !!fieldErrors.password}
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
            Signing In...
          </span>
        ) : (
          'Sign In'
        )}
      </Button>
    </div>
  )
}

export default Signin
