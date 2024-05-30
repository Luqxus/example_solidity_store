// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// TODO: use openzeppelin for ownership
// TODO: implement a buy function
// TODO: store product images in ipfs
// TODO important: HACK THIS CONTRACT 
// TODO: might integrate with a supply chain contract

contract Merchant {

    address owner = address(0);


    struct Product {
        uint256 id;
        string name;
        uint256 price ;// in wei
        uint256 inStock;
    }
 
    mapping(uint256 => Product) products; 
    uint256 productsCount = 0;


    constructor() {
        owner = msg.sender;
    }

    function createProduct( string calldata _name, uint256 _price, uint256 _instock) external  {
        require(owner == msg.sender, "not contract owner");
        
        products[productsCount] = Product({
            id: productsCount,
            name: _name,
            price: _price,
            inStock: _instock
        });
        productsCount++;
    }

    function getProducts() external view returns (Product[] memory)  {
        Product[] memory _products = new Product[](productsCount);

        for (uint256 _i = 0; _i < productsCount; _i++) {
            _products[_i] = products[_i];
        }

        return _products;
    }


    function getProduct(uint256 _id) external  view returns (Product memory) {
        return products[_id];
    }
}