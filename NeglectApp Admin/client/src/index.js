// scroll bar
import 'simplebar/src/simplebar.css';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

//
import App from './App';
import DataProvider from './redux/store'


// ----------------------------------------------------------------------

ReactDOM.render(
  <HelmetProvider>
    <BrowserRouter>
    <DataProvider>
      <App />
    </DataProvider>
    </BrowserRouter>
  </HelmetProvider>,
  document.getElementById('root')
);


