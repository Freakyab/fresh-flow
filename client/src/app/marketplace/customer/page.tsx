import React from 'react'
import Image from 'next/image'
function page() {

  const data = [
    { 
      id : '1',
      cropName : 'Ganja',
      price : '1000',
      img : '/appInfo3.jpg',
      farmerName : 'John Doe',
      farmerLocation : 'Kumasi',
      farmerContact : '0245678901',
      
    },
  ]


  return (
    <div className='h-full bg-light-bg'>
        <div className=''>
        <Image
          src="/appInfo3.jpg"
          alt="image"
          width={800}
          height={800}
          className=" w-full h-[500px] object-cover"
        />
        </div>
        <div className='w-full flex justify-center items-center'>
          <p>Crops List</p>
          
        </div>
    </div>
  )
}

export default page;