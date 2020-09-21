import styled from 'styled-components';

export const Container = styled.div`
  background-color: white;

  > h1 {
    text-align: center;
    padding: 10px;
    font-weight: 400;
    background-color: rgb(234, 237, 237);
    border-bottom: 1px solid lightgray;
  }
`;

export const Section = styled.div`
  display: flex;
  padding: 20px;
  margin: 0 20px;
  border-bottom: 1px solid lightgray;
`;

export const Title = styled.div`
  flex: 0.2;
`;

export const Content = styled.div`
  flex: 0.8;
`;

export const Address = styled(Content)``;

export const Basket = styled(Content)``;

export const PaymentMethod = styled(Content)`
  form {
    max-width: 400px;
  }

  h3 {
    padding-top: 10px;
    padding-bottom: 10px;
  }
`;

export const Price = styled.div`
  button {
    background: #f0c14b;
    border-radius: 2px;
    width: 100%;
    height: 30px;
    border: 1px solid;
    font-weight: bolder;
    margin-top: 10px;
    border-color: #a88734 #9c7e31 #846a29;
    color: #111;
  }
`;
