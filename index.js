import fetch from 'node-fetch';

const [, , method, fullResource, ...args] = process.argv;
const baseUrl = 'https://fakestoreapi.com';

// Separamos el recurso y el ID si existe (products/15)
const [resource, resourceId] = fullResource.split('/');

const getAllProducts = async () => {
  const res = await fetch(`${baseUrl}/products`);
  const data = await res.json();
  console.log(data);
};

const getProductById = async (id) => {
  const res = await fetch(`${baseUrl}/products/${id}`);
  const data = await res.json();
  console.log(data);
};

const createProduct = async (title, price, category) => {
  const res = await fetch(`${baseUrl}/products`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      price: parseFloat(price),
      description: 'Producto creado desde CLI',
      image: 'https://i.pravatar.cc',
      category
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  console.log(data);
};

const deleteProduct = async (id) => {
  const res = await fetch(`${baseUrl}/products/${id}`, {
    method: 'DELETE'
  });
  const data = await res.json();
  console.log(data);
};

// Lógica de comandos
const main = async () => {
  if (method === 'GET' && resource === 'products') {
    if (resourceId) {
      await getProductById(resourceId);
    } else {
      await getAllProducts();
    }
  } else if (method === 'POST' && resource === 'products') {
    const [title, price, category] = args;
    if (!title || !price || !category) {
      console.error('Faltan argumentos. Uso: POST products <title> <price> <category>');
      return;
    }
    await createProduct(title, price, category);
  } else if (method === 'DELETE' && resource === 'products' && resourceId) {
    await deleteProduct(resourceId);
  } else {
    console.log('Comando no reconocido. Revisa los requerimientos.');
  }
};

main();
