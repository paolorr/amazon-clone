import styled from 'styled-components';

export const Container = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  background-color: #131921;
  position: sticky;
  top: 0;
  z-index: 100;

  > a img {
    width: 100px;
    object-fit: contain;
    margin: 0 20px;
    margin-top: 18px;
  }
`;

export const Search = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  border-radius: 24px;

  input {
    height: 12px;
    padding: 10px;
    border: none;
    width: 100%;
  }

  svg {
    padding: 5px;
    height: 22px !important;
    background-color: #cd9042;
  }
`;

export const Nav = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const NavOption = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-right: 10px;
  color: white;
`;

export const NavOptionLineOne = styled.span`
  font-size: 10px;
`;

export const NavOptionLineTwo = styled.span`
  font-size: 13px;
  font-weight: 800;
`;

export const NavOptionBacket = styled.div`
  display: flex;
  align-items: center;
  color: white;
`;

export const BasketCount = styled(NavOptionLineTwo)`
  margin-left: 10px;
  margin-right: 10px;
`;
