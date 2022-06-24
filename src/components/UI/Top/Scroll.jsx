import React, { useEffect, useState } from "react"
import styled from 'styled-components'


export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  return (
    <Button onClick={scrollToTop}>
      {isVisible && (<div><h3>Go up!</h3></div>)}
    </Button>
  )
}

const Button = styled.button`
  position: fixed;
  bottom: 15px;
  right: 15px;
  z-index: 200;
  color: white;  
  cursor: pointer;
  border-radius: 5px;
  background: linear-gradient(90deg, #111 0%, #7969e6 180%);
  h3 {
    padding: 10px 15px;
  }
`;