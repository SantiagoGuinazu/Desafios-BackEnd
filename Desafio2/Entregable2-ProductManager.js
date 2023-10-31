
const fs = require('fs')

class ProductManager {
    constructor(filename) {
        this.path = filename
        this.format = 'utf-8'
    }

    getProducts = async () => {

        if (!fs.existsSync(this.path)) return []
        return fs.promises.readFile(this.path, this.format)

            .then(content => JSON.parse(content))
            .catch(e => {
                console.log('ERROR', e)
                return []
            })
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        return this.getProducts()
            .then(productos => {
                let id = productos.length + 1
                productos.push({ id, title, description, price, thumbnail, code, stock })
                return productos
            })
            .then(newProduct => fs.promises.writeFile(this.path, JSON.stringify(newProduct)))
            .catch(e => {
                console.log('ERROR', e)
                return []
            })
    }

    getProductByID = async (id) => {

        if (!fs.existsSync(this.path)) return []
        return fs.promises.readFile(this.path, this.format)

            .then(content => JSON.parse(content).find((product) => product.id === id))
            .catch(e => {
                console.log('ERROR', e)
                return []
            })
    }

    updateProduct = async (data) => {

        if (!fs.existsSync(this.path)) return []
        return fs.promises.readFile(this.path, this.format)

            .then(content => {
                const dataJSON = JSON.parse(content)
                let modifico = dataJSON.find((product) => product.id === data.id)
                if (modifico) {
                    const id = data.id - 1
                    dataJSON[id].title = data.title ? data.title : modifico.title
                    dataJSON[id].description = data.description ? data.description : modifico.description
                    dataJSON[id].price = data.price ? data.price : modifico.price
                    dataJSON[id].thumbnail = data.thumbnail ? data.thumbnail : modifico.thumbnail
                    dataJSON[id].code = data.code ? data.code : modifico.code
                    dataJSON[id].stock = data.stock ? data.stock : modifico.stock

                    fs.writeFile(this.path, JSON.stringify(dataJSON), (error) => {
                        if (error) {
                            console.log('Error al acutalizar', error)
                        } else {
                            console.log('Producto actualizado')
                        }
                    })
                }
            })
            .catch(e => {
                console.log('ERROR', e)
                return []
            })
    }

    deleteProduct = async (idProduct) => {

        if (!fs.existsSync(this.path)) return []
        return fs.promises.readFile(this.path, this.format)

            .then(content => {
                const dataJSON = JSON.parse(content)
                let modifico = dataJSON.find((product) => product.id === idProduct)
                if (modifico) {
                    const id = idProduct - 1
                    dataJSON[id].title = ''
                    dataJSON[id].description = ''
                    dataJSON[id].price = ''
                    dataJSON[id].thumbnail = ''
                    dataJSON[id].code = ''
                    dataJSON[id].stock = ''

                    fs.writeFile(this.path, JSON.stringify(dataJSON), (error) => {
                        if (error) {
                            console.log('Error al acutalizar', error)
                        } else {
                            console.log('Producto borrado')
                        }
                    })
                }
            })
            .catch(e => {
                console.log('ERROR', e)
                return []
            })
    }

}

const manager = new ProductManager('./products.json')

run = async () => {
    manager.addProduct('Producto1', 'Detalle1', 1, 'Img1', 1, 1)
    console.log(await manager.getProducts())
}

getAllProducts = async () => {
    console.log(await manager.getProducts())
}

searchByProduct = async (id) => {
    console.log(await manager.getProductByID(id))
}

updateByProduct = async (data) => {
    console.log(await manager.updateProduct(data))
}

deleteP = async (idProduct) => {
    console.log(await manager.deleteProduct(idProduct))
}


//run()
//getAllProducts()
//searchByProduct(2)
//updateByProduct({"id":1,"title":"Producto10","description":"Detalle10","price":10,"thumbnail":"Img10","code":10,"stock":10})
//deleteP(2)