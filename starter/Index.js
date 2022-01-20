const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');

////////////////////////////////////////////////////
//FILES

//file writting and reading blocking/sychronous way (not perfer) when many user is using ur service
//const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
//console.log(textIn);
//const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
//fs.writeFileSync('./txt/output.txt', textOut);
//console.log('File written!');

//file writting and reading non-blocking/asychronous way (perfer) when many user are using ur service
//fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//    if (err) return console.log('ERROR CANNOT FIND & READ DATA! ಠ_ಠ');
//    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => { 
//        console.log(data2);
//        fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => { 
//            console.log(data3);
//
//            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                console.log('your file has been written  ツ');
//            })
//         });
//     }); 
//});

////////////////////////////////////////////////////
//SERVER

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName, {lower: true}));
//console.log(slugify('Persona 3', {lower: true}));
//console.log(slugs);

const server = http.createServer((req, res) => {
    //console.log(req.url);
    const {query, pathname} = url.parse(req.url, true);
    //const pathName = req.url;

    //OVERVIEW PAGE
    if(pathname === '/' || pathname === '/overview'){
       res.writeHead(200, {'Content-type': 'text/html'});

       const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
       const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
       console.log(cardsHtml);
       res.end(output); 
    }

    //PRODUCT PAGE
    else if  (pathname === '/product'){
       //console.log(query);
       res.writeHead(200, {'Content-type': 'text/html'});
       const product = dataObj[query.id];
       const output = replaceTemplate(tempProduct, product);
       res.end(output);
    }

    //API
    else if (pathname === '/api'){
          res.writeHead(200, {'Content-type': 'application/json'});
          //console.log(productData);
          res.end(data);
    }

    //ERROR PAGE
    else {
       res.writeHead(404, {
           'Content-type': 'text/html',
           'my-own-header': 'hello-world'
       }); 
       res.end('<h1>PAGE CANNOT BE FOUND!</h1>');
    };
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Server is up & running, ready to listen to request on port 8000');
});