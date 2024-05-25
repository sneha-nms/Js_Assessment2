'use strict';

let ApiUrl = 'https://dummyjson.com/products'; 
let ItemsPerPage = 3;
let currentPage = 1;
let totalPages = 1;

document.addEventListener('DOMContentLoaded', () => {
    let prevButton = document.getElementById('prev-button');
    let nextButton = document.getElementById('next-button');

    prevButton.addEventListener('click', () => changePage(currentPage - 1));
    nextButton.addEventListener('click', () => changePage(currentPage + 1));

    fetchData();
});

function fetchData() {
    fetch(ApiUrl)
        .then(res => res.json())
        .then(data => {
            let products = data.products;
            totalPages = Math.ceil(products.length / ItemsPerPage);
            displayProducts(products.slice((currentPage - 1) * ItemsPerPage, currentPage * ItemsPerPage));
            PaginationControls();
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

function PaginationControls() {
    let buttons = document.querySelectorAll('.change-button');
    buttons.forEach(button => {
      
        button.style.backgroundColor=button.textContent == currentPage ? '#191b1f' : 'white';
       
    });

    document.getElementById('prev-button').disabled = currentPage === 1;

    document.getElementById('next-button').disabled = currentPage === totalPages;
}



function changePage(page) {
    currentPage = page;
    fetchData();
}
