import React, { createContext, useState, useEffect } from "react";
export const GlobalContext = createContext();


function GlobalState({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [carts, setCarts] = useState([]);

  async function fetchProducts() {
    setLoading(true);
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function addToCart(currentItem){
    let cpyCarts = [...carts];
    const index = cpyCarts.findIndex(item => item.id === currentItem.id);
    if(index === -1){
      cpyCarts.push(currentItem)
    }else{
      cpyCarts.splice(index, 1)
    }
    setCarts(cpyCarts)
  }

  console.log(carts, "carts");

  return (
    <GlobalContext.Provider
      value={{
        products,
        setProducts,
        loading,
        errorMessage,
        addToCart,
        carts,
        setCarts
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalState;
