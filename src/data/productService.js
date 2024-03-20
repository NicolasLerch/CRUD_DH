const express = require('express');
const products = require('../data/productsDataBase.json');

const productService = {
    products : products,

    getAll: (req, res) => {
        res.send(fs.readFileSync('src/data/productsDataBase.json', 'utf-8'));
    }
}
