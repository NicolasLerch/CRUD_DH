// const { log } = require('console');
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
		// res.send(fs.readFileSync('src/data/productsDataBase.json', 'utf-8'));
		res.render('products', {product : products});
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
		// let nuevoProducto = req.body;
		// // let nuevaLista = products.push(nuevoProducto);
		// console.log(products);
		// res.send(products);
		// return nuevoProducto;
		res.send('esto es una prueba')
	},
	
	// Create -  Method to store
	store: function (req, res) {
		let maxID = getMaxId(products);
		let nuevoID = maxID + 1;
		let newProduct = {
			id: parseInt(nuevoID),
			name: req.body.name,
			image: req.file.filename,
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
		res.render('product-edit-form', {productToEdit : product});
	},
	// Update - Method to update
	update: function (req, res) {
		let productID = req.params.id;
		let producToEdit = products[productID-1];
		console.log(producToEdit);
		// res.send(producToEdit)

		let updatedProduct = {
			id: parseInt(productID), // Convert ID to integer
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description
		};
	
		// Find the index of the product in the products array
		let productIndex = products.findIndex(product => product.id == productID);
		console.log(productIndex);
	
		if (productIndex !== -1) { // Product found
			// Update the product in the array
			products[productIndex] = updatedProduct;
	
			// Convert the updated products array to JSON
			let jsonProducts = JSON.stringify(products);
	
			// Write the updated JSON back to the file
			// fs.writeFileSync(productsFilePath, jsonProducts);
			fs.writeFileSync('./src/data/productsDataBase.json', jsonProducts);

			// redirect('/products')
	
			res.send(updatedProduct); // Send the updated product as response
		} else {
			// Product not found
			res.status(404).send("Product not found");
		}
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let productID = parseInt(req.params.id);
		products.splice(productID - 1, 1);
		console.log(products);
		let jsonProducts = JSON.stringify(products);
		fs.writeFileSync('./src/data/productsDataBase.json', jsonProducts);
		res.send(products);
	}
};

module.exports = controller;