import React, { useContext } from "react";
import { GlobalContext } from "./Context";
import { Link } from "react-router-dom";

function Shopping() {
  const { products, loading, errorMessage, carts, addToCart } = useContext(GlobalContext);

  if (loading) {
    return <div>Loading... Please wait !</div>;
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <div className="container mt-5">
      {products && products.length > 0 ? (
        <div className="row">
          {products.map((product, id) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={id}>
              <div
                className="card d-flex flex-column align-items-center border border-danger border-2"
                style={{ width: "20rem", height: "20rem" }}
              >
                <img
                  src={product.image}
                  className="mt-3"
                  style={{
                    width: "120px",
                    height: "150px",
                  }}
                  alt={product.title}
                />
                <div className="card-body  d-flex flex-column justify-content-between">
                  <h5 className="card-title">{product.title}</h5>
                  <div className="d-flex justify-content-center mt-auto">
                    <Link to={`cart/${product.id}`} className="btn btn-danger" onClick={() => addToCart(product)}>{
                      carts && carts.length > 0 && carts.findIndex((item) => item.id === product.id) !== -1 ? "Remove from cart" : "Add to cart"
                    }</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p className="fs-1 fw-bold text-center mt-5">
            Nothing to show. Please search something else!
          </p>
        </div>
      )}
    </div>
  );
}

export default Shopping;
