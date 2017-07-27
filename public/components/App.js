import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import MainPage from './MainPage'

class App extends Component{
  constructor(){
    super()
    this.state={
    }
  }

  render(){
    return(
      <section>
            <Switch>
              <Route exact path='/' render={(history) => {
                return (<MainPage history={history}/>)
                }}/>
            </Switch>
          </section>
    )
  }
}


export default App
