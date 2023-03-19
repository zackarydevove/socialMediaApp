import React from 'react'

function Terms() {
  return (
    <div className='flex flex-col text-gray-600 mt-4'>
        <div className='flex gap-3'>
            <p className='text-sm'>Terms of Service</p>
            <p className='text-sm'>Privacy Policy</p>
            <p className='text-sm'>Cookie Policy</p>
        </div>
        <div className='flex gap-3'>
            <p className='text-sm'>Accessibility</p>
            <p className='text-sm'>Ads info</p>
        </div>
      <p className='text-sm'>© 2023 Twitter, Inc.</p>
    </div>
  )
}

export default Terms
