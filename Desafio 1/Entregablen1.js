
class ProductManager { //Clase ProductManager
    constructor(){ 
        this.products = []
    }

    validateCode = (code) => { //Validacion "code"
        const productos = this.products

        if(productos.find((producto)=> producto.code == code)){
            return true
        }else{
            return false
        }
    }

    getProducts = () => { //Mostrar Productos
        console.log(this.products)
    }

    getAddProducts = (title, description, price, thumbnail, code, stock) => { //Agregar Productos
        if(this.validateCode(code)){ //Validacion "code"
            return console.log("El producto ya existe")
        }

        if(!title && !description && !price && !thumbnail && !code && !stock){ //Campos obligatorios
            return console.log("Te faltan datos")
        }

        const product = { //Crear Producto
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }

        this.products.push(product) //Pushearlo al array
    }

    getProductByID = (id) => { //Producto por ID
        const producto = this.products.find((producto) => producto.id == id)

        if(producto){
            return console.log(producto)
        }else{
            return console.log("Not found")
        }
    }
}

const productManager = new ProductManager()
productManager.getProducts()
productManager.getAddProducts('Producto1', 'Detalle1', 1, 'Img1', 1, 1)
productManager.getProducts()
productManager.getAddProducts('Producto2', 'Detalle2', 2, 'Img2', 2, 2)
productManager.getProducts()
productManager.getAddProducts('Producto3', 'Detalle3', 3, 'Img3', 3, 3)
productManager.getAddProducts('Producto4', 'Detalle4', 4, 'Img4', 4, 4)
productManager.getAddProducts('Producto5', 'Detalle5', 5, 'Img5', 5, 5)
productManager.getAddProducts('Producto6', 'Detalle6', 6, 'Img6', 6, 6)
productManager.getProducts()
productManager.getProductByID(3)