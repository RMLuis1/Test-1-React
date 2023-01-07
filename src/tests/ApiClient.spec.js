import { get } from "../Utils/ApiClient";

const products=[
    {image:'image.jpg', title:'title'},
    {image:'image2.jpg', title:'title2'},
    {image:'image3.jpg', title:'title3'},
]
describe('get',()=>{
    it('correcto funcionamiento',()=>{
        global.fetch= ()=> Promise.resolve({
            status:200,
            json:()=> Promise.resolve(products)
        })

        const response= get();
        expect(response).resolves.toEqual(products)
    })
    it('call error 404',()=>{
        global.fetch = () =>
        Promise.resolve({
            status: 404,
            json: () => Promise.resolve(),
           });
           const response=get()
       
           expect(response).rejects.toThrow(new Error('Peticion no encontrada'))
    })
    it('error server 500',()=>{
         global.fetch = () =>
           Promise.resolve({
             status: 500,
             json: () => Promise.resolve(),
           });
         const response = get();
         expect(response).rejects.toThrow(new Error('Error del Servidor'))
    })



})







