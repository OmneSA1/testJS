//import supertest from "supertest";
const supertest = require('supertest')
const qa = require('../config/qa')
const request = supertest('https://gorest.co.in/public-api/');
const TOKEN = 'cb3da8a220c2e7b42a920da15e694947a5c530120fb835e536a3f8de41e9af06'
const chai = require('chai');
const { expect } = require('chai');


describe('User', ()=>{
    let userId;
    describe('GET', () =>{
        
        it('/users', () => {
            return request
            .get(`/users?acces-token= ${TOKEN}`)
            .then((res) =>{
                expect(res.body.data).to.not.be.empty;
    
            });
        });
        
        it('/users/:id', ()=>{
            return request
            .get(`/users/71?acces-token= ${TOKEN}`)
            .then((res) =>{
                expect(res.body.data.id).to.be.eq(71);
            });
        });
        
        it('/users with query params', () =>{
            const url = `/users?acces-token= ${TOKEN}&page=5&gender=female&status=active`
            return request
            .get(url)
            .then((res) =>{
                expect(res.body.data).to.not.be.empty;
                res.body.data.forEach(data => {
                    expect(data.gender).to.eq('female');
                    expect(data.status).to.eq('active');
                    
                });
            });
        });
    });

    describe('POST', () =>{
        
        it('/users', () => {
            const data = {
                email: `boromir-${Math.floor(Math.random() * 999)}@mail.co`,
                name: 'Boromir',
                gender: 'male',
                status: 'inactive',
            };
            return request
            .post('users')
            .set("Authorization", `Bearer ${TOKEN}`)
            .send(data)
            .then(res =>{
                expect(res.body.data).to.deep.include(data);
    
            });
        });
    });

    describe('PUT', () =>{
        it('/users/:id', () =>{
            const data = {
               status: 'active',
                name: `Dupa + ${Math.floor(Math.random() * 999)}`,
            };
    
            return request
            .put('users/46')
            .set("Authorization", `Bearer ${TOKEN}`)
            .send(data)
            .then(res => {
                expect(res.body.data).to.deep.include(data);
            });
        });
    });
    describe('DEL', () =>{
        it('/users/:id', () =>{
        return request
        .delete('users/46')
        .set('Authorization', `Bearer ${TOKEN}`)
        .then((res) =>{
            console.log(res.body)
            expect(res.body.data).to.be.eq(null);
        });
        
        });
    });
});