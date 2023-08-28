import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "../axios";

function Productlist() {
  const [product, setProduct] = useState([]);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firtsIndex = lastIndex - recordsPerPage;
  const records = product.slice(firtsIndex, lastIndex);
  const npage = Math.ceil(product.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

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
      return item.id != id;
    });
    alert("user deleted successfully");

    setProduct(newUserData);
  };

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  return (
    <React.Fragment>
      <div className="container ">
        <div>
          <div className="">
            <h5 className="mb-4">Product List</h5>
            <p className=""> </p>
            <form>
              <div className="mb-6">
                <label
                  htmlFor="search"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Serch product by title
                </label>
                <input
                  type="text"
                  id="search"
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/1 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="search by title"
                />
              </div>
            </form>
            <table className="table-auto border-collapse border border-slate-500 hover:border-collapse ">
              <thead>
                <tr>
                  <th className="border border-slate-500 p-2">Sr.No</th>
                  <th className="border border-slate-500 p-2">Product Title</th>
                  <th className="border border-slate-500 p-2">
                    Product Description
                  </th>
                  <th className="border border-slate-500 p-2">Product Image</th>
                  <th className="border border-slate-500 p-2" width="200">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {records
                  .filter((item) => {
                    return search.toLowerCase() === ""
                      ? item
                      : item.name.toLowerCase().includes(search);
                  })
                  .map((pdata, index) => (
                    <tr key={index}>
                      <td className="border border-slate-500 p-2">
                        {index + 1}{" "}
                      </td>
                      <td className="border border-slate-500 p-2">
                        {pdata.name}{" "}
                      </td>
                      <td className="border border-slate-500 p-2">
                        {pdata.description}{" "}
                      </td>
                      <td className="border border-slate-500 p-2">
                        <img
                          src={`http://127.0.0.1:8000/storage/${pdata.image}`}
                          alt=""
                          width={40}
                          height={40}
                        />
                      </td>
                      <td className="border border-slate-500 p-2">
                        <Link
                          to={`/view/${pdata.id}/view`}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-2 ml-2 rounded"
                        >
                          View
                        </Link>
                        <Link
                          to={`/editproduct/${pdata.id}/edit`}
                          className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 mr-2 ml-2 rounded"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteProduct(pdata.id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 mt-2 w-full rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <nav aria-label="Page navigation example">
              <ul className="inline-flex -space-x-px text-base h-10 mt-5">
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={prePage}
                  >
                    Previous
                  </a>
                </li>
                {numbers.map((n, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      onClick={() => changeCPage(n)}
                      aria-current={`${currentPage === n ? "page" : ""}`}
                      className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      {n}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#"
                    onClick={nextPage}
                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Productlist;
