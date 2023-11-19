import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function GoBackBtn() {
    const navigate = useNavigate()

    const goBackAction = () => {
        navigate(-1)
    }

  return (
    <i className='bx bx-left-arrow-alt bx-md text-zinc-300 fixed top-5 left-3 cursor-pointer z-50' onClick={goBackAction}></i>
  )
}
