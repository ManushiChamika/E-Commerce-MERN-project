// import React from 'react'
// import {useState} from 'react'
// import productsData from "../../data/products.json";

// const Search = () => {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [filteredProducts, setFilteredProducts] = useState(productsData);

//     const handleSearch = () => {
//         const query = searchQuery.toLowerCase();

//         const filtered = productsData.filter(product => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query));
        
//         setFilteredProducts(filtered);
//     }

//   return (
//     <section className='section__container bg-primary-light'>
//         <h2 className='section__header capitalize'>{categoryName}</h2>

//     </section>
//   )
// }

// export default Search