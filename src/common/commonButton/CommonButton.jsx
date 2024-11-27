import React from 'react'

const CommonButton = ({common_button_content, common_button_type, common_button_bg}) => {
  return (
      <>
          <button type= {common_button_type} className= {`${common_button_bg} font-DMsans font-medium text-[20px] leading-[26px] text-[#fff] rounded-[100px] w-[120px] h-[60px] flex items-center justify-center`} >{ common_button_content} </button>
      </>
  )
}

export default CommonButton