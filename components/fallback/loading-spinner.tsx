import React from 'react'
import { HashLoader as Loader } from 'react-spinners';
const HashLoader = () => {
    return (
        <div className='h-screen flex items-center justify-center'>
            <Loader className='w-10 h-10' />
        </div>
    )
}

export default HashLoader