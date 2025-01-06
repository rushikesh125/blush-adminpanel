import React from 'react'
import ShowReviews from '../components/ShowReviews'

const ReviewsPage = () => {
  return (
    <>
    <div>
        <div className="flex items-center justify-between bg-white p-2 rounded-md">
          <div>Reviews</div>
        </div>
        <div className="relative max-w-full mt-4 bg-white rounded-md overflow-x-hidden">
          <ShowReviews/>
        </div>
      </div>
    </>
  )
}

export default ReviewsPage