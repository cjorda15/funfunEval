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


  //  CardItems(){
  //   // setTimeout(() => { console.log(this.state.cartClean) }, 4)
  //   return(
  //     cart.map(item => {
  //       console.log(item)
  //     })
  //   //   <div className="cart-container-items">
  //   //       <section>
  //   //       <div>{item.title}</div>
  //   //       <div>{item.price}</div>
  //   //       </section>
  //   //   </div>
  //   )
  // }

  showTotal(){
    console.log(this.state.cartClean);
    // this.state.cartClean.reduce((acc,item) => {
    //   console.log(item)
    // },0)
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
          <h3>Cart</h3>
          <div>items:</div>
          <CardItems cart={this.state.cartClean}/>
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
// <div className="cart-container">
// <button onClick={(e)=>{this.sumItems(e)}}>+</button>
// <div className="menu-title">Cart</div>
// </div>

export default CartContainer
