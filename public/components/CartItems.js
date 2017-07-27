import React from 'react'

const CartItems = ({cart,totalItems}) => {

  const showCart = () => {
    return cart.map((item, i )=> {
      return (
              <div key={i} className="cart-item-markdown">
                <div>{item[0].title}</div>
                <div>price:{item[0].price}</div>
                <div>amount: {item.length}</div>
              </div>
            )
      })
  }

  const showTotal = () => {
  let total = totalItems.reduce((acc,item) => {
      acc+=parseFloat(item.price)
      return acc
    },0)
    return `total: $ ${total.toFixed(2)}`
  }


  return(
    <div className="cart-items-holder">
      {showCart()}
      {showTotal()}
    </div>
  )
}

export default CartItems
