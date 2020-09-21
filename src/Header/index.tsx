import React, { useCallback } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';

import { useAuth } from '../Contexts/auth';
import { useCart } from '../Contexts/cart';

import {
  Container,
  Search,
  Nav,
  NavOption,
  NavOptionLineOne,
  NavOptionLineTwo,
  NavOptionBacket,
  BasketCount,
} from './styles';

const Header: React.FC = () => {
  const { user, firstName, signOut } = useAuth();
  const {
    cart: { totalItems },
  } = useCart();

  const handleAuthentication = useCallback(async () => {
    if (user) {
      await signOut();
    }
  }, [user, signOut]);

  return (
    <Container>
      <Link to="/">
        <img src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" />
      </Link>

      <Search>
        <input type="text" />
        <SearchIcon />
      </Search>

      <Nav>
        <Link to={!user ? '/login' : '/'}>
          <NavOption onClick={handleAuthentication}>
            <NavOptionLineOne>
              {/*  eslint-disable-next-line react/jsx-one-expression-per-line */}
              Hello {firstName}
            </NavOptionLineOne>
            <NavOptionLineTwo>{user ? 'Sign Out' : 'Sign In'}</NavOptionLineTwo>
          </NavOption>
        </Link>
        <Link to="/orders">
          <NavOption>
            <NavOptionLineOne>Returns</NavOptionLineOne>
            <NavOptionLineTwo>& Orders</NavOptionLineTwo>
          </NavOption>
        </Link>
        <NavOption>
          <NavOptionLineOne>Your</NavOptionLineOne>
          <NavOptionLineTwo>Prime</NavOptionLineTwo>
        </NavOption>
        <Link to="/checkout">
          <NavOptionBacket>
            <ShoppingBasketIcon />
            <BasketCount>{totalItems}</BasketCount>
          </NavOptionBacket>
        </Link>
      </Nav>
    </Container>
  );
};

export default Header;
