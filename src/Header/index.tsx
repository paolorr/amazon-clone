import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

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

const Header: React.FC = () => (
  <Container>
    <img src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" />

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
      <NavOptionBacket>
        <ShoppingBasketIcon />
        <BasketCount>0</BasketCount>
      </NavOptionBacket>
    </Nav>
  </Container>
);

export default Header;
