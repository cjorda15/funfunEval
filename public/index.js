import React, { Component } from 'react'
import {render} from 'react-dom'
import App from './components/App.js';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
const history = createHistory()

  render(
    <Router history= { history }>
      <Route path='/' component={App}/>
    </Router>,
    document.getElementById('root'))
