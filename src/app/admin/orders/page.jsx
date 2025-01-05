import React from 'react'
import ShowOrders from '../components/ShowOrders'

const OrdersPage = () => {
  return (
    <>
    <div>
        <div className="flex items-center justify-between bg-white p-2 rounded-md">
          <div>Orders</div>
        </div>
        <div className="relative max-w-full mt-4 bg-white rounded-md overflow-x-hidden">
          <ShowOrders/>
        </div>
      </div>
    </>
  )
}

export default OrdersPage