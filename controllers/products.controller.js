import * as productService from '../services/products.service.js';

export const getAllProducts = async (req, res) => {
  const products = await productService.getAllProducts();
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ error: 'Producto no encontrado' });
};

export const createProduct = async (req, res) => {
  const newProduct = await productService.createProduct(req.body);
  res.status(201).json(newProduct);
};

export const deleteProduct = async (req, res) => {
  await productService.deleteProduct(req.params.id);
  res.status(204).end();
};