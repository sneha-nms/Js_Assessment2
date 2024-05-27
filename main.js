'use strict';

let ApiUrl = 'https://dummyjson.com/products';
let ItemsPerPage = 3;
let currentPage = 1;
let totalPages = 1;

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

function fetchData() {
    fetch(ApiUrl)
        .then(res => res.json())
        .then(data => {
            let products = data.products;
            totalPages = Math.ceil(products.length / ItemsPerPage);
            displayProducts(products.slice((currentPage - 1) * ItemsPerPage, currentPage * ItemsPerPage));
            updatePaginationControls();
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayProducts(products) {
    let productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        let productItem = document.createElement('div');
        productItem.className = 'product-item';

        let productImage = document.createElement('img');
        productImage.src = product.thumbnail;
        productItem.appendChild(productImage);

        let productTitle = document.createElement('h3');
        productTitle.textContent = product.title;
        productItem.appendChild(productTitle);

        let productPrice = document.createElement('p');
        productPrice.textContent = `$${product.price}`;
        productItem.appendChild(productPrice);

        productList.appendChild(productItem);
    });
}

function updatePaginationControls() {
    let paginationContainer = document.getElementById('pagination-controls');
    paginationContainer.innerHTML = '';

  
    let prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.id = 'prev-button';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => changePage(currentPage - 1));
    paginationContainer.appendChild(prevButton);

  
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 2);

 
        startPage = Math.max(1, endPage - 3);
        endPage = Math.min(totalPages, startPage + 3);
   

    for (let i = startPage; i <= endPage; i++) {
        let pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.className = 'change-button';
        pageButton.style.backgroundColor = (i === currentPage) ? '#191b1f' : 'white';
        pageButton.addEventListener('click', () => changePage(i));
        paginationContainer.appendChild(pageButton);
    }

    let nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.id = 'next-button';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => changePage(currentPage + 1));
    paginationContainer.appendChild(nextButton);
}

function changePage(page) {
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        fetchData();
    }
}
