import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;

  > a img {
    margin-top: 20px;
    margin-bottom: 20px;
    object-fit: contain;
    width: 100px;
    margin-right: auto;
    margin-left: auto;
  }
`;
export const LoginInfo = styled.div`
  width: 300px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid lightgray;
  padding: 20px;

  > h1 {
    font-weight: 500;
    margin-bottom: 20px;
  }

  > form {
    label {
      display: block;
      font-size: 0.83em;
      font-weight: bold;

      margin-bottom: 5px;
    }

    input {
      height: 36px;
      margin-bottom: 10px;
      /* background-color: white; */
      width: 100%;
      box-sizing: border-box;
    }

    button {
      background: #f0c14b;
      border-radius: 2px;
      width: 100%;
      height: 30px;
      border: 1px solid;
      margin-top: 10px;
      border-color: #a88734 #9c7e31 #846a29;
    }
  }

  > p {
    margin-top: 15px;
    font-size: 12px;
  }

  > button {
    border-radius: 2px;
    width: 100%;
    height: 30px;
    border: 1px solid darkgray;
    margin-top: 10px;
  }
`;
