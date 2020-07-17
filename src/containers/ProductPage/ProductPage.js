import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Product from "../../components/Product/Product";

const ProductPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/product/` + id)
        .then((response) => {
          setProduct(response.data);
        });
    };
    fetchData();
    setIsLoading(false);
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <p>En cours de chargement</p>
      ) : (
        <div>
          <Product product={product} />
        </div>
      )}
    </div>
  );
};

export default ProductPage;
