import React from 'react'

const Card = ({info,addItem}) => {
  return(
    <div className="card-container">
      <img width="50px" height="50px" src={info.imgUrl} />
      <div className="card-info">info: { info.title } </div>
      <div className="card-info">Description: { info.descrition } </div>
      <div className="card-info">Price:${ info.price } </div>
      <div className="button-container">
      <button onClick={(e)=>{addItem(info)}}>Add to Card</button>
      </div>
    </div>
  )
}

export default Card
