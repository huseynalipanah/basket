import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const fetchData = async setData => {
  try {
    const result = await axios("https://northwind.vercel.app/api/products");
    setData(result.data);
  } catch (error) {
    console.error("Veri çekme işlemi sırasında bir hata oluştu:", error);
  }
};

const BasketItem = ({ item, removeFromBasket, increaseCount, decreaseCount }) => (
  <ul key={item.id}>
    <li>{item.id}</li>
    <li>{item.name}</li>
    <li>Count: {item.count} <button onClick={() => increaseCount(item)}>+</button>
    <button onClick={() => decreaseCount(item)}>-</button></li>
    <button onClick={() => removeFromBasket(item)}>Remove Basket</button>
    
  </ul>
);

const ProductItem = ({ item, addToBasket }) => (
  <div key={item.id} >
    <ul>
      <li>{item.id}</li>
      <li>{item.name}</li>
      <button onClick={() => addToBasket(item)}>Add Basket</button> 
    </ul>
  </div>
);

function App() {
  const [data, setData] = useState([]);
  const [basket, setBasket] = useState(JSON.parse(localStorage.getItem('basket')) || []); 

  useEffect(() => {
    fetchData(setData);
  }, []);

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basket));
  }, [basket]);

  const addToBasket = (item) => { 
    const existingItem = basket.find(basketItem => basketItem.id === item.id);
    if (existingItem) {
      existingItem.count += 1;
      setBasket([...basket]);
    } else {
      setBasket([...basket, { ...item, count: 1 }]);
    }
  };
  const removeFromBasket = (itemToRemove) => {
    setBasket(basket.filter(item => item.id !== itemToRemove.id));
  };
  const increaseCount = (item) => {
    const existingItem = basket.find(basketItem => basketItem.id === item.id);
    if (existingItem) {
      existingItem.count += 1;
      setBasket([...basket]);
    }
  };
  const decreaseCount = (item) => {
    const existingItem = basket.find(basketItem => basketItem.id === item.id);
    if (existingItem && existingItem.count > 1) {
      existingItem.count -= 1;
      setBasket([...basket]);
    }
  };

  return (
    <div className="App">
      <div className="basket">
        <h1>Basket : </h1>
        <div className="additems">{basket.map(item => <BasketItem key={item.id} item={item} removeFromBasket={removeFromBasket} increaseCount={increaseCount} decreaseCount={decreaseCount} />)}
        </div>
      </div>
      <div className="items">
        {data.map(item => <ProductItem key={item.id} item={item} addToBasket={addToBasket} />)}
      </div>
    </div>
  );
}

export default App;
