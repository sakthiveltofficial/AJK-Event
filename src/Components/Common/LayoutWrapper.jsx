import React from 'react'

const LayoutWrapper = ({children}) => {
  return (
    <>
    <div className="w-full h-[100vh] relative p-5 ">
      <div id="main-scroll-area" className="w-full h-full relative  rounded-[3rem] overflow-auto scrollbar-hide pt-[5rem] bg-white bg-dotted-pattern">

      {children}
        
      </div>
    </div>
    </>
  )
}

export default LayoutWrapper