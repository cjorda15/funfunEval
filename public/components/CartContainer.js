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

  findSum(){
    let total = this.props.cartItems.reduce((acc,item) => {
        acc+=parseFloat(item.price)
        return acc
      },0)
      return total.toFixed(2)
  }

  checkout(){
    this.setState({cartClean:[]})
    this.props.clearList()
    window.localStorage.setItem("list",JSON.stringify([]))
    const total =  this.findSum()
    fetch('/checkout',{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        total
      })
    })
    .then(res => res.json())
    .catch(err => console.log(error,"ERROR"))
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
          <button onClick={()=>{this.checkout()}}>checkout and purchase</button>
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
