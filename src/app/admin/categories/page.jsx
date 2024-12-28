import React, { Suspense } from 'react'
import ShowCategory from '../components/ShowCategory'
import CreateCategory from '../components/CreateCategory'


const AdminsPage = () => {
  return (
    <div className='flex flex-wrap justify-evenly'>
       <Suspense fallback={<div>Loading...</div>}>
       <CreateCategory/>
       </Suspense>
        <ShowCategory/>
    </div>
  )
}

export default AdminsPage