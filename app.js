/**
 * Author: Niraj Jani
 */
// Using Java, write a program that calculates the price of a basket of shopping.
//
// The solution should be accomplished in roughly two hours.
//
// Items are presented one at a time, in a list, identified by name - for example "Apple" or "Banana".
//
// Multiple items are present multiple times in the list, so for example ["Apple", "Apple", "Banana"] is a basket with two apples and one banana.
//
// Items are priced as follows:
//
// - Apples are 35p each
// - Bananas are 20p each
// - Melons are 50p each, but are available as ‘buy one get one free’
//  - Limes are 15p each, but are available in a ‘three for the price of two’ offer
//
// Given a list of shopping, calculate the total cost of those items.

const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(express.json());

//Todo: use postgres for product and prices
/**
 * Price rules for each item
 * @type {{Lime: number, Apple: number, Banana: number, Melon: number}}
 */
const prices = {
    "Apple": 0.35,   // 35p each
    "Banana": 0.20,  // 20p each
    "Melon": 0.50,   // 50p each (Buy 1 Get 1 Free offer)
    "Lime": 0.15     // 15p each (3 for 2 offer)
};


/**
 * Function to calculate the total price of the basket
 * @param basket
 * @returns {number}
 */
function calculateTotal(basket) {
    let total = 0;

    // Count the occurrences of each item in the basket
    const itemCounts = basket.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
    }, {});

    // Apply pricing rules mentioned in requirements of test
    for (const [item, count] of Object.entries(itemCounts)) {
        switch(item) {
            case 'Apple':
                total += prices.Apple * count;
                break;
            case 'Banana':
                total += prices.Banana * count;
                break;
            case 'Melon':
                // Melons are buy one get one free
                total += prices.Melon * Math.ceil(count / 2);
                break;
            case 'Lime':
                // Limes are 3 for 2 offer
                total += prices.Lime * Math.ceil(count / 3 * 2);
                break;
            default:
                console.log(`Unknown item: ${item}`);
        }
    }

    return total;
}

/**
 * Route to handle basket calculation
 */
app.post('/calculate', (req, res) => {
    const basket = req.body.basket;

    if (!Array.isArray(basket)) {
        return res.status(400).json({ error: 'Invalid input, basket should be an array.' });
    }

    const totalCost = calculateTotal(basket);

    return res.json({ total: totalCost.toFixed(2) });
});

app.get('/',  (req, res) => {
    return res.json({ "welcome": "welcome to delta capita test, written by Niraj Jani" });
});

module.exports = app;
