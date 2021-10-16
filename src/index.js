import React from 'react';
import { Provider } from 'react-redux';
import { StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import theme from './styles/theme';

ReactDOM.render(
  <Provider store={store}>
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StylesProvider>
  </Provider>,
  document.getElementById('root'),
);

reportWebVitals(console.log);
