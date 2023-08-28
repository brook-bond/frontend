import React, { useState, useEffect } from "react";
import axios from "../axios";
import { useParams, useNavigate } from "react-router-dom";

const ViewProduct = () => {
  const { id } = useParams();
  // console.log(id);
  const [products, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const result = await axios.get("/products/" + id);
      console.log(result.data.product.description);
      setProduct(result.data.product);
    } catch (err) {
      console.log("Something Wrong");
    }
  };

  const clickToBackHandler = () => {
    navigate("/productlist");
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Product Details</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>S No.</th>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{products.id}</td>
                  <td>{products.name}</td>
                  <td>
                    <img
                      src={`http://127.0.0.1:8000/storage/${products.image}`}
                      alt=""
                      height={300}
                      width={300}
                    />
                  </td>
                  <td>{products.description}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="container d-flex justify-content-center">
        <div>
          <button className="btn btn-primary" onClick={clickToBackHandler}>
            Back To List
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
