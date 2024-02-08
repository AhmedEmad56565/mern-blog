import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, TextInput, Button } from 'flowbite-react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function Header() {
  const path = useLocation().pathname;
  const [theme, setTheme] = useState(undefined);

  function handleChangeTheme() {
    setTheme((prevState) => !prevState);
  }

  useEffect(() => {
    if (theme) {
      localStorage.setItem('theme', 'true');
      document.documentElement.classList.add('dark');
    } else if (theme === false) {
      localStorage.setItem('theme', 'false');
      document.documentElement.classList.remove('dark');
    } else {
      setTheme(localStorage.getItem('theme') === 'true');
    }
  }, [theme]);

  return (
    <Navbar fluid className='border-b-2'>
      <Link to='/'>
        <h1 className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
          <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-md'>
            Sahand&apos;s
          </span>
          Blog
        </h1>
      </Link>

      <form className='hidden lg:inline'>
        <TextInput
          type='search'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
        />
      </form>

      <div className='flex items-center gap-2'>
        <Link to='/'>
          <Button className='inline lg:hidden' color='gray'>
            <AiOutlineSearch />
          </Button>
        </Link>

        <Button color='gray' onClick={handleChangeTheme}>
          {theme ? <FaSun /> : <FaMoon />}
        </Button>
      </div>

      <div className='flex items-center gap-2 md:order-2'>
        <Link to='/sign-in'>
          <Button outline gradientDuoTone='purpleToBlue'>
            Sign In
          </Button>
        </Link>
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/' className='block'>
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about' className='block'>
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link to='/projects' className='block'>
            Projects
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
