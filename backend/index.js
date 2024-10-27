import express from "express";

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// API endpoint to calculate total value of products
app.post('/api/calculate-total', (req, res) => {
    const products = req.body.products;

    if (!Array.isArray(products)) {
        return res.status(400).json({ error: 'Invalid input, expected an array of products.' });
    }

    let totalValue = 0;

    products.forEach(product => {
        if (product.price && typeof product.price === 'number') {
            totalValue += product.price;
        } else {
            return res.status(400).json({ error: 'Each product must have a valid price.' });
        }
    });
    console.log(totalValue);
    return res.status(200).json({ totalValue });
});


