import { Outlet } from "react-router-dom"
import Header from "../Header"
import Footer from "../Footer"


const Container = () => {
  return (
    <>
      <Header/> 
      <Outlet/> 
      <Footer/>
    </>
  )
}

export default Container;