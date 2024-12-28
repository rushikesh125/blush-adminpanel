'use client'
import Link from 'next/link'
import React from 'react'

const CategoryArea = () => {
  return (
    <>
    <div className="Category-options  gap-x-8 hidden md:flex justify-center mt-5 py-5">
        <Link href={`/`} className="hover:text-accent-color">All Products</Link>
        <Link href={`/`} className="hover:text-accent-color">Top</Link>
        <Link href={`/`} className="hover:text-accent-color">Pant</Link>
        <Link href={`/`} className="hover:text-accent-color">Dress</Link>
        <Link href={`/`} className="hover:text-accent-color">Coord set</Link>
        <Link href={`/`} className="hover:text-accent-color">Bundles</Link>
        <Link href={`/`} className="hover:text-accent-color">Under ₹499</Link>
      </div>
    </>
  )
}

export default CategoryArea