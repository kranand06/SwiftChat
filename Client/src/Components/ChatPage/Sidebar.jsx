import React from 'react'
import { Menu } from 'lucide-react';

const Sidebar = () => {
    return (
        <div className='p-5 border-r-2 border-gray-500'>
            <div className='flex flex-row justify-between gap-4'>
                <div className='flex flex-row items-center gap-4'>
                    <img className='w-8' src="favicon.svg" alt="logo" />
                    <h1 className='text-xl font-semibold'>SwiftChat</h1>
                </div>
                <Menu className='text-xl font-medium w-6 cursor-pointer hover:text-accent transition-colors duration-200' />
            </div>
            
        </div>
    )
}

export default Sidebar