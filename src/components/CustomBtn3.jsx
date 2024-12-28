import React from 'react'

const CustomBtn3 = ({children,isLoading,onClick,className}) => {
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
         {children}
        </button>
      );
}

export default CustomBtn3