import React from 'react'
import ShowCustomers from '../components/ShowCustomers'
const CustomersPage = () => {
  return (
    <div>
        <div className="flex items-center justify-between bg-white p-2 rounded-md">
          <div>Customers</div>
        </div>
        <div className="relative max-w-full mt-4 bg-white rounded-md overflow-x-hidden">
          <ShowCustomers/>
        </div>
      </div>
  )
}

export default CustomersPage