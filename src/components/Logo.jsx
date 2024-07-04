import React from 'react'
import reactLogo from '../assets/logo.png'

function Logo({width = '40px'}) {
    return (
        <div className='w-full'>
            <img src={reactLogo} alt="" width={width}/>
        </div>
    )
}

export default Logo
