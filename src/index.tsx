import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DatePickerProvider } from '@bcad1591/react-date-picker';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
document.cookie = 'crossCookie=bar; SameSite=None; Secure';
root.render(
  // <React.StrictMode>
  <DatePickerProvider>
    <App />
  </DatePickerProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
