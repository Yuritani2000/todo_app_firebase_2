import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
body {
  background: #f5f5f5;
}
`;

/* ReactアプリのおおもとのDOM。ここからAppコンポーネントを呼び出す。 */
ReactDOM.render(
  <React.StrictMode>
    <App />
    <GlobalStyle/>
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
