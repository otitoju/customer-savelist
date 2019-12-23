const chai = require('chai')
const chaiHttp = require('chai-http')
require ('chai/register-should');
const app = require('../../app')
chai.use(chaiHttp)

const { expect } = chai

describe('Testing the user endpoint', () => {
    it('Register new user', (done) => {
        const user = {
            name: 'johnson',
            email: 'johnson@gmail.com',
            password: 'johnson'
        }
        chai.request(app)
            .post('/api/v1/register')
            .set('Accept', 'application/json')
            .send(user)
            .end( (err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body.data).to.include({
                    id: 1,
                    name: body.name,
                    email: body.email,
                    password: body.password
                })
                done()
            })
    })

    it('It should not register user with incomplete data', (done) => {
        const user = {
            email: 'johnson@gmail.com',
            password: 'johnson'
        }
        chai.request(app)
            .post('/api/v1/register')
            .set('Accept', 'application/json')
            .send(user)
            .end( (err, res) => {
                expect(res.status).to.equal(400)
                done()
            })
    })

    it('It should get all users', (done) => {
        chai.request(app)
            .get('/api/v1/users')
            .set('Accept', 'application/json')
            .end( (err, res) => {
                expect(res.status).to.equal(200)
                res.body.data[0].should.have.property('id')
                res.body.data[0].should.have.property('name')
                res.body.data[0].should.have.property('email')
                res.body.data[0].should.have.property('password')
                done()
            })
    })

    it('It should return a single user', (done) => {
        const userId = 1
        chai.request(app)
            .get(`/api/v1/user/${userId}`)
            .set('Accept', 'application/json')
            .end( (err, res) => {
                expect(res.status).to.equal(200)
                res.body.data[0].should.have.property('id')
                res.body.data[0].should.have.property('name')
                res.body.data[0].should.have.property('email')
                res.body.data[0].should.have.property('password')
                done()
            })
    })

    it('It should not return user with invalid id', (done) => {
        const userId = 23
        chai.request(app)
            .get(`/api/v1/user/${userId}`)
            .set('Accept', 'application/json')
            .end( (err, res) => {
                expect(res.status).to.equal(404)
                res.body.should.have.property('message').eql(`No user found`);
                done()
            })
    })

    it('It shoud update a user', (done) => {
        const userId = 1
        const data = {
            id: userId,
            name: 'johnson updated',
            email: 'johnson@gmail.com',
            password: 'johnson updated'
        }
        chai.request(app)
            .put(`/api/v1/user/put/${userId}`)
            .set('Accept', 'application/json')
            .send(data)
            .end( (err, res) => {
                expect(res.status).to.equal(200)
                done()
            })
    })

    it('It should delete a user', (done) => {
        const userId = 1
        chai.request(app)
            .delete(`/api/v1/user/del/${userId}`)
            .set('Accept', 'application/json')
            .end( (err, res) => {
                expect(res.status).to.equal(200)
                done()
            })
    })
})