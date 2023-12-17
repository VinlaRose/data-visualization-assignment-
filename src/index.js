import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';
import { Provider } from 'react-redux';
import { AuthProvider } from './Authentication/AuthContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <BrowserRouter>
  <AuthProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </AuthProvider>
</BrowserRouter>

    
  </React.StrictMode>
);

reportWebVitals();
