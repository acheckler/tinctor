import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalculator } from '@fortawesome/free-solid-svg-icons'

library.add(faCalculator)

ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root')
  )

