import React from 'react'
import {Container} from '../container/Container'
import {Logo} from "../Logo"
import {Link} from "react-router-dom"
import LogoutButton from './LogoutButton'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Header() {

    const authStatus = useSelector((state) => state.authStatus)
    const navigate = useNavigate()

const navItems = [
    {
        name: "Home",
        slug:"/",
        active: true
    },{
        name:"Login",
        slug:"/login",
        active:!authStatus
    },{
        name:"Signup",
        slug:"/signup",
        active:!authStatus
    },
    {
        name:"All Posts",
        slug:"/all-posts",
        active:authStatus
    },
    {
        name:"Add Posts",
        slug:"/add-posts",
        active:authStatus
    },
]

  return (
   <header className='py-3 shadow bg-gray-500'>
   <Container>
   <nav className='flex'>
   <div className='mr-4'>
   <Link to="/">
   
   <Logo/>
   </Link>
   </div>
   <ul className='flex ml-auto'>
   {
    navItems.map((items) => items.active ? (
        <li key={items.name}>
        <button
        onClick={() => navigate(items.slug)}
        className='inline-block px-6 py-2 duration-200 card
        hover:bg-blue-100 rounded-full'
        >
        {items.name} 
        </button>
        </li>
    ) : null)
   }
   {
    authStatus && (
        <li>
        <LogoutButton/>
        </li>
    )
   }
   </ul>
   </nav>
   </Container>
   </header>
  )
}

export default Header