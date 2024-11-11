import React from 'react'
import { Link } from 'react-router-dom'
// import Home from './Home'
// import ProductDetail from './ProductDetail'
import { useEffect, useState, useRef } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa6";
import { useCart } from '../context/CartStateProvider';
import Cart from './Cart';
const Navbar = () => {
  const { state } = useCart();
  const [isCartVisible, setIsCartVisible] = useState(false);
  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };
  const [mobile, setMobile] = useState(false)
  const [sidebar, setSideBar] = useState(false)
  const sidebarRef = useRef(null); // Ref for sidebar
  const cartRef = useRef(null);
  useEffect(() => {

    if (window.innerWidth < 1006) {
      setMobile(true)
    }
  }, [])
  useEffect(() => {
    console.log("mobile")
    console.log(window.innerWidth)
    const handleresize = () => {
      if (window.innerWidth < 1006) {
        setMobile(true)
      }
      else {
        setMobile(false)

      }
    }
    window.addEventListener("resize", handleresize)
    return () => {
      window.removeEventListener("resize", handleresize)
    }
  }, [])
  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSideBar(false); // Close sidebar
      }
    };

    if (sidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebar]);
    // Close cart when clicking outside
    useEffect(() => {
      const handleClickOutsideCart = (event) => {
        if (cartRef.current && !cartRef.current.contains(event.target)) {
          setIsCartVisible(false);
        }
      };
  
      if (isCartVisible) {
        document.addEventListener("mousedown", handleClickOutsideCart);
      } else {
        document.removeEventListener("mousedown", handleClickOutsideCart);
      }
  
      return () => document.removeEventListener("mousedown", handleClickOutsideCart);
    }, [isCartVisible]);
  return (
    <>
      <nav className="mainnav">
        {mobile && (
          <div className="navbarhambergerAndClose">
            {
              sidebar ? <IoMdClose color='white' size={25} onClick={() => setSideBar(!sidebar)} /> : <GiHamburgerMenu color='white' size={25} onClick={() => setSideBar(!sidebar)} />
            }
          </div>

        )}
        {!mobile && <ul>
          <li><Link to="/">Home</Link></li>

        </ul>

        }
        <span className="navBrand">Ecommerce</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>

          {/* Cart Icon with Count */}
          <div onClick={toggleCart} style={{ cursor: 'pointer', position: 'relative' }}>
            <FaCartPlus />
            {state.items.length > 0 && (
              <span style={{
                position: 'absolute',
                top: -10,
                right: -10,
                backgroundColor: 'red',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 5px',
                fontSize: '12px'
              }}>
                {state.items.length}
              </span>
            )}
          </div>

          {/* Display Cart Component */}
          {isCartVisible && (
            <div
            ref={cartRef}
            style={{
              position: 'absolute',
              top: '100px',
              right: '10px',
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              padding: '10px',
              width: '300px',
              overflowY: "scroll",
              maxHeight: '600px',
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none'
            }} className="custom-scroll">
              <Cart />
            </div>
          )}
        </div>


      </nav>
      <div ref={sidebarRef} className={sidebar ? "sidebar active" : "sidebar"}>
        <ul className='sidebarUl'>
          <li><Link to="/">Home</Link></li>

        </ul>
      </div>
    </>
  )
}

export default Navbar