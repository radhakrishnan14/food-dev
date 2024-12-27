import React from 'react'
import './Title.css'
const Title = ({text1,text2}) => {
  return (
    <div className='title'>
        <p className='title1'>{text1} <span>{text2}</span></p>
        <p className='title2'></p>
      
    </div>
  )
}

export default Title
