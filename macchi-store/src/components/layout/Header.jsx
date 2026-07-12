import { useContext, useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle, FaShieldAlt, FaUser } from 'react-icons/fa';
import styled from 'styled-components';
import CartWidget from '../common/CartWidget';
import { AuthContext } from '../../context/auth-context';

const HeaderWrapper = styled.header`
  background-color: #111;
  border-bottom: 1px solid #222;
  padding: 1rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Brand = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 1.55rem;
  letter-spacing: 0.24rem;
  text-transform: uppercase;
`;

const ToggleButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1.2rem;

  @media (max-width: 860px) {
    display: inline-flex;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserMenuWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const UserMenuButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid #2b2b2b;
  color: #eee;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  cursor: pointer;
  transition: background-color 150ms ease, border-color 150ms ease;

  &:hover {
    background-color: #1f1f1f;
    border-color: #444;
  }
`;

const UserMenuDropdown = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 0.75rem);
  min-width: 180px;
  background: #131313;
  border: 1px solid #222;
  border-radius: 0.9rem;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);
  z-index: 20;
  padding: 0.75rem 0;
`;

const UserMenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  color: #ddd;
  text-decoration: none;
  padding: 0.85rem 1rem;
  font-size: 0.95rem;
  transition: background-color 150ms ease, color 150ms ease;

  &:hover {
    background-color: #1f1f1f;
    color: #fff;
  }
`;

const DropdownAction = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  background: transparent;
  border: none;
  color: #ddd;
  padding: 0.85rem 1rem;
  font-size: 0.95rem;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: #1f1f1f;
    color: #fff;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  @media (max-width: 860px) {
    flex-direction: column;
    align-items: stretch;
    max-height: ${({ open }) => (open ? '1000px' : '0')};
    overflow: hidden;
    transition: max-height 220ms ease;
  }
`;

const MenuList = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 860px) {
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem 0;
    background: #111;
    border-top: 1px solid #222;
  }
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: #bbb;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.5rem;
  border-radius: 999px;

  &.active {
    color: #c1121f;
    background: rgba(193, 18, 31, 0.12);
  }

  &:hover {
    color: #fff;
  }
`;

const IconLabel = styled.span`
  font-size: 0.85rem;
`;

const Header = () => {
  const { user, isAdmin } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <HeaderWrapper>
      <HeaderInner>
        <Brand to="/">Gen Rockero</Brand>
        <HeaderActions>
          <CartWidget />
          <UserMenuWrapper ref={menuRef}>
            <UserMenuButton onClick={() => setMenuOpen((prev) => !prev)} aria-label="Abrir menú de usuario">
              <FaUserCircle size={18} />
            </UserMenuButton>
            {menuOpen && (
              <UserMenuDropdown>
                {user ? (
                  <>
                    <UserMenuItem to="/perfil">
                      <FaUser /> Perfil
                    </UserMenuItem>
                    {isAdmin && (
                      <>
                        <UserMenuItem to="/admin">
                          <FaShieldAlt /> Admin
                        </UserMenuItem>
                        <UserMenuItem to="/admin/cupones">
                          <FaShieldAlt /> Cupones
                        </UserMenuItem>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <UserMenuItem to="/login">
                      <FaUser /> Ingresar
                    </UserMenuItem>
                    <UserMenuItem to="/register">
                      <FaUser /> Registrar
                    </UserMenuItem>
                  </>
                )}
              </UserMenuDropdown>
            )}
          </UserMenuWrapper>
          <ToggleButton onClick={() => setOpen((prev) => !prev)} aria-label="Toggle navigation">
            {open ? <FaTimes /> : <FaBars />}
          </ToggleButton>
        </HeaderActions>
      </HeaderInner>

      <Nav open={open}>
        <MenuList>
          <MenuItem><StyledLink to="/productos">Todo</StyledLink></MenuItem>
          <MenuItem><StyledLink to="/categoria/rock">Rock</StyledLink></MenuItem>
          <MenuItem><StyledLink to="/categoria/buzos">Buzos</StyledLink></MenuItem>
          <MenuItem><StyledLink to="/categoria/remeras-dama">Dama</StyledLink></MenuItem>
          <MenuItem><StyledLink to="/categoria/remeras-sin-mangas">Sin Mangas</StyledLink></MenuItem>
        </MenuList>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
