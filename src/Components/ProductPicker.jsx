import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductPicker = ({ onClose }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);


  // fetch api function
// crud / curd operation
  // c - create : POST 
  // r - read  : GET
  // u - update : PUT
  // d - delete : DELETE

  
  
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://stageapi.monkcommerce.app/task/products/search`, // api endpoint -> url 
        {
          headers: {
            "x-api-key": "shared via email",
          },
        }
      );
      setProducts(response.data);
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setProducts([]);
  };

  const handleSelectProduct = (selectedProduct) => {
    onClose([selectedProduct]);
  };

  return (
    <div className="product-picker">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="product-list" onScroll={handleScroll}>
        {products.map((product) => (
          <div
            key={product.id}
            className="product-item"
            onClick={() => handleSelectProduct(product)}
          >
            <img src={product.image.src} alt={product.title} />
            <div>{product.title}</div>
          </div>
        ))}
        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default ProductPicker;
