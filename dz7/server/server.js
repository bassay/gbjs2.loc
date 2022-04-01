const express = require('express');
// const path = require('path');
const PORT = process.env.PORT ?? 5556;

const fs = require('fs');
const app = express();

// middleware
app.use(express.json());
app.use('/', express.static('./public'));

app.get('/api/products', (req, res) => {
    fs.readFile('./server/db/products.json', 'utf-8', (err, data) => {
        if (err) res.send(JSON.stringify({ result: 0, err }));
        else res.send(data);
    });
});

app.get('/api/cart', (req, res) => {
    fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) res.send(JSON.stringify({ result: 0, err }));
        else res.send(data);
    });
});

app.post('/api/cart', (req, res) => {
    // console.log('post - ', req.body)
    logger("Пользователь добавил первый товар", req.body.product_name)
    fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) res.send(JSON.stringify({ result: 0, err }));
        else {
            const cart = JSON.parse(data);
            cart.contents.push(req.body);
            fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
                if (err) res.end(JSON.stringify({ result: 0, err }));
                else res.end(JSON.stringify({ result: 1 }));
            });
        }
    });
});

app.put('/api/cart/:id', (req, res) => {
    // console.log('put - ', req.body)
    logger("Увеличил кол-во на 1", req.body.product_name)
    fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) res.send(JSON.stringify({ result: 0, err }));
        else {
            const cart = JSON.parse(data);
            const find = cart.contents.find(good => good.id_product === Number(req.params.id));
            find.quantity++;
            fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
                if (err) res.end(JSON.stringify({ result: 0, err }));
                else res.end(JSON.stringify({ result: 1 }));
            });
        }
    });
});

app.delete('/api/cart/:id', (req, res) => {
    // console.log('del - ', req.body)
    logger("Удалили товар из корзины", req.body.product_name)
    const id_cont = +req.params.id;
    fs.readFile(
        './server/db/userCart.json',
        'utf-8',
        ( err, data ) => {
            if (err) {
                res.send(JSON.stringify({ result: 0, err }));
            } else {
                const cart = JSON.parse(data);
                const find = cart.contents.find(good => good.id_product === Number(id_cont));
                // console.log(find)
                if (find.quantity > 1 ) {
                    find.quantity--;
                } else {
                    cart.contents.splice(cart.contents.indexOf(find), 1)
                }
                // переписываем фаил в БД
                fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
                    if (err) res.end(JSON.stringify({ result: 0, err }));
                    else res.end(JSON.stringify( { result: 1, err }));
                });
            }
        });
     // */
});

// переадем действие и название товара, дата ставится автоматом. Дата в
// Timestamp
function logger(action, prodName) {
    const obj = {
        "action": action,
        "prod": prodName,
        "date": Date.now()
    }
    fs.readFile('./server/db/stats.json', 'Utf-8', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            const stats = JSON.parse(data)
            stats.push(obj)
            fs.writeFile('./server/db/stats.json', JSON.stringify(stats), (err) => {
                if(err) console.log(err);
            })
        }
    })


}

//*
app.listen(PORT, () => {
    console.log(`Server started! ${PORT}`);
});