import React, { useEffect, useState } from "react";

function Shopping() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  return (
    <div className="container mt-5">
      {loading ? (
        <div>Loading... Please wait !</div>
      ) : errorMessage ? (
        <div>Error: {errorMessage}</div>
      ) : (
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
                    <button className="btn btn-danger">Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Shopping;
