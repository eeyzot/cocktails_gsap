import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';

//because these GAP plugins aren't automatically active. 
// You have to register them. And this line makes sure
// that both plugins are ready to use globally across your application.
gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <div className='flex-center h-[100vh]'>
      <h1 className='text-3xl text-indigo-300'>Hello World</h1>
    </div>
  )
}

export default App