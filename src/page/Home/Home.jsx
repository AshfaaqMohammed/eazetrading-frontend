import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import AssetTable from './AssetTable';
import StockChart from './StockChart';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { DotIcon } from '@radix-ui/react-icons';
import { MessageCircle } from 'lucide-react';

const Home = () => {

    const [category, setCategory] = useState("all");

    const handleCategory = (value) => {
        setCategory(value);
    }

  return (
    <div className='relative'>
        <div className='lg:flex'>

            <div className='lg:w-[50%] lg:border-r'>

                <div className='p-3 flex items-center gap-4'>

                    <Button onClick={() => handleCategory("all")} variant={category == "all" ? "default" : "outline"} className='rounded-full'>All</Button>
                    <Button onClick={() => handleCategory("top50")} variant={category == "top50" ? "default" : "outline"} className='rounded-full'>Top 50</Button>
                    <Button onClick={() => handleCategory("topGainers")} variant={category == "topGainers" ? "default" : "outline"} className='rounded-full'>Top Gainers</Button>
                    <Button onClick={() => handleCategory("topLoosers")} variant={category == "topLoosers" ? "default" : "outline"} className='rounded-full'>Top Lossers</Button>

                </div>
                <AssetTable>

                </AssetTable>

            </div>

            <div className='hidden lg:block lg:w-[50%] p-5'>
                <StockChart></StockChart>

                <div className='flex gap-5 items-center'>
                    <div>
                        <Avatar>
                            <AvatarImage src={"https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"}></AvatarImage>
                        </Avatar>
                    </div>
                    <div>
                        <div className='flex items-center gap-2'>
                        <p>BTC</p>
                        <DotIcon className='text-gray-400'></DotIcon>
                        <p className='text-gray-400'>Bitcoin</p>
                    </div>
                    <div className='flex items-end gap-2'>
                        <p className='text-xl font-bold'>
                            $69249
                        </p>
                        <p className='text-red-600'>
                            <span>-1342342.567</span>
                            <span>(-0.23423%)</span>
                        </p>
                    </div>
                    </div>

                </div>
            </div>
        </div>
        <section className='absolute bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2'>
            <div className='relative w-[10rem] cursor-pointer group'>
                <Button className="w-full h-[2rem] gap-2 items-center">
                    <MessageCircle size={30} className='fill-[#1e293b] -rotate-90 stroke-none group-hover:file-[#1a1a1a]'></MessageCircle>
                    <span className='text-1xl'>Chat Bot</span>
                </Button>
            </div>
        </section>
    </div>
  )
}

export default Home