const fs = require('fs')

class Contenedor{
    constructor(ruta){
        this.ruta = ruta
    }

    async #readFileFunction(ruta){
        let archivo = await fs.promises.readFile(ruta, 'utf-8')
        let archivoParseado = await JSON.parse(archivo)
        return archivoParseado
    }

    async save(obj){

        try{
        let data = await this.#readFileFunction(this.ruta)//await fs.promises.readFile(this.ruta, 'utf-8')
        // let dataParse =JSON.parse(data)
        if(data.length){
            await fs.promises.writeFile(this.ruta, JSON.stringify([...data, {...obj, id: data[data.length - 1 ].id + 1 }], null, 2))

        } else{
            await fs.promises.writeFile(this.ruta, JSON.stringify([{...obj, id: 1 }], null, 2))
        } 
        console.log(`El archivo tiene el id: ${data[data.length - 1].id + 1} `)
        } catch (error) {
            console.log(error)
        }
    }

    async updateById(obj){
        try{
            let archivo = await fs.promises.readFile(this.ruta, 'utf-8')//await fs.promises.readFile(this.ruta, 'utf-8')
            let data = await JSON.parse(archivo)
            // let dataParse =JSON.parse(data)
            const objIndex = data.findIndex(prod => prod.id === obj.id)
        
        if(objIndex !== -1) {
            data[objIndex] = obj
            await fs.promises.writeFile(this.ruta, JSON.stringify( data, null, 2))
            return {msg: 'actualizado el producto'}
        } else{
            return{error: 'no existe el producto'}
        } 

        } catch (error) {
            console.log(error)
        }
    }

    async getById(id){
        try{
            let data = await fs.promises.readFile(this.ruta, 'utf-8')
            let dataParse =JSON.parse(data)
            let producto = dataParse.find(producto => producto.id === id)
            if (producto) {
                console.log(producto)
            } else {
                console.log(`no existe`)
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    async getAll(){
        try{
            // let data = await fs.promises.readFile(this.ruta, 'utf-8')
            // let dataParse =JSON.parse(data)
            let data = await this.#readFileFunction(this.ruta)

            if (data.length) {
                // console.log(dataParse)
                return data
            } else {
                return null
                // console.log("no hay productos")
            }
            // console.log(dataParse)
        } catch (error) {
            console.log(error)
        }

    }
    async deleteById(id){
        try{
            let data = await fs.promises.readFile(this.ruta, 'utf-8')
            let dataParse =JSON.parse(data)
            let producto = dataParse.find(producto => producto.id === id)
            if (producto) {
                let dataParseFiltrado = dataParse.filter(producto => producto.id !== id)
                await fs.promises.writeFile(this.ruta, JSON.stringify(dataParseFiltrado, null, 2), 'utf-8') 
                console.log("producto eliminado")
            } else {
                console.log(`no existe`)
            }
        } catch (error) {
            console.log(error)
        }
    }
    async deleteAll(){
        try{
            let dataParseFiltrado = []
            await fs.promises.writeFile(this.ruta, JSON.stringify(dataParseFiltrado, null, 2), 'utf-8')
            console.log("se eliminardon todos los productos")
        } catch (error) {
            console.log(error)
        }
    }

    async getProductRandom(){
        try {
            let data = await this.#readFileFunction(this.ruta)
            let random = Math.floor(Math.random() * data.length)
            return data[random]
        } catch (error) {
            console.log(error)
        }
    } 


}




module.exports = {Contenedor}