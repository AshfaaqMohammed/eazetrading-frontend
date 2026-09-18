// Lightweight client-side validation for the auth forms.
// Each validator returns an errors object keyed by field name; an empty
// object means the form is valid.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validateSignup = ({ fullName, email, password }) => {
  const errors = {}

  if (!fullName?.trim()) {
    errors.fullName = 'Full name is required.'
  }

  if (!email?.trim()) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_RE.test(email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  if (!password) {
    errors.password = 'Password is required.'
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters.'
  }

  return errors
}

export const validateSignin = ({ email, password }) => {
  const errors = {}

  if (!email?.trim()) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_RE.test(email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  if (!password) {
    errors.password = 'Password is required.'
  }

  return errors
}
