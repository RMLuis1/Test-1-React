const API='https://fakestoreapi.com/products'

export function get() {
  return fetch(API ).then((result) => result.json());
}



