import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { createGlobalStyle } from 'styled-components';

import OiYou from './assets/fonts/OiYou.otf';
import OiMate from './assets/fonts/OiMate.otf';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  font-family: 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #040404;
  color: #ffffff;
  }

  @font-face {
    font-family: oiYou;
    src: url(${OiYou});
  }
  
  @font-face {
    font-family: oiMate;
    src: url(${OiMate});
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
