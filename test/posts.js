//import supertest from "supertest";
require('dotenv').config();
const supertest = require('supertest')
const qa = require('../config/qa')
const request = supertest('https://gorest.co.in/public-api/');
const TOKEN = process.env.USER_TOKEN
const chai = require('chai');
const { expect, assert } = require('chai');
const faker = require('faker')

describe('Users Posts', () =>{
    it('/posts', ()=>{
        const data = {
            user_id: "4",
            title: faker.lorem.sentence( ),
            body: faker.lorem.paragraphs()
        }
    return request
    .post('posts')
    .set("Authorization", `Bearer ${TOKEN}`)
    .send(data)
    .then(res =>{
        console.log(res.body, data)
    })   
    });
    describe('Negative tests', ()=>{
        it('401 Authorization failed', ()=>{
            const data = {
                user_id: "4",
                title: "My title",
                body: "my blog post1"
            }
            return request
            .post('posts')
            .send(data)
            .then(res =>{
                console.log(res.body)
                expect(res.body.code).to.eq(401)
                expect(res.body.data.message).to.eq('Authentication failed')
            })
        })
        it('422 Authorization failed', ()=>{
            const data = {
                user_id: "4",
                title: "My title",
                
            }
            return request
            .post('posts')
            .set("Authorization", `Bearer ${TOKEN}`)
            .send(data)
            .then( res =>{
                console.log(res.body)
                expect(res.body.code).to.eq(422)
                
                //expect(res.body.data[0].massage).to.eq(`can\'t be blank`)
            })
        })
    }) 
})