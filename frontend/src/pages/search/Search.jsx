import React from 'react';
import { useState } from 'react';
import productsData from '../../data/products.json';
import ProductCards from '../shop/ProductCards';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();

    const filtered = productsData.filter(
      product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );

    setFilteredProducts(filtered);
  };

//once a keyword is erased from searchbar it should show all products-------
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === '') {
      // Reset to show all products when search bar is cleared
      setFilteredProducts(productsData);
    }
  };
//--------------------------------------------------------------------------

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Search and Discover</h2>
        <p className="text-gray-600 text-center text-xl">
          Effortlessly find what you need—browse, filter, and explore tailored
          options just for you!
        </p>
      </section>

      {/* Search bar */}
      <div className="section__container">
        <div className="w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            className="search-bar w-full max-w-4xl p-2 border rounded"
            placeholder="Search for products . . ."
          />

          <button
            onClick={handleSearch}
            className="search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded"
          >
            Search
          </button>
        </div>

        {/* when products are not available */}
        {filteredProducts.length > 0 ? (
          <ProductCards products={filteredProducts} />
        ) : (
          <p className="text-center text-gray-600 text-lg mt-8">
            Product not available.
          </p>
        )}
      </div>
    </>
  );
};

export default Search;
