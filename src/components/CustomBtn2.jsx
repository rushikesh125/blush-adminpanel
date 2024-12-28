import React from 'react'

const CustomBtn2 = ({children,isLoading,onClick,className}) => {
    return (
        <button
        
          onClick={onClick}
          disabled={isLoading}
          className={`${className} flex justify-center items-center 
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

export default CustomBtn2