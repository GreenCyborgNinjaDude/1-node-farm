module.exports = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%PRODUCTQUANTITY%}/g, product.quantity);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRODUCTPRICE%}/g, product.price);
    output = output.replace(/{%PRODUCTORIGIN%}/g, product.from);
    output = output.replace(/{%PRODUCTNUTRITIONS%}/g, product.nutrients);
    output = output.replace(/{%PRODUCTDESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    
    if(product.organic != true){
      output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic'); 
    }
    return output;
 };