import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';

import { useCart } from '../cart';

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
  const [{ totalItems }, dispatch] = useCart();

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
        <NavOption>
          <NavOptionLineOne>Hello Guest</NavOptionLineOne>
          <NavOptionLineTwo>Sign In</NavOptionLineTwo>
        </NavOption>
        <NavOption>
          <NavOptionLineOne>Returns</NavOptionLineOne>
          <NavOptionLineTwo>& Order</NavOptionLineTwo>
        </NavOption>
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
