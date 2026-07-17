import { useState } from 'react'
import Hero from './sections/Hero'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Features from './sections/Features'
import HowToOrder from './sections/HowtoOrder'
import FAQ from './sections/FAQ'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
     <Hero/>
     <Features />
     <HowToOrder/> 
     <FAQ />
     <Footer />
       
    </>
  )
}

export default App
