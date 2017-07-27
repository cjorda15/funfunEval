import React from 'react'

const CartItems = ({cart}) => {

  const showCart = () => {
    return cart.map(item => {
      return (
              <div className="cart-item-markdown">
                <div>{item[0].title}</div>
                <div>price:{item[0].price}</div>
                <div>amount: {item.length}</div>
              </div>
            )
          })
  }


  return(
    <div>
      {showCart()}
    </div>
  )
}

export default CartItems
