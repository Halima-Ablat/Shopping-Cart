import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./Context";
import { useParams } from "react-router-dom";

function Cart() {
  const [totalPrice, setTotalPrice] = useState(0);

  const { carts, setCarts, addToCart } = useContext(GlobalContext);
  const { id } = useParams();

  useEffect(() => {
    async function cartProduct() {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      // console.log(data);
      setCarts((prevCarts) => {
        if (!prevCarts.find((cart) => cart.id === data.id)) {
          return [...prevCarts, data];
        }
        return prevCarts;
      });
    }

    if (id) {
      cartProduct();
    }
  }, [id, setCarts]);

  useEffect(() => {
    const total = carts.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
  }, [carts]);

  console.log(totalPrice);

  return (
    <div className="container mt-5">
      {carts && carts.length > 0 ? (
        <div className="row">
          <div className="mb-5">
            <h3>Your Cart Summary:</h3>
            <h4>Total Item: {carts.length}</h4>
            <h4>Your Total Price: ${totalPrice}</h4>
          </div>
          {carts.map((cart, id) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={id}>
              <div
                className="card d-flex flex-column align-items-center border border-danger border-2"
                style={{ width: "20rem", height: "20rem" }}
              >
                <div className="d-flex">
                  <img
                    src={cart.image}
                    className="mt-3"
                    style={{
                      width: "120px",
                      height: "150px",
                    }}
                    alt={cart.title}
                  />
                  <p className="mt-3 ms-5 fw-bold">${cart.price}</p>
                </div>

                <div className="card-body  d-flex flex-column justify-content-between">
                  <h5 className="card-title">{cart.title}</h5>

                  <div className="d-flex justify-content-center mt-auto">
                    <button
                      className="btn btn-danger"
                      onClick={() => addToCart(cart)}
                    >
                      {carts &&
                      carts.length > 0 &&
                      carts.findIndex((item) => item.id === cart.id) !== -1
                        ? "Remove from cart"
                        : "Add to cart"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p className="fs-1 fw-bold text-center mt-5">
            Nothing is added to cart !
          </p>
        </div>
      )}
    </div>
  );
}

export default Cart;
