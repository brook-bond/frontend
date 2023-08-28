import React, { useState, useEffect } from "react";

import axios from "../axios";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [message, setMessage] = useState("");

  const [inputs, setInputs] = useState([]);
  const [fileimage, setPhoto] = useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const uploadProduct = async () => {
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("name", inputs.name);
    formData.append("description", inputs.description);
    formData.append("image", fileimage);
    const response = await axios.post("/productsupdate/" + id, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setMessage(response.data.message); 
    console.log(response);
    setTimeout(() => {
      navigate("/productlist");
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadProduct();
  };

  useEffect(() => {
    getproduct();
  }, []);

  function getproduct() {
    axios.get("/products/" + id).then(function (response) {
      console.log(response);
      setInputs(response.data.product);
    });
  }

  return (
    <React.Fragment>
      <div className="container bg-red-100">
        <div>
          <h5 className="mb-4">Edit Product </h5>
          <p className="text-success">
            <b>{message}</b>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Product Title{" "}
              </label>
            </div>

            <div className="md:w-2/3">
              <input
                type="text"
                value={inputs.name}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                name="name"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Description{" "}
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                type="text"
                value={inputs.description}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                name="description"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className=" md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Product Image
              </label>
            </div>
            <img
              src={`http://127.0.0.1:8000/storage/${inputs.image}`}
              alt=""
              height={300}
              width={300}
            />
            <div className="md:w-2/3">
              <input
                type="file"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"></label>
            </div>
            <div className="md:w-2/3">
              <button
                type="submit"
                className="bg-transparent w-full hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
export default EditProduct;
