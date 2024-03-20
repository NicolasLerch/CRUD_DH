const { log } = require('console');
const fs = require('fs');
const path = require('path');

// const productService = require('../data/productService');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function getMaxId(array) {
    let maxId = 0;
    for (const obj of array) {
        if (obj.id && obj.id > maxId) {
            maxId = obj.id;
        }
    }
    return maxId;
}

const controller = {
	// Root - Show all products in JSON
	index: (req, res) => {
		res.send(fs.readFileSync('src/data/productsDataBase.json', 'utf-8'));
		// res.send(productService.getAll);
		// productService.getAll;
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let productID = req.params.id;
		if (productID != 'create'){
			let product = products.find(product => product.id == productID);
			res.send(product);
		} else {
			res.render('product-create-form');
		}		
	},

	newProduct: (req, res) => {
		res.render('product-create-form');
	},

	// Create - Form to create
	create: function (req, res) {
		let nuevoProducto = req.body;
		let nuevaLista = products.push(nuevoProducto);
		console.log(products);
		res.send(products);
		return nuevoProducto;
	},
	
	// Create -  Method to store
	store: function (req, res) {
		// let jsonProduct = JSON.stringify(controller.create());
		// let jsonProducts = JSON.stringify(products);
		let maxID = getMaxId(products);
		let nuevoID = maxID + 1;
		let newProduct = {
			id: nuevoID,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description
		}
		let nuevaLista = products.push(newProduct);
		let jsonProducts = JSON.stringify(products);		
		fs.writeFileSync('./src/data/productsDataBase.json', jsonProducts);
		res.send(products);
	},

	// Update - Form to edit
	edit: (req, res) => {
		let productID = req.params.id;
		let product = products.find(product => product.id == productID);
		let editedProduct = {
			id: nuevoID,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description
		}
		let jsonProducts = JSON.stringify(products);
		


		res.render('product-edit-form', {productToEdit : product});
		// res.send(productoAEditar);
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;