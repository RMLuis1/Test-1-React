const API = "https://fakestoreapi.com/products";

export async function get() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    if(response.status === 404) throw new Error('Peticion no encontrada')
    if(response.status === 500) throw new Error('Error del Servidor')
    if (response.status !== 200) throw result;

    return result
  } catch (error) {
   throw  error;
  }

  // return fetch(API ).then((result) => result.json());
}
