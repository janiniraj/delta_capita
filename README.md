

# Delta Capita: Shopping Basket Price Calculator (Version 2)
# Author: Niraj Jani

I have created A **Node.js + TypeScript** backend system that manages products, promotional offers, and cart total calculation, using **JSON file storage**. This is plain simle application and this can be further expanded to use postgres (or any other db, at this moment I am using local storage in JSON format) to get base of data and run sql queries.

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

- [API Documentation](API Documentation)
- [Features](#Features)
- [Prerequisites](#Prerequisites)
- [Project Structure](#Project Structure)
- [Setup Instruction](#Setup-Instruction)
- [Running Tests](#running-tests)
- [API Endpoints](#API Endpoints)
- [Author](#Author)

---

## API Documentation
Published API Documentation Link: https://documenter.getpostman.com/view/689089/2sB2j96oNv

Reference: postman Collection and Swagger collection in root folder

---

## Features

-  Add, update, list, and delete products
- Apply and manage promotional offers:
  - **2FOR1** (Buy One Get One Free)
  - **3FOR2** (Three for the Price of Two)
- Calculate total cost of a cart
- Persistent JSON storage (`products.json`, `offers.json`)
- Unit tested using Jest

---

### Prerequisites

- [Node.js v20+](https://nodejs.org)
- [npm](https://www.npmjs.com/)
- [nvm](https://github.com/nvm-sh/nvm) (optional)

---

## Project Structure

```
.
├── src/
│   ├── controller/         # Route controllers
│   ├── models/             # Data models
│   ├── repositories/       # JSON storage + data access
│   ├── services/           # Business logic
│   ├── container/          # Dependency injection setup
│   └── index.ts            # App entry point
├── __tests__/              # Unit tests
├── products.json           # Product store
├── offers.json             # Offers store
├── jest.config.js          # Jest config
├── package.json
├── tsconfig.json
├── delta_capita_v2.postman_collection.json
├── swagger.yaml

└──README.md
```

---

## Setup Instructions

```bash
# Clone the repo
git clone https://github.com/janiniraj/delta_capita.git
cd delta_capita

# Use correct Node version
nvm use 20 || nvm install 20

# Install dependencies
npm install

# Run the server
npm run dev
```

---

## Running Tests

```bash
# Run unit tests
npm test
```

---

## API Endpoints

### 🔹 Root
- `GET /`  
  Returns welcome message.

### 🔹 Products
- `GET /api/products`  
  List all products.

- `POST /api/products`  
  Add or update a product.  
  Example body:
  ```json
  { "name": "Apple", "price": 35 }
  ```

- `DELETE /api/products/:name`  
  Delete a product by name.

---

### 🔹 Offers
- `GET /api/offers`  
  List all offers.

- `POST /api/offers`  
  Add or update offer for a product.  
  Example body:
  ```json
  {
    "productName": "Apple",
    "type": "2FOR1",
    "description": "Buy one get one free"
  }
  ```

- `DELETE /api/offers/:productName`  
  Delete an offer by product.

---

### 🔹 Cart
- `POST /api/cart/total`  
  Calculate total cost for a cart.  
  Example body:
  ```json
  ["Apple", "Apple", "Banana", "Melon", "Melon", "Lime", "Lime", "Lime"]
  ```

  Response:
  ```json
  {
    "total": 260,
    "formatted": "£2.60"
  }
  ```

---

## 👨‍💻 Author

**Niraj Jani**

> Built as a coding test for Delta Capita (version 2).
