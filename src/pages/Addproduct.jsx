import React, { useState } from "react";

import axios from "../axios";
import { useNavigate } from "react-router-dom";

function Addproduct() {
  const navigate = useNavigate();

  const [txtname, setName] = useState("");
  const [txtdescription, setdescription] = useState("");
  const [fileimage, setPhoto] = useState("");
  const [message, setMessage] = useState("");

  const uploadProduct = async () => {
    console.log(fileimage);
    const formData = new FormData();
    formData.append("name", txtname);
    formData.append("description", txtdescription);
    formData.append("image", fileimage);
    const responce = await axios.post("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (responce) {
      console.log(responce);
      setMessage(responce.message); 
      setTimeout(() => {
        navigate("/productlist");
      }, 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadProduct();
  };
  return (
    <React.Fragment>
      <div className="container bg-red-100">
        <div>
          <h5 className="m-4 ">Add Product </h5>
          <p className="text-warning">{message}</p>
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Product Title{" "}
              </label>
            </div>

            <div className="md:w-2/3">
              <input
                type="text"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                onChange={(e) => setName(e.target.value)}
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
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                onChange={(e) => setdescription(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Product Image
              </label>
            </div>

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
export default Addproduct;
