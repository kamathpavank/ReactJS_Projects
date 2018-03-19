import React, {Component} from 'react';

class Coursesales extends Component {
  constructor(props){
    super(props);

    this.state = {
      total: 0
    };
    this.sumPrice = this.sumPrice.bind(this)
  }

  sumPrice(price){
    this.setState({total: this.state.total + price})
  }

  render(){
    console.log(this.props.items);
    var courses = this.props.items.map((item, i) =>{
      {/*Pass each course to Course Component and return to courses variable*/}
      return <Course name={item.name} price={item.price}
        key={i} sumPrice={this.sumPrice} active={item.active}
        />
    });
    return(
      <div>
        <h1>You can buy courses</h1>
        <div id="courses">
          {courses}
          <p id="total">Total:<b>{this.state.total}</b></p>
        </div>
      </div>
    )
  }
}


class Course extends Component {

  clicker(){
    var active = !this.state.active;
    this.setState({active: active});
    {/*pass price value to sumPrice if clicked once else pass its negative value*/}
    this.props.sumPrice(active ? this.props.price : -this.props.price);
  }

  constructor(props){
    super(props);

    this.state = {
      active: false
    };
    this.clicker = this.clicker.bind(this)
  }

  render(){
    return(
      <div>
        <p onClick={this.clicker}>{this.props.name}<b>{this.props.price}</b></p>
      </div>
    )
  }
}

export default Coursesales;
