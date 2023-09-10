const fs = require('fs')


class ProductManager {
    constructor(path) { 
        this.path = path
    }
    async getProducts(){
        try {
            if (fs.existsSync(this.path)) {
                const info = await fs.promises.readFile(this.path, 'utf-8')
                JSON.parse(info)
            }else {
                return []
            }
        } catch (error) {
            return error
        }

    }
    async addProduct(obj) {
        try {
            const products = await this.getProducts()
            let id 
            if (!products.length) {
                id = 1 
            } else {
                id = products[products.length-1].id+1
            }
            products.push({id,...obj})
            await fs.promises.writeFile(this.path,JSON.stringify(products))
        } catch (error) {
            return error
            
        }

    }
    async getProductById(idProduct){
        try {
            const products = await this.getProducts()
            const product = products.find(u=>u.id==idProduct)
            if (product){
                return product
            }else{
                return 'Este Produto no existe'
            }
        } catch (error) {
            return error
            
        }

    }
    async deleteproduct(){
        try {
            const products = await this.getProducts
            const newArrayProducts = products.filter(u=>u.id!==idProduct)
            fs.promises.writeFile(this.path,JSON.stringify(newArrayProducts))
        } catch (error) {
            return error
        }

    }
}

const product1 = {
    title: 'bondiola',
    id: 1,
    description: 'bondiola de cerdo curada',
    price: 4500,
    thumbnail: 'ruta imagen',
    code: 1, 
    stock: 45
}

const product2 = {
    title: 'panceta',
    id: 2,
    description: 'panceta de cerdo curada',
    price: 3500,
    thumbnail: 'ruta imagen',
    code: 2, 
    stock: 54
}

const product3 = {
    title: 'jamon cocido',
    id: 3,
    description: 'jamon de cerdo curada',
    price: 2500,
    thumbnail: 'ruta imagen',
    code: 3, 
    stock: 37
}
async function test(){
const Manager1 = new ProductManager ('product.json')
await Manager1.addProduct(product2)
//const products = await Manager1.getProducts()
//const product =await Manager1.getProductById(2)

//await Manager1.deleteproduct(2)
//console.log(product)
}
test()