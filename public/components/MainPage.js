import React, {Component} from "react"
import Card from './Card'

class MainPage extends Component{
  constructor(){
    super()
    this.state = {
      showHistory:false,
    }
  }

  addToShoppingCard(input){

  }

  createCards(){
    return(
      <section className="cards-holder">
        <Card info={{price:"5.00",descrition:"its simply amazing",title:"wonderful thingie ma jig"}} addItem={this.addToShoppingCard.bind(this)}/>
        <Card info={{price:"3.50",descrition:"for your inner Lockness monster",title:"its a sp joke"}} addItem={this.addToShoppingCard.bind(this)}/>
        <Card info={{price:"9.99",descrition:"its the number that goes round",title:"life's grand, lets make it grander"}} addItem={this.addToShoppingCard.bind(this)}/>
      </section>
    )
  }

  render(){
    return(
      <div>
       <h1 className="title">Amazon Bay</h1>
        <main className="main-page-container">
          <nav className="order-history"> Order History</nav>
          <div className="cards-container">{this.createCards()}</div>
          <div className="cart-container">Cart</div>
        </main>
      </div>
    )
  }
}


export default MainPage
