const con = require('./db/connection.js')
const fs = require('fs');
const rawData = fs.readFileSync('shoes.json');
const shoeData = JSON.parse(rawData);

const formattedData = shoeData.shoes.map((item) => {
  return [{
    name: item.name.split("'").slice(0, 1).join(''), 
    style: item.nickname,
    price: (item.retail_price_cents / 100) - 40,
    sizes: JSON.stringify(item.size_range),
    img: JSON.stringify(item.original_picture_url),
    gender: item.gender[0],
    category: item.category[0],
    colour: item.color,
    stock_left: Math.floor(Math.random() * (20 - 0) + 0),
    designer: item.designer,
    slug: item.slug,
    release_date: item.release_date ? item.release_date : '2019-07-03'
  }]
}).flat(1)

// IMPORTANT Commented out below, as I don't want insert of data to continue to happen its just a reference of how I got the json data into my db

// const query = "INSERT INTO test.products (name, style, price, sizes, discount, img, gender, category, colour, stock_left, designer, slug, release_date) VALUES ?";

// con.query(
//     query,
//     [formattedData.map(item => [item.name, item.style, item.price, item.sizes, null, item.img, item.gender, item.category, item.colour, item.stock_left, item.designer, item.slug, item.release_date])], function 
//     (error, results) {
//     console.log(error);
//     }
// );