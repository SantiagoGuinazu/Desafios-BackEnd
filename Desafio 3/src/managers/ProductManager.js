import fs from 'fs'

export default class ProductManager {
    constructor (){
        this.path = "./src/productos/productos.json"
        this.products = []
    }

    validateCode = async (code) => {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        this.products = JSON.parse(data)

        return this.products.some((producto) => producto.code == code)

    }

    getProducts =  async (limit) => {
        try{
            if(!fs.existsSync(this.path)) return this.products

            const data = await fs.promises.readFile(this.path, 'utf-8')
            this.products = JSON.parse(data)
            const productosFiltrados = limit ? this.products.slice(0,limit) : this.products
            return productosFiltrados

        } catch (err) {
            return err
        }
        
    }

    getAddProducts = async (producto) => {

        try{ 
            if(!fs.existsSync(this.path)) {
                if(!producto.title || !producto.description || !producto.price || !producto.thumbnail || !producto.code || !producto.stock) {
                    return "Te falto algun dato"
                }
                
                const product = {
                    id: this.products.length + 1,
                    title: producto.title,
                    description: producto.description,
                    price: producto.price,
                    thumbnail: producto.thumbnail,
                    code: producto.code,
                    stock: producto.stock
                }

                this.products.push(product)

                await fs.promises.writeFile(this.path, JSON.stringify(this.products,null,'\t'))
                return "Se Creo el producto correctamente"
            } 

            const data = await fs.promises.readFile(this.path, 'utf-8')
            this.products = JSON.parse(data)

            const validacion = await this.validateCode(producto.code)
            if (validacion){
                return "El producto ya existe"
            } 

            if(!producto.title || !producto.description || !producto.price || !producto.thumbnail || !producto.code || !producto.stock) {
                return "Te falto algun dato"
            }
            
            const product = {
                id: this.products.length + 1,
                title: producto.title,
                description: producto.description,
                price: producto.price,
                thumbnail: producto.thumbnail,
                code: producto.code,
                stock: producto.stock
            }

            this.products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(this.products,null,'\t'))
            return "Se Creo el producto correctamente"
        }catch (err) {
            return err
        }
        
        
    }

    getProductById = async (id) => {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        this.products = JSON.parse(data)
        const producto = this.products.find(product => product.id === id)

        if(producto){
            return producto
        } else {
            return "Not Found"
        }
    }

    updateProduct = async (id, update) => {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        this.products = JSON.parse(data)
        let producto = this.products.find(product => product.id === id)

        for(let propiedad in update){
            if(producto.hasOwnProperty(propiedad)){
                producto[propiedad] = update[propiedad]
            }
        }
        
        await fs.promises.writeFile(this.path, JSON.stringify(this.products,null,'\t'))
        return "Se modifico el producto correctamente"
    }

    deleteProduct = async (id) => {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        this.products = JSON.parse(data)
        const productos = this.products.filter(product => product.id !== id)

        await fs.promises.writeFile(this.path, JSON.stringify(productos,null,'\t'))
        return "Se elimino el producto correctamente"
    }
}
