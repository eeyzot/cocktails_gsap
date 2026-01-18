import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all';
import React from 'react'
import gsap from 'gsap';

const Hero = () => {
  useGSAP( () => {
    // use the split text gap plugin that'll break our text into smaller pieces so we can animate them individually
    const heroSplit = new SplitText(".title", { type: "chars, words"});    // Split the text into characters and words
    const paragraphSplit = new SplitText(".subtitle", { type: "lines"});

    heroSplit.chars.forEach( (char) => char.classList.add("text-gradient"));

    gsap.from( heroSplit.chars, {
      yPercent: 100,  // Start 100% below their normal position
      duration: 1.8,  // Animation lasts 1.8 seconds
      ease: "expo.out", // Easing function for smooth animation,Starts fast, ends slow (smooth deceleration)
      stagger: 0.06  // Stagger the start time of each character's animation by 0.06 seconds
                    // M starts at 0s
                     // O starts at 0.06s
                     // J starts at 0.12s
                     // I starts at 0.18s
                     // T starts at 0.24s
                     // O starts at 0.30s
    })

    gsap.from( paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1
    });

    gsap.timeline( {
      scrollTrigger: {
        trigger: "#hero",    // 1. Watch #hero section
        start: "top top",   // Meaning: "When top of #hero reaches top of viewport"
        //      ↑    ↑
        //      │    └─ Viewport position (top of screen)
        //      └────── Element position (top of #hero)
        end: "bottom top",     // End when hero's bottom hits viewport's top
        scrub: true,
        //**Scrub** means the animation is **directly tied to your scroll position**:
        // Scroll down → animation plays forward
        // Scroll up → animation plays backward
        // Stop scrolling → animation stops

      }
    })
    .to(".right-leaf", { y:200 }, 0 )  //The 0 means both animations start at the same time (at position 0 in the timeline).
    .to(".left-leaf", {y: -200 }, 0 )

  }, []);     // Empty dependency array means this runs only once when component mounts

  return (
    <>
      <section id="hero" className = "noisy">    
        <h1 className = "title">MOJITO</h1>

        <img 
        src="/images/hero-left-leaf.png"
        alt="left-leaf"
        className = "left-leaf"
        />

        <img 
        src="/images/hero-right-leaf.png"
        alt="right-leaf"
        className = "right-leaf"
        />

        <div className = "body">
          <div className = "content">

            <div className='space-y-5 hidden md:block'>
              <p>Cool. Crisp. Classic.</p>
              <p className = "subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>

            <div className = "view-cocktails">
              <p className = "subtitle">
                Every cocktail on our menu is a blend of premium ingredients, 
                creative flare, and timeless recipes - designed to delight your senses.
              </p>
              <a href="#cocktails">View Cocktails</a>
            </div>

          </div>
        </div>

      </section>
    </>
  )
}

export default Hero