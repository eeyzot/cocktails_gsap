import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all';
import  { useRef } from 'react'
import gsap from 'gsap';
import { useMediaQuery } from 'react-responsive';

const Hero = () => {

  // variables for video animation
  const videoRef = useRef();    //Refs allow you to directly access and manipulate DOM elements or store mutable values that persist across re-renders.
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Check if the device width is 767px or less

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

    // video scroll animation
    const startValue = isMobile ? "top 50%" : "center 60%";  // First value is the element position, second is the viewport position, when the top of the video reaches 50% down the screen,
    const endValue = isMobile ? "120% top" : "bottom top";  //when the top of the video goes 120% past the top of the screen, meaning far off the screen
  //when the bottom of the video reaches the top of the screen

    let tl = gsap.timeline ( {
      scrollTrigger: {
        trigger: "video",
        start: startValue,
        end: endValue,
        scrub: true,  //video will play on scroll
        pin: true,   //pin the video in place while scrolling, stuck in place
      }
    })

   videoRef.current.onloadedmetadata = () => {
	    tl.to(videoRef.current, {
		      currentTime: videoRef.current.duration,
	 });
   //1. videoRef.current.onloadedmetadata
      //This is an event listener that fires when the video's metadata loads
      //Metadata includes: duration, dimensions, frame rate, etc.
      //We wait for this because we need to know the video's total duration
  //2.  tl.to(videoRef.current, { currentTime: videoRef.current.duration })
          //This creates a GSAP animation that:
          //Animates the video's currentTime property
          //From: 0 (start of video)
          //To: videoRef.current.duration (end of video)
          //Controlled by: ScrollTrigger (because tl has scrub: true)
	};

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

      <div className="video absolute inset-0">
        <video 
        ref = {videoRef}
        src="/videos/output.mp4"
        muted
        playsInline  //not to show trackbar
        preload = "auto"  //load automatically
        />
      </div>
    </>
  )
}

export default Hero