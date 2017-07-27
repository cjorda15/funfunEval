import React, {Component} from 'react'
import CardItems from './CartItems'


class CartContainer extends Component{
  constructor(){
    super()
    this.state = {
      cartClean:[],
      showHistory:false,
    }
  }

  sumItems(e){
    this.setState({showHistory:true})

    e.preventDefault()
    let cleanCart = this.props.cartItems.reduce((acc, item) => {
      if(!acc[item.itemId]){
        acc[item.itemId] = [item]
      }else{
        acc[item.itemId].push(item)
      }
      return acc
    },[])
    this.setState({cartClean:cleanCart})
  }

  CartContent(){
    if(!this.state.showHistory){
      return(
        <div className="cart-container">
          <button className="closed-cart-btn" onClick={(e)=>{this.sumItems(e)}}> + </button>
          <div className="menu-title">Cart</div>
        </div>
      )
    }else{
      return(
      <div className="open-cart-container">
        <div className="open-card-tab">
          <button className="open-cart-btn" onClick={(e)=>{this.setState({showHistory:false})}}> - </button>
          <div className="open-menu-title">Cart</div>
        </div>
        <div className="open-cart-history">
          <h3 className="cart-history-cat">Cart</h3>
          <div id="cart-items-headline" className="cart-history-cat">items:</div>
          <CardItems className="cart-history-cat" cart={this.state.cartClean} totalItems={this.props.cartItems}/>
        </div>
      </div>
     )
    }
  }

 render(){
  return(
    this.CartContent()
  )
 }
}


export default CartContainer
