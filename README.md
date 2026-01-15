# cocktails_gsap
Create Vite + React Project

1) npm create vite@latest
Choose:
Framework: React
Variant: JavaScript

2) Delete:
src/App.jsx
src/App.css
src/assets/ (entire folder)

Clean index.css

3)Recreate App.jsx
Create a new src/App.jsx:

const App = () => {
  return (
    <div>App</div>
  );
};

export default App;
(rafce shortcut = React Arrow Function Component Export)

4)New Terminal
npm instal  gsap @gsap/react react-responsive

5)import ScrollTrigger,... and Register
import { ScrollTrigger, SplitText } from 'gsap/all';

//because these GAP plugins aren't automatically active. 
// You have to register them. And this line makes sure
// that both plugins are ready to use globally across your application.
gsap.registerPlugin(ScrollTrigger, SplitText);

6) Install Tailwind CSS (Vite)
   npm install @tailwindcss/vite

   vite.config.js folder => plugins:
   // https://vite.dev/config/
  export default defineConfig({
      plugins: [react(), tailwindcss()],
  })

7) index.css => @import "tailwindcss";
