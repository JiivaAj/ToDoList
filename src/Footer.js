import React from "react"

const Footer = ({length}) => {
  


  return (
    <footer>{length} List {length === 1 ? "Item":"Items"}</footer>
  )
}

export default Footer