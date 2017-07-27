import React, {Component} from "react"
import Card from './Card'
import OrderHistory from './OrderHistory'
import CartContainer from './CartContainer'

class MainPage extends Component{
  constructor(){
    super()
    this.state = {
      cartList:[],
    }
  }

  addToShoppingCard(input){
    let list = this.state.cartList.slice(0,this.state.cartList.length)
    list.push(input)
    this.setState({cartList:list})
  }

  createCards(){
    return(
      <section className="cards-holder">
        <Card info={{itemId:0, price:"5.00",descrition:"its simply amazing",title:"wonderful thingie ma jig"}} addItem={this.addToShoppingCard.bind(this)}/>
        <Card info={{itemId:1, price:"3.50",descrition:"for your inner Lockness monster",title:"its a sp joke"}} addItem={this.addToShoppingCard.bind(this)}/>
        <Card info={{itemId:2,price:"9.99",descrition:"its the number that goes round",title:"life's grand, lets make it grander"}} addItem={this.addToShoppingCard.bind(this)}/>
      </section>
    )
  }

  render(){
    return(
      <div>
       <h1 className="title">Amazon Bay</h1>
        <main className="main-page-container">
          <OrderHistory/>
          <div className="cards-container">{this.createCards()}</div>
          <CartContainer cartItems={this.state.cartList}/>
        </main>
      </div>
    )
  }
}


export default MainPage
