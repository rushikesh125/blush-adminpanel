import React from 'react'

const CustomBtn = ({children,isLoading,onClick}) => {
    return (
        <button
          onClick={onClick}
          disabled={isLoading}
          className={`px-4 py-2 rounded-lg flex justify-center items-center  border-black border w-full
            ${
              isLoading
                ? " cursor-not-allowed"
                : ""
            }`}
        >
          {isLoading ? (
            "Loading..."
          ) : (
            <>
            {children}
            </>
            
          )}
        </button>
      );
}

export default CustomBtn