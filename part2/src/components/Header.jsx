const Header = ({level, text}) => {
  let header
  switch(level) {
    case 1:
      header = <h1>{text}</h1>
      break
    case 2:
      header = <h2>{text}</h2>
      break
    default:
      header = <h3>{text}</h3>
  }
  
  return (
    <>
      {header}
    </>
  )
}

export default Header