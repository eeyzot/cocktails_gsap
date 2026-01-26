import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Cocktails from './components/Cocktails';
import About from './components/About';


//because these GAP plugins aren't automatically active. 
// You have to register them. And this line makes sure
// that both plugins are ready to use globally across your application.
gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <main>
      <Navbar />
      <Hero />  
      <Cocktails />
      <About />
    </main>
  )
}

export default App