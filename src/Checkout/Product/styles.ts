import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;

  img {
    object-fit: contain;
    width: 180px;
    height: 180px;
  }

  button {
    background: #f0c14b;
    border: 1px solid;
    margin-top: 10px;
    border-color: #a88734 #9c7e31 #846a29;
    color: #111;
  }
`;

export const Info = styled.div`
  padding-left: 20px;
`;

export const Title = styled.p`
  font-size: 17px;
  font-weight: 800;
`;

export const Price = styled.p``;

export const Rating = styled.div`
  display: flex;
`;

export const Quantity = styled.div`
  font-size: 13px;
  margin-top: 10px;
  display: flex;
  align-items: center;

  strong {
    margin-left: 5px;
    margin-right: 10px;
  }
`;

export const IncreaseDecrease = styled.div`
  button {
    width: 20px;
    height: 17px;
    border-radius: 2px;
    margin: 0;
    margin-right: 2px;
    padding: 0;

    svg {
      font-size: 10px;
    }
  }
`;
