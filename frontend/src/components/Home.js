import React, { useState, useEffect } from "react";
import MetaData from "./layout/MetaData";
import Pagination from "react-js-pagination";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Product from "./product/Product";
import Loader from "./layout/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      alert.success("Success!");
      return alert.error(error);
    }

    dispatch(getProducts(currentPage));
  }, [dispatch, alert, error, currentPage]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Best products online" />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
          {resPerPage <= productsCount && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
