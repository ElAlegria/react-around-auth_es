import headerLogo from '../images/logo.png';


function Header(props) {
  const {access} = props
  return (
    <>
      <header className="header">
        <img
          src={headerLogo}
          alt="Logo Around the US"
          className="header__logo"
        />
        <p className='header__access'> {access
         ? "Registrate" : "inicio de seccion"}</p>
      </header>
    </>
  );
}
export default Header;
