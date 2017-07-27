import React, {Component} from "react"
import Card from './Card'
import OrderHistory from './OrderHistory'
import CartContainer from './CartContainer'

class MainPage extends Component{
  constructor(){
    super()
    this.state = {
      cartList:[],
      cartClean:[]
    }
  }

  componentWillMount(){
     const list = JSON.parse(window.localStorage.getItem('list'))
     console.log(list,"LIST")
     if(list){
       this.setState({cartList:list})
     }
    fetch('/api/v1/items')
    .then(item => item.json())
    .then((items) => this.setState({totalList:items}))
    .catch(err => console.log(err))
  }

  sumItems(e){
    this.setState({showHistory:true})

    let cleanCart = this.state.totalList.reduce((acc, item) => {
      if(!acc[item.itemId]){
        acc[item.itemId] = [item]
      }else{
        acc[item.itemId].push(item)
      }
      return acc
    },[])
    this.setState({cartClean:cleanCart})
  }

  addToShoppingCard(input){
     this.sumItems()
     const storage =  JSON.parse(window.localStorage.getItem("list"))
      if(storage){
        storage.push(input)
        window.localStorage.setItem("list",JSON.stringify(storage))
      }else{
        window.localStorage.setItem("list",JSON.stringify([input]))
      }

    let list = this.state.cartList.slice(0,this.state.cartList.length)
    list.push(input)
    this.setState({cartList:list})
  }

  clearList(){
    this.setState({cartList:[]})
  }

  createCards(){
    if(!this.state.totalList){
      return <div>loading</div>
    }else{
    return(
      <section className="cards-holder">
        {this.state.totalList.map((item,i) => {
          return <Card key={i} info={item} addItem={this.addToShoppingCard.bind(this)}/>
        })
      }
      </section>
    )
  }
}

  render(){
    return(
      <div>
       <h1 className="title">Amazon Bay</h1>
        <main className="main-page-container">
          <OrderHistory/>
          <div className="cards-container">{this.createCards()}</div>
          <CartContainer clearList={this.clearList.bind(this)}
           cleanList = {this.state.cartClean}
           cartItems={this.state.cartList}/>
        </main>
      </div>
    )
  }
}


export default MainPage
