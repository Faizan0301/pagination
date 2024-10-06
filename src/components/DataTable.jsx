import React, { useEffect, useState } from 'react';

function DataTable() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    useEffect(() => {
        fetchRecords();
    }, []); 

    const fetchRecords = () => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(error => console.error(error));
    };

    // Filtering based on search term
    const filteredProducts = products.filter(product =>
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sorting the filtered products
    const sortedProducts = filteredProducts.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.price - b.price; // Sort by price ascending
        } else {
            return b.price - a.price; // Sort by price descending
        }
    });

    // Pagination logic
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    const currentItems = sortedProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    const changeSortOrder = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const changePage = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <>
            <div className="container">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="form-control mb-3"
                />
                <button onClick={changeSortOrder} className="btn btn-secondary mb-3">
                    Sort by Price: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                </button>
                <div className="row">
                    {currentItems.length > 0 ? (
                        currentItems.map((item) => (
                            <div className="col-md-4" key={item.id}>
                                <div className="card mb-3">
                                    <img src={item.image} className="card-img-top object-fit-contain" height='300px'  alt={item.title} />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text" >{item.description}</p>
                                        <p className="card-text">
                                            <small className="text-body-secondary">Price: ${item.price}</small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12">
                            <p>No results found</p>
                        </div>
                    )}
                </div>
                <div>
                    <button onClick={() => changePage(currentPage - 1)} hidden={currentPage === 1}>
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => changePage(index + 1)}
                            disabled={currentPage === index + 1}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={() => changePage(currentPage + 1)} hidden={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}

export default DataTable;

