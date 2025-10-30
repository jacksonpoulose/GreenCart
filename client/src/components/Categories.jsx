import React from 'react'
import { assets,categories } from '../assets/assets'
import { useAppContext } from '../context/AppContext'


const Categories = () => {
    const navigate=useAppContext().navigate
  return (
    <div className="mt-16">
        <p className='text-2xl md:text-3xl font-medium'>Categories</p>
        <div className='mt-6 gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7'>
        {categories.map((category, index) =>      
               
                <div className="group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center" key={index} style={{backgroundColor: category.bgColor}}
                onClick={()=>{navigate(`/products/${category.path.toLowerCase()}`)
                scrollTo(0,0)}}>
                <img src={category.image}  alt="image" className='group hover:scale-108 transition max-w-28'/> 
                <p className="set-sm font-medium">{category.text}</p>    
            </div>
            ) 
            }

</div> 
    </div>
  )
}

export default Categories