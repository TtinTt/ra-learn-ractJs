import React from "react";

class Item extends React.Component {
  render() {
    const { img, name, price } = this.props;
    return (
      <>
        <div className="element">
          <img src={img} alt="Photo" />
          <p id="name">{name}</p>
          <span id="price">USD {price}</span>
          <div className="buyAndSellContainer">
            <button className="btn-sell" id="sell">
              Sell
            </button>
            <span id="amount">0</span>
            <button className="btn-buy" id="buy">
              Buy
            </button>
          </div>
        </div>
      </>
    );
  }
}
export default Item;
