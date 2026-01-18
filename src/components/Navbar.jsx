import { navLinks } from "../../constants/index.js"

const Navbar = () => {
  return (
    <nav>

      <div>
        <a href="#home" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="logo" />
          <p>Velvet Pour</p>
        </a>

        <ul>
          {navLinks.map ( (link) => (       //Parentheses = implicit return - the JSX is automatically returned, Curly braces = you need to explicitly write return                                              
            <li key= {link.id}>
              <a href={ `#${link.id}` } > {link.title} </a>
            </li> 
          ))}  
        </ul>

      </div>
    </nav>
  )
}

export default Navbar