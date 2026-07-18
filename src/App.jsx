import { useState } from 'react'
import Hero from './sections/Hero'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Features from './sections/Features'
import HowToOrder from './sections/HowtoOrder'
import FAQ from './sections/FAQ'
import ContactForm from './sections/ContactForm'
import ProductGallery from './sections/ProductGallery'
import WhatsAppButton from './components/layout/WhatsAppButton'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
     <Hero/>
     <ProductGallery />
     <Features />
     <HowToOrder/> 
     <FAQ />
     <ContactForm />
     <Footer />
     <WhatsAppButton/>
       
    </>
  )
}

export default App
