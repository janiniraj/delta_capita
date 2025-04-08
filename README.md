

# Delta Capita: Shopping Basket Price Calculator
# Author: Niraj Jani

I have created **Node.js (version 18)** application built with **Express** that calculates the total price of a shopping basket based on specific pricing rules and discounts for different items. This is plain Express application and this can be further expanded to use postgres (or any other db) to get base of data and run sql queries.

---

## Problem Statement
```
Write a program that calculates the price of a basket of shopping.

The solution should be accomplished in roughly two hours.

Items are presented one at a time, in a list, identified by name - for example "Apple" or "Banana".

Multiple items are present multiple times in the list, so for example ["Apple", "Apple", "Banana"] is a basket with two apples and one banana.

Items are priced as follows:

- Apples are 35p each
- Bananas are 20p each
- Melons are 50p each, but are available as ‘buy one get one free’
 - Limes are 15p each, but are available in a ‘three for the price of two’ offer

Given a list of shopping, calculate the total cost of those items.
```
---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Running Tests](#running-tests)


---

## Installation

To get started with the project, you will need to install the required dependencies.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/janiniraj/delta_capita.git
   cd delta_capita
   ```

2. **Install dependencies**:
   Make sure you have [Node.js](https://nodejs.org/) installed. (**I am using version 18**) Then, run:

   ```bash
   npm install
   ```
3. **Install development dependencies** (if not already installed):
   ```bash
   npm install --save-dev jest supertest
   ```

---

## Usage

1. **Start the Express server**:

   Run the following command to start the server:

   ```bash
   node server.js
   ```

   The server will run on `http://localhost:3000`.

2. **Send a POST request to the `/calculate` endpoint** with a JSON payload containing an array of items in your shopping basket.

   Example:
   
   You can use **Postman** or **cURL** to test the API.

   **Request**:
   ```bash
   POST http://localhost:3000/calculate
   Content-Type: application/json

   {
     "basket": ["Apple", "Apple", "Banana"]
   }
   ```

   **Response**:
   ```json
   {
     "total": "0.90"
   }
   ```

---

## API Documentation

### GET `/`


- **Response**: A JSON object with welcome message.
  ```json
  {
    "welcome":"welcome to delta capita test, written by Niraj Jani"
  }
  ```

### POST `/calculate`

- **Request Body**: A JSON object with a `basket` property, which is an array of item names.
  ```json
  {
    "basket": ["Apple", "Apple", "Banana", "Melon", "Melon", "Lime", "Lime", "Lime"]
  }
  ```

- **Response**: A JSON object with the total cost of the basket, formatted to two decimal places.
  ```json
  {
    "total": "1.70"
  }
  ```

- **Error Handling**: 
  - If the `basket` is not an array, the response will include an error message:
    ```json
    {
      "error": "Invalid input, basket should be an array."
    }
    ```

---

## Running Tests

The project uses **Jest** and **Supertest** for testing.

1. **Run tests**:

   To run the tests, use the following command:

   ```bash
   npm test
   ```

   This will run the test suite and output the results in the terminal.
   Sample Output
   ```bash
      (base) nirajjani@Nirajs-MacBook-Pro delta_capita % npm test
      
      > delta_capita@1.0.0 test
      > jest
      
        console.log
          Unknown item: Dragonfruit
      
            at log (app.js:74:25)
      
       PASS  ./app.test.js
        Delta Capita: Shopping Basket Price Calculator
          ✓ should calculate the total correctly for a simple basket (32 ms)
          ✓ should calculate the total correctly with "buy one get one free" offer on melons (2 ms)
          ✓ should calculate the total correctly with "three for the price of two" offer on limes (2 ms)
          ✓ should calculate the total correctly with a mix of items (1 ms)
          ✓ should return an error if the basket is not an array (2 ms)
          ✓ should return the correct total even if an unknown item is in the basket (19 ms)
          ✓ should return 0.00 if the basket is empty (3 ms)
      
      Test Suites: 1 passed, 1 total
      Tests:       7 passed, 7 total
      Snapshots:   0 total
      Time:        0.552 s, estimated 1 s
      Ran all test suites.
      ```
