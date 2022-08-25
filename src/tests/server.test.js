const request = require("supertest")("http://localhost:8080")
const expect = require("chai").expect

describe("Test de pruebas de API productos", function () {

    it("Traer todos los productos", async function (){
        const productos = await request.get("/api/productos/")
        console.log(productos._body)
        expect(productos.status).to.eql(200)
    })

    it("Traer un solo producto mediante id", async () => {
        const producto = await request.get("/api/productos/1")
        console.log(producto._body)
        expect(producto.status).to.eql(200)
        expect(producto._body.id).to.eql(1)
    })


    it("Crear un producto", async () => {
        const producto = {
            nombre: "heladera",
            precio: 8000,
            img: "img.jpg",
            descripcion: "heladera frio calor"
        }

        const response = await request.post("/api/productos").send(producto)


        expect(response.status).to.eql(200)
    })

    it("Editar un producto mediante id", async () => {
        const edit = {
            nombre: "editado",
            precio: 80,
            descripcion: "este producto fue editado"
        }

        const response = await request.put("/api/productos/1").send(edit)

        expect(response.status).to.eql(200)
    })

    //revisar antes que el id este disponible.
    it("Eliminar producto mediante id", async () => {
        const response = await request.delete("/api/productos/5")

        expect(response.status).to.eql(200)
    })

})