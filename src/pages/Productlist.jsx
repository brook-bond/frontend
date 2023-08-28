import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "../axios";

function Productlist() {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const getProduct = () => {
            fetch("http://127.0.0.1:8000/api/products")
                .then((res) => {
                    return res.json();
                })
                .then((response) => {
                    console.log(response.products);
                    setProduct(response.products);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getProduct();
    }, []);

    const deleteProduct = async (id) => {
        await axios.delete("/productdelete/" + id);
        const newUserData = product.filter((item) => {
            return item.id != id
        });
        alert("user deleted successfully");

        setProduct(newUserData);
    };

    return (
        <React.Fragment>
            <div className="container ">
                <div >
                    <div className="">
                        <h5 className="mb-4">Product List</h5>
                        <p className=""> </p>
                        <table className="table-auto border-collapse border border-slate-500 hover:border-collapse ">
                            <thead>
                                <tr>
                                    <th className="border border-slate-500" >Sr.No</th>
                                    <th className="border border-slate-500" >Product Title</th>
                                    <th className="border border-slate-500" >Product Description</th>
                                    <th className="border border-slate-500" >Product Image</th>
                                    <th className="border border-slate-500"  width="200">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.map((pdata, index) => (
                                    <tr key={index}>
                                        <td className="border border-slate-500">{index + 1} </td>
                                        <td className="border border-slate-500">{pdata.name} </td>
                                        <td className="border border-slate-500">{pdata.description} </td>
                                        <td className="border border-slate-500">
                                            <img
                                                src={`http://127.0.0.1:8000/storage/${pdata.image}`}
                                                alt=""
                                                height={50}
                                                width={90}
                                            />
                                        </td>
                                        <td className="border border-slate-500">
                                            <Link
                                                to={`/editproduct/${pdata.id}/edit`}
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 ml-2 rounded"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    deleteProduct(pdata.id)
                                                }
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
export default Productlist;
