import React, { useState } from 'react'
import "./Auth.css"
import Signup from './Signup'
import { Button } from '@/components/ui/button'
import { useLocation, useNavigate } from 'react-router-dom'
import ForgotPass from './ForgotPass'
import Signin from './Signin'
import { useDispatch, useSelector } from 'react-redux'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { verifyLoginOtp } from '@/State/Auth/Action'

const Auth = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const { auth } = useSelector(store => store)
    const [otp, setOtp] = useState("")

    const handleTwoFactorSubmit = () => {
        dispatch(verifyLoginOtp(otp, auth.twoStepSessionId, navigate))
        setOtp("")
    }

  return (
    <div className='h-screen relative authContainer'>
        <div className='absolute top-0 right-0 left-0 bottom-0 bg-[#030712]/50'>
            <div className='bgBlur absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-[30rem] rounded-md z-50
            bg-black/50 shadow-2xl shadow-white py-10'>
                <h1 className='text-6xl font-bold pb-9'>Eaze Trading</h1>

                {auth.twoFactorAuthEnabled ? (
                    <section className='px-10 w-full'>
                        <h1 className='text-xl font-bold text-center pb-5'>Two Factor Authentication</h1>
                        <p className='text-center text-gray-400 pb-5'>Enter the OTP sent to your email</p>
                        <div className='flex justify-center pb-5'>
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
                        </div>
                        <Button
                            onClick={handleTwoFactorSubmit}
                            disabled={otp.length < 6 || auth.loading}
                            className='w-full py-5'
                        >
                            Verify OTP
                        </Button>
                    </section>
                ) : location.pathname == "/signup" ? 
                    <section>
                        <Signup></Signup>
                        <div className='flex items-center justify-center'>
                            <span>have already account?</span>
                            <Button onClick={()=>navigate("/sigin")} variant="ghost" >SignIn</Button>

                        </div>
                    </section>
                : location.pathname == "/forgot-password" ? 
                    <section>
                        <ForgotPass></ForgotPass>
                        <div className='flex items-center justify-center'>
                            <span>Back to SignIn?</span>
                            <Button onClick={()=>navigate("/sigin")} variant="ghost" >SignIn</Button>

                        </div>
                    </section>
                : 
                    <section>
                        <Signin></Signin>
                        <div className='flex items-center justify-center'>
                            <span>dont't have already account?</span>
                            <Button onClick={()=>navigate("/signup")} variant="ghost" >SignUp</Button>

                        </div>

                        <div className='flex items-center justify-center mt-10'>
                            <Button onClick={()=>navigate("/forgot-password")} variant="outline" className="w-full py-5" >Forgot Password?</Button>

                        </div>
                    </section>
                }
                
            </div>
        </div>
    </div>
  )
}

export default Auth
