import { createPortal } from 'react-dom'

// Renders its children into a fixed top-right container attached directly to
// <body>. This is required because the auth card uses `backdrop-filter`, which
// creates a containing block for `position: fixed` — so a fixed element inside
// the card would anchor to the card, not the viewport. Portaling to <body>
// escapes that containing block and pins the toast to the real screen corner.
const AuthToast = ({ children }) => {
  return createPortal(
    <div className='fixed top-5 right-5 w-[22rem] max-w-[90vw] z-[100]'>
      {children}
    </div>,
    document.body
  )
}

export default AuthToast
