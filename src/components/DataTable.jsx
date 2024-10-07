import React, { useEffect, useState } from 'react';

function DataTable() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('');
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

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const currentItems = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Sorting the filtered products
    currentItems.sort((a, b) => {
        if (sortOrder === 'Low to higt') {
            return a.price - b.price;
        } else if (sortOrder === 'High to low') {
            return b.price - a.price;
        }
        else {
            return
        }
    });

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const changeSortOrder = () => {
        setSortOrder(sortOrder === 'Low to higt' ? 'High to low' : 'Low to higt');
    };

    const changePage = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            setSortOrder('')
        }
    };

    return (
        <>
            <nav className="navbar bg-body-tertiary">
                <div className="container">
                    <a className="navbar-brand">Navbar</a>
                    <div className="d-flex">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={ searchTerm }
                            onChange={ handleSearch }
                        />
                    </div>
                </div>
            </nav>
            <div className="container">
                <h1 className='text-center my-3'>Products</h1>
                <button onClick={ changeSortOrder } className="btn btn-primary mb-3">
                    Sort by Price: { sortOrder === '' ? '' : sortOrder }
                </button>
                <div className="row">
                    { currentItems.length > 0 ? (
                        currentItems.map((item) => (
                            <div className="col-md-4 d-flex" key={ item.id }>
                                <div className="card mb-3">
                                    <img src={ item.image } className="card-img-top object-fit-contain" height='400px' alt={ item.title } />
                                    <div className="card-body">
                                        <h5 className="card-title text-truncate">{ item.title }</h5>
                                        <p className="card-text description" >{ item.description }</p>
                                        <p className="card-text">
                                            <strong className="text-body-secondary">Price: ₹{ item.price * 80 }</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12">
                            <p>No results found</p>
                        </div>
                    ) }
                </div>
                <div className='text-center mt-4'>
                    <button className='btn btn-outline-primary mx-1' onClick={ () => changePage(currentPage - 1) } hidden={ currentPage === 1 }>
                        Previous
                    </button>
                    { [...Array(3)].map((_, index) => {
                        const pageNumber = currentPage - 1 + index;
                        if (pageNumber >= 1 && pageNumber<=totalPages){
                            return (
                                <button
                                     className='btn btn-outline-primary mx-1'
                                    key={ index + 1 }
                                    onClick={ () => changePage(pageNumber) }
                                    disabled={ currentPage == pageNumber }
                                >
                                    { pageNumber }
                                </button>
                            )
                        }
                    }) }
                    <button className='btn btn-outline-primary mx-1' onClick={ () => changePage(currentPage + 1) } hidden={ currentPage === totalPages }>
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}

export default DataTable;

