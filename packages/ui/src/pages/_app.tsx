import React from "react"
import { ToastContainer } from 'react-toastify'

const ToastedApp = ({ Component, pageProps, auth }) => (
  <ToastContainer>
    <Component {...pageProps}/>
  </ToastContainer>
)

export default ToastedApp