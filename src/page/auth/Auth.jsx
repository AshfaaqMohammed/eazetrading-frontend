import React from 'react'
import "./Auth.css"
import Signup from './Signup'
import { Button } from '@/components/ui/button'
import { useLocation, useNavigate } from 'react-router-dom'
import ForgotPass from './ForgotPass'
import Signin from './Signin'

const Auth = () => {
    const navigate = useNavigate()
    const location = useLocation()
  return (
    <div className='h-screen relative authContainer'>
        <div className='absolute top-0 right-0 left-0 bottom-0 bg-[#030712]/50'>
            <div className='bgBlur absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-[30rem] rounded-md z-50
            bg-black/50 shadow-2xl shadow-white py-10'>
                <h1 className='text-6xl font-bold pb-9'>Eaze Trading</h1>


                {location.pathname == "/signup" ? 
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