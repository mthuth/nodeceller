var mongo = require('mongodb');

//var Server = mongo.Server,
//    Db = mongo.Db,
//    ObjectID = require('mongodb').ObjectID,
//    BSON = mongo.BSONPure;



var MongoClient = require('mongodb').MongoClient;
var db;
console.log("this is a test message");
// Initialize connection once


MongoClient.connect("mongodb://mongo:mongo@ds033875.mongolab.com:33875/ecom", function(err, database) {
   if(!err) {
    console.log("test message 2");
            console.log("Connected to 'shopifyOrdersdb' database");
            database.collection('shopifyOrders', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'shopifyOrders' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
    if(err) {
        console.log("error: " + err);
    }
    if(err) throw err;

    console.log("database: " + database);
    db = database;

});   

//var server = new Server('localhost', 27017, {auto_reconnect: true});
//var server = new Server('ds053794.mongolab.com', 53794, {auto_reconnect: true});
//db = new Db('shopify_creditials', server);
//db.authenticate('mongo','mongo', function(err, res) {});
/*
db.open(function(err, db) {
    db.authenticate('mongo','mongo', function(err, res) {});
    //console.log("error: " + res);
    if(!err) {
        console.log("Connected to 'shopifyOrdersdb' database");
        db.collection('shopifyOrders', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'shopifyOrders' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
    
});
*/
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving shopifyOrders: ' + id);
    db.collection('shopifyOrders', function(err, collection) {
        console.log("Collection: " + collection);
        //collection.findOne()
        //collection.find().limit(1).next(function(err, doc){});
        console.log("id: " + new ObjectID(id));
        console.log("error: " + err);
        collection.findOne({"_id": new ObjectID(id)}, function(err, item){
            console.log("item: " + item);
            res.send(item);
        });
        //collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
        //    res.send(item);
        //});
    });
};

exports.findAll = function(req, res) {
    console.log("Finding all Shopify Orders");
    db.collection('shopifyOrders', function(err, collection) {
        console.log("Collection: " + collection);
        collection.find().toArray(function(err, items) {
            console.log("Collection: " + collection);
            res.send(items);
        });
    });
};

exports.add = function(req, res) {
    console.log("inside addshopifyOrders");
    var shopifyOrders = req.body;
    console.log('Adding shopifyOrders: ' + JSON.stringify(shopifyOrders));
    db.collection('shopifyOrders', function(err, collection) {
        collection.insert(shopifyOrders, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.update = function(req, res) {
    var id = req.params.id;
    var shopifyOrders = req.body;
    console.log('Updating shopifyOrders: ' + id);
    console.log(JSON.stringify(shopifyOrders));
    db.collection('shopifyOrders', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, shopifyOrders, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating shopifyOrders: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(shopifyOrders);
            }
        });
    });
}

exports.delete = function(req, res) {
    var id = req.params.id;
    console.log('Deleting shopifyOrders: ' + id);
    db.collection('shopifyOrders', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var shopifyOrders = [
    {
        name: "CHATEAU DE SAINT COSME",
        year: "2009",
        grapes: "Grenache / Syrah",
        country: "France",
        region: "Southern Rhone",
        description: "The aromas of fruit and spice...",
        picture: "saint_cosme.jpg"
    },
    {
        name: "LAN RIOJA CRIANZA",
        year: "2006",
        grapes: "Tempranillo",
        country: "Spain",
        region: "Rioja",
        description: "A resurgence of interest in boutique vineyards...",
        picture: "lan_rioja.jpg"
    }];

    db.collection('shopifyOrders', function(err, collection) {
        db.authenticate('mongo','mongo', function(err, res) { console.log("error: " + err) });
        collection.insert(shopifyOrders, {safe:true}, function(err, result) {
            console.log('result: ' + err); 
        });

    });

};