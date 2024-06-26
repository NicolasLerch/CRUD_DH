const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		res.render('index');
	},

	newProduct: (req, res) => {
		res.render('product-create-form');
	},

	search: function(req, res) {
		try{
			let searched = req.query.keywords;
			let result = products.filter(product => product.name.toLowerCase().includes(searched.toLowerCase()));
			res.render('results', {result : result});
		} catch {
			res.status(404).render('Product not found');
		}
		
	}
};

module.exports = controller;
