import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Sheet,SheetTrigger,SheetContent,SheetHeader,SheetTitle,SheetDescription } from '@/components/ui/sheet'
import { DragHandleHorizontalIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import React from 'react'
import Sidebar from './Sidebar'

const Navbar = () => {
  return (
    <div className='px-2 py-3 border-b z-50 bg-background bg-background/0 sticky top-0 left-0 right-0 flex justify-between items-center'>
        <div className='flex items-center gap-3'>
            <Sheet>
                <SheetTrigger>
                    <Button variant="ghost" size="icon" className="rounded-full h-11 w-11">
                       <DragHandleHorizontalIcon className='h-7 w-7'></DragHandleHorizontalIcon>
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-72 border-r-0 flex flex-col justify-center" side='left'>
                    <SheetHeader>
                        <SheetTitle>
                            <div className='text-3xl flex justify-center items-center gap-1'>
                                <Avatar>
                                    <AvatarImage src="https://images.unsplash.com/photo-1658225282648-b199eb2a4830?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNyeXB0byUyMHRyYWRpbmclMjBpY29ufGVufDB8fDB8fHww" alt="User avatar"></AvatarImage>
                                    <AvatarFallback>ET</AvatarFallback>
                                </Avatar>
                                <div>
                                    <span className='font-bold text-orange-500'>Eaze</span>
                                    <span>Treading</span>
                                </div>
                            </div>
                        </SheetTitle>
                    </SheetHeader>
                    <Sidebar></Sidebar>
                </SheetContent>
            </Sheet>
            <p className='text-sm lg:text-base cursor-pointer'>
                Eaze Trading
            </p>
            <div className='p-0 ml-9'>
                <Button variant='outline' className="flex items-center gap-3">
                    <MagnifyingGlassIcon></MagnifyingGlassIcon>
                    <span>Search</span>
                </Button>
            </div>
        </div>
        <div>
            <Avatar>
                <AvatarFallback>
                    E
                </AvatarFallback>
            </Avatar>
        </div>
    </div>
  )
}

export default Navbar