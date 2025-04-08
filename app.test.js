/**
 * Author: Niraj Jani
 */

const request = require('supertest');
const express = require('express');
const app = require('./app');  // Assuming your Express app is in app.js

describe('Delta Capita: Shopping Basket Price Calculator', () => {

    // Test for simple basket (2 Apples and 1 Banana)
    it('should calculate the total correctly for a simple basket', async () => {
        const response = await request(app)
            .post('/calculate')
            .send({ basket: ['Apple', 'Apple', 'Banana'] });

        expect(response.status).toBe(200);
        expect(response.body.total).toBe('0.90');  // 2 Apples (0.70) + 1 Banana (0.20) = 0.90
    });

    // Test for "buy one get one free" offer on melons (2 Melons)
    it('should calculate the total correctly with "buy one get one free" offer on melons', async () => {
        const response = await request(app)
            .post('/calculate')
            .send({ basket: ['Melon', 'Melon', 'Apple'] });

        expect(response.status).toBe(200);
        expect(response.body.total).toBe('0.85');  // 1 Melon (0.50) + 1 Apple (0.35) = 0.85
    });

    // Test for "three for the price of two" offer on limes (4 Limes)
    it('should calculate the total correctly with "three for the price of two" offer on limes', async () => {
        const response = await request(app)
            .post('/calculate')
            .send({ basket: ['Lime', 'Lime', 'Lime', 'Lime'] });

        expect(response.status).toBe(200);
        expect(response.body.total).toBe('0.45');  // 4 Limes, 3 for 2, so pay for 2 (0.15 * 2) = 0.30
    });

    // Test for a basket with all types of items
    it('should calculate the total correctly with a mix of items', async () => {
        const response = await request(app)
            .post('/calculate')
            .send({ basket: ['Apple', 'Apple', 'Banana', 'Melon', 'Melon', 'Lime', 'Lime', 'Lime'] });

        expect(response.status).toBe(200);
        expect(response.body.total).toBe('1.70');  // 2 Apples (0.70) + 1 Banana (0.20) + 1 Melon (0.50) + 2 Limes (0.30) = 1.70
    });

    // Test for invalid basket input (basket is not an array)
    it('should return an error if the basket is not an array', async () => {
        const response = await request(app)
            .post('/calculate')
            .send({ basket: "Apple, Apple, Banana" });  // Invalid input (string instead of array)

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Invalid input, basket should be an array.');
    });

    // Test for an unknown item (Dragonfruit)
    it('should return the correct total even if an unknown item is in the basket', async () => {
        const response = await request(app)
            .post('/calculate')
            .send({ basket: ['Apple', 'Dragonfruit'] });  // Dragonfruit is not in the price list

        expect(response.status).toBe(200);
        expect(response.body.total).toBe('0.35');  // Only Apple is counted
    });

    // Test for empty basket
    it('should return 0.00 if the basket is empty', async () => {
        const response = await request(app)
            .post('/calculate')
            .send({ basket: [] });  // Empty basket

        expect(response.status).toBe(200);
        expect(response.body.total).toBe('0.00');  // No items, so total should be 0.00
    });

});
