const chai = require('chai')
const chaiHttp = require('chai-http')
require('chai/register-should')
const app = require('../../app')
chai.use(chaiHttp)
const { expect } = chai

describe("Product endpoints test", () => {
    it('It should create new product', (done) => {
        var userId = 1
        const data = {
            name: "Clipper",
            price: "3000"
        }
        chai.request(app)
            .post(`/api/v1/product/create/${userId}`)
            .set('Accept', 'application/json')
            .send(data)
            .end( (err, res) => {
                expect(res.status).to.equal(201)
                done()
            })
    })

    it('It should not create product with incomplete data', (done) => {
        var userId = 1
        var data = {
            name: "Clipper"
        }
        chai.request(app)
            .post(`/api/v1/product/create/${userId}`)
            .set('Accept', 'application/json')
            .send(data)
            .end( (err, res) => {
                expect(res.status).to.equal(400)
                done()
            })
    })

    it('It should update product', (done) => {
        var userId = 1
        var productId = 1
        var data = {
            id: productId,
            name: "clipper updated",
            price: "3500"
        }

        chai.request(app)
            .put(`/api/v1/product/put/${userId}/product/${productId}`)
            .set('Accept', 'application/json')
            .send(data)
            .end( (err, res) => {
                expect( res.status ).to.equal(200)
                done()
            })
    })

    it('It should not update with incorrect product id', (done) => {
        var userId = 1
        var productId = 3
        var data = {
            id: productId,
            name: "clipper updated",
            price: "3500"
        }

        chai.request(app)
            .put(`/api/v1/product/put/${userId}/product/${productId}`)
            .set('Accept', 'application/json')
            .send(data)
            .end( (err, res) => {
                expect(res.status).to.equal(404)
                done()
            })
    })

    it('It should delete product', (done) => {
        var userId = 1
        var productId = 1

        chai.request(app)
            .delete(`/api/v1/product/del/${userId}/product/${productId}`)
            .set('Accept', 'application/json')
            .end( (err, res) => {
                expect(res.status).to.equal(200)
                done()
            })
    })

    it('It should not delete product', (done) => {
        var userId = 3
        var productId = 4

        chai.request(app)
            .delete(`/api/v1/product/del/${userId}/product/${productId}`)
            .set('Accept', 'application/json')
            .end( (err, res) => {
                expect(res.status).to.equal(404)
                done()
            })
    })
})
