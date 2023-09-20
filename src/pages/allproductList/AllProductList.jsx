import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "../../axios";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./AllProductList.module.css";

function AllProductList() {
  const { user } = useAuth();
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
      <div className={styles.itemsContainer}>
        {records.length > 0 ? (
          records
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.name.toLowerCase().includes(search);
            })
            .map((pdata, index) => (
              <div className={styles.itemsList} key={index}>
                <img
                  src={`http://127.0.0.1:8000/storage/${pdata.image}`}
                  className={styles.img}
                  alt=""
                />
                <p className={styles.text}>
                  Product Name - <span>{pdata.name}</span>
                </p>
                <p className={styles.text}>
                  Product description - <span>{pdata.description}</span>
                </p>
                <p className={styles.text}>
                  Product price - <span>{pdata.price}</span>
                </p>

                <Link to="/login" className={styles.btn}>
                  <button>Buy</button>
                </Link>
              </div>
            ))
        ) : (
          <h1 className="text-center w-full">No Products to show</h1>
        )}
      </div>
    </React.Fragment>
  );
}
export default AllProductList;
