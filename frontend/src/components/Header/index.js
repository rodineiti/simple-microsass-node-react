import { HeaderContainer, Logo }  from './styled';
import {Navbar, Nav } from 'react-bootstrap';
function Header({children}) {
  return (
    <HeaderContainer>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Rdn-Short</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Encurtar Url</Nav.Link>
            <Nav.Link href="/list-links">Links</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Logo src={'https://via.placeholder.com/300'} alt="RdnShort - Encurtador url" />
      <h1>RdnShort</h1>
    </HeaderContainer>
  );
}

export default Header;
