import React, { Component } from 'react'

class OrderHistory extends Component{
  constructor(props){
    super(props)
    this.state={
      open:false,
      info:[]
    }
  }

  handleOpen(e){
    e.preventDefault()
    fetch('/checkout')
    .then(info => info.json())
    .then(info => this.setState({info:info}))
    .catch(error => console.log(error))
    this.setState({open:true})
  }

  handleClose(e){
    e.preventDefault()
    this.setState({open:false})
  }

  orderHistoryInfo(){
    return(
      <div className="order-history-info">
        {this.state.info.map((item,index) => {
          return (
            <div key={index} className="order-history-details">
              <h6>Order Number {index}</h6>
              <p>Order Date: {item.created_at.slice(0,10)}</p>
              <p>Total Price: ${item.total}</p>
            </div>
          )
        })}
      </div>
    )
  }

  orderHistoryContent(){
    if(!this.state.open){
      return(
       <div className= "order-history">
         <button onClick={(e)=>{this.handleOpen(e)}}>+</button>
         <div className="menu-title">Order History</div>
       </div>
     )
   }else{
     return(
       <div className="order-history-open">
         <div className="order-history-tab">
           <button onClick={(e)=>{this.handleClose(e)}}>-</button>
           <div className="menu-title-open">Order History</div>
         </div>
         <div className="order-history-menu">
          <h3>Order History</h3>
          {this.orderHistoryInfo()}
         </div>
       </div>
     )
   }
  }

  render(){
    return(
    this.orderHistoryContent()
  )
 }
}
export default OrderHistory
