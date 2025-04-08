/**
 * Author: Niraj Jani
 */
const app = require('./app');

// Start the server only when running the app normally, not during tests
// setting up default port as 3000, we can change to anything
const port = process.env.PORT || 3000;
/**
 * start the server on defined port
 */
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
