const fs = require('fs');
var products = JSON.parse(fs.readFileSync(__dirname + "/../database/products.json"));



const productsController={
    create: function(req, res, next){
        res.render('create');
        
    },
    store: function(req, res, next){
        products.push(req.body);
        let productsJSON = JSON.stringify(products, null, 2);
        fs.writeFileSync(__dirname + "/../database/products.json", productsJSON);
        res.send("Producto Creado")

    },

    edit: function(req, res, next){
        var idProducts = req.params.id;
        var productFound;
        for(var i=0; i< products.length; i++){
            if(products[i].id == idProducts){
                productFound =products[i];
                break;
            }
        }
        if(productFound){
            res.render('edit', {productFound});
            
        }else{
            res.render('create');
        }   
    },

    update: function(req, res, next){
        var idProducts = req.params.id;
        var productFound = req.body;

        var editProduct = products.map(function(product){
            if(product.id ==idProducts){
           
                return productFound;
                
            }
            return product;
            
        });

        editProductJSON= JSON.stringify(editProduct, null, 2)
        fs.writeFileSync(__dirname + "/../database/products.json", editProductJSON);
        res.render('edit', {productFound} );
    },

    destroy: function( req, res, next){
        
        var idProduct = req.params.id;
        var idFound;

        for(i=0; i< products.length; i++){
            if( products[i].id == idProduct){
                idFound = products[i].id;
                break;}
            };

                if(idFound){
                
                var productDestroy = products.filter(function(product){
                    return product.id != idProduct; 
                    
                });

        
                productDestroyJSON = JSON.stringify(productDestroy, null , 2);
                fs.writeFileSync(__dirname + "/../database/products.json", productDestroyJSON);
                res.send( "Producto " + idProduct + " Eliminado");
                

            }else{
                res.send("No existe el producto " + idProduct);

            }

        }
        
        
    
    

};

module.exports = productsController;