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
            <div className="container container_overflow">
                <div className="row">
                    <div className="col-12">
                        <h5 className="mb-4">Product List</h5>
                        <p className="text-danger"> </p>
                        <table className="table-auto border-collapse border border-slate-500 hover:border-collapse ">
                            <thead>
                                <tr>
                                    <th className="border border-slate-500" scope="col">Sr.No</th>
                                    <th className="border border-slate-500" scope="col">Product Title</th>
                                    <th className="border border-slate-500" scope="col">Product Description</th>
                                    <th className="border border-slate-500" scope="col">Product Image</th>
                                    <th className="border border-slate-500" scope="col" width="200">
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
                                                className="btn btn-success mx-2"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    deleteProduct(pdata.id)
                                                }
                                                className="btn btn-danger"
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
