//Defining the player object - object literal initialization

const name = "unknown";
const score = 0;
const items = 0;

//Demonstrate object literal property value shorthand & method declaration shorthand
let player = {
    name,
    score,
    items,
    getCurrentScore() {
        return this.score;
    },
    addPoints(points) {
        this.score = this.score + points;
    },
    deductPoints(points) {
        this.score = this.score - points;
    }
};


//Constructor function - Prior to ES6
function Product(id,name,price,expiryDate) {
    this.id = id; 
    this.name = name;
    this.price = price;
    this.expiryDate = expiryDate;
}

//Use Object.defineProperty to create and alter properties and their various settings
Object.defineProperties(Product.prototype, {
    daysToExpire: {
         get: function() { 
            return dateDiff(this.expiryDate, new Date()); //Use the Date object and common features
         }
    }
});


//Use the Date object and common features
//Use the Math object and common features
const dateDiff = (date1, date2) => {
    // time difference
    let timeDiff = Math.abs(date2.getTime() - date1.getTime()); //Use the Math object and common features

    // days difference
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // difference
    return diffDays;
};

//Using the prototype to add method to Product
Product.prototype.getDetails = function () {
    return `Product Code: ${this.code} Product Name: ${this.name}`;
}


function MagicProduct(id,name,price,expiryDate,points,isBonus) {
    Product.call(this, id, name, price, expiryDate);
    this.points = points;
    this.isBonus = isBonus;
}


MagicProduct.prototype = Object.create(Product.prototype); // Work with prototypes for inheritance, Use Object.create() and specify a prototype


//ES6 class -- Rating
class Rating {

    //create the constructor

    set rating(value) {
       if(value > 1 && value <= 4) {
            this.rate="OK";
       } else if(value >= 5 && value <= 7) {
            this.rate="GOOD";
       } else if(value > 7) {
            this.rate="EXCEPTIONAL";
       } else {
            this.rate="BAD";
       }
    }
}


function loadMasterData() {
    let productsList = new Array();
    let prodId = 1;

    const today = new Date();
    const oneYearLater = new Date(today.getFullYear() + 1, today.getMonth(), today.getDay());
    const daysLater = new Date(today.getFullYear(), today.getMonth(), today.getDay() + 3);

    let productData = new Map();
    productData.set("popcorn", { pr: 100.50, dt: oneYearLater });
    productData.set("oatmeal", { pr: 100.25, dt: oneYearLater });
    productData.set("macaroni", { pr: 100.10, dt: oneYearLater });
    productData.set("turkey", { pr: 800, dt: daysLater });
    productData.set("crab", { pr: 400, dt: daysLater });
    productData.set("butter", { pr: 25.50, dt: oneYearLater });
    productData.set("flour", { pr: 30, dt: oneYearLater });
    productData.set("pasta", { pr: 40.10, dt: oneYearLater });
    productData.set("chocolate", { pr: 25, dt: oneYearLater });
    productData.set("cola", { pr: 10, dt: oneYearLater });
    productData.set("beaf", { pr: 100.50, dt: daysLater });
    productData.set("fish", { pr: 150, dt: daysLater });
    productData.set("carrot", { pr: 40.10, dt: daysLater });
    productData.set("greens", { pr: 50, dt: daysLater });
    productData.set("sugar", { pr: 100, dt: oneYearLater });

    let prodKeys = Object.keys(new Product());

    const loadProducts = (value, key, map) => {
        let prodObj = new Product();
        for (let i = 0; i < prodKeys.length; i++) {
            let property = prodKeys[i];
            if (Object.is(property, "id")) {
                prodObj[property] = prodId;
            } else if (Object.is(property, "name")) {
                prodObj[property] = key;
            } else if (Object.is(property, "price")) {
                prodObj[property] = value.pr;
            } else if (Object.is(property, "expiryDate")) {
                prodObj[property] = value.dt;
            }
        }

        productsList.push(prodObj);
        prodId++;
    };


    productData.forEach(loadProducts);

    let magicProductData = new Map();
    magicProductData.set("Christmas cake", { pr: 1000, dt: oneYearLater, pt: 10, isB: true });
    magicProductData.set("honey", { pr: 200, dt: oneYearLater, pt: 20, isB: false });
    magicProductData.set("pepper", { pr: 500, dt: oneYearLater, pt: 10, isB: false });
    magicProductData.set("champagne", { pr: 2000, dt: oneYearLater, pt: 40, isB: true });
    magicProductData.set("cocktails", { pr: 2000, dt: oneYearLater, pt: 40, isB: true });

    let magProdKeys = Object.keys(new MagicProduct());

    const loadMagicProducts = (value, key, map) => {
        let prodObj = new MagicProduct();
        for (let i = 0; i < magProdKeys.length; i++) {
            let property = magProdKeys[i];
            if (Object.is(property, "id")) { //Explain Object.is
                prodObj[property] = prodId;
            } else if (Object.is(property, "name")) {
                prodObj[property] = key;
            } else if (Object.is(property, "price")) {
                prodObj[property] = value.pr;
            } else if (Object.is(property, "expiryDate")) {
                prodObj[property] = value.dt;
            } else if (Object.is(property, "points")) {
                prodObj[property] = value.pt;
            } else if (Object.is(property, "isBonus")) {
                prodObj[property] = value.isB;
            }
        }

        productsList.push(prodObj);
        prodId++;
    };

    magicProductData.forEach(loadMagicProducts);

    return productsList;
}

const getProduct = (prodList) => {
    let rand = Math.floor(Math.random() * 20) + 1; //Use the Math object and common features
    return prodList.find(findProductById(rand));
};

const findProductById = (id) => {
    return function (product) {
        return product.id == id;
    }
};

const findPointsToBill = (roundedTotal) => {
    if (roundedTotal > 10 && roundedTotal <= 100) {
        return 5;
    } else if (roundedTotal > 100 && roundedTotal <= 250) {
        return 10;
    } else if (roundedTotal > 250 && roundedTotal <= 400) {
        return 15;
    } else if (roundedTotal > 400 && roundedTotal <= 500) {
        return 20;
    } else if (roundedTotal > 500 && roundedTotal <= 750) {
        return 25;
    } else if (roundedTotal > 1000) {
        return 50;
    } else {
        return 0;
    }
};

const findPointsForExpDate = (prod) => {
    if(prod.daysToExpire < 30) {
        return 10;
    } else {
        return 0;
    }
};

const  claculateBill = (prod, tBill) => {
    return  tBill + prod.price;
};

const claculatePoints = (prod, tBill) => {
    let pointsToBill = findPointsToBill(Math.round(tBill)); //Use the Math object and common features
    let pointsForExpDate = findPointsForExpDate(prod);
    console.log(`${prod.name} - ${prod.daysToExpire} - ${pointsForExpDate}`);
    player.score = player.score + pointsToBill + pointsForExpDate;
    if (prod instanceof MagicProduct) {
        if (prod.isBonus) {
            player.addPoints(prod.points);
        } else {
            player.deductPoints(prod.points);
        }
    }
};

function init(data) { //display game instructions
    console.log("Welcome to the Shopping Master game! You can shop for groceries and become a Shopping Master!");
    console.log("We offer you grocery items that you can buy or reject. You can buy up to 10 items.");
    console.log("As you go along your shopping journey you will collect points.");
    console.log("If you earn 500 points you become a Shopping Master!");
	console.log("You can start the game or quit using the following options.");
    console.log("1 - Shop".green);
    console.log("2 - Quit".green);
    console.log("=============================================================================================\n");

    rl.question("What's your name? ", function (name) {
        player.name = name;
        console.log(`Welcome ${player.name} !!!`.blue);
        start(data);
    });
}

function start(data) {
    rl.question("What would you like to do? <Enter option number>: ", function (option) {
        if (option == "" || isNaN(option)) {
            console.log("Invalid option! Enter 1 or 2".red);
            start(data);
        } else {
            doAction(option, data);
        }
    });
}

const shop = (prodList, lastProd) => {
    let totalBill = 0;
    let product = null;
    if(lastProd != null) {
        product = lastProd;
    } else {
        product = getProduct(prodList);
        console.log(`You can buy: ${product.name}`.yellow);
    }

    rl.question("Do you want to buy this item <Y/N>? ", function (option) {
        const regexYes = new RegExp('y', 'i'); //Use the RegExp object and common features
        const regexNo = new RegExp('n', 'i');
        if (regexYes.test(option)) {
            totalBill = claculateBill(product, totalBill);
            claculatePoints(product, totalBill);
            console.log(`${player.name} you earned ${player.getCurrentScore()} points!`.bold);
            if (player.score > 500) {
                exitWon();
            } else {
                let iCount = ++player.items;
                Object.defineProperty(player, "items", { value: iCount });

                if (player.items < 10) {
                    shop(prodList);
                } else {
                    exitLost();
                }
            }

        } else if (regexNo.test(option)) {
            if (player.items < 10) {
                shop(prodList);
            } else {
                exitLost();
            }
        } else {
            console.log("Invalid option! Enter Y or N.".red);
            shop(prodList, product);
        }
    });
};

const rateAndExit = () => {
    let playerRating = new Rating();
    rl.question("How would you rate this game on a scale of 1-10 (1 being the lowest)?:", function (r) {
        if(r == "" || isNaN(r) || r == 0 || r > 10) {
            console.log("Invalid rating! Please nter a number from 1 - 10".red);
            rateAndExit(); 
        } else {
            playerRating.rating = r;

            //Demonstrate Object.assign
            let target = Object.assign({},player,playerRating);

            console.log(`${target.name} you rated this game as ${target.rate}`.green);
            console.log("Thank you for your valuable feedback.".blue);
            rl.close();
        }        
    });
};

const exitLost = () => {
    console.log(`Your chances are over! You are short of ${500 - player.getCurrentScore()} to become a Shopping Master. Good Luck for next time!`.yellow);
    rateAndExit();
};

const exitWon = () => {
    console.log(`Congratulations!!! You became ${player.status}!`.blue);
    rateAndExit();
};

function main() {
    let products = loadMasterData();
    init(products);
}

///////////////////////////////////////////////////////////////
const readline = require("readline");
require('colors');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const quit = () => {
    rl.on("close", function () {
        console.log("\nGAME OVER !!!".bold);
    });
    process.exit(0);
};

function doAction(o, d) {
    if (o == 1) {
        shop(d);
    } else if (o == 2) {
        quit();
    }
}


main();

exports.loadMasterData = loadMasterData;
exports.getProduct = getProduct;
exports.findProductById = findProductById;
exports.findPointsToBill = findPointsToBill;
exports.findPointsForExpDate = findPointsForExpDate;
exports.claculateBill = claculateBill;
exports.claculatePoints = claculatePoints;
exports.init = init;
exports.shop = shop;
exports.rateAndExit = rateAndExit;
exports.exitLost = exitLost;
exports.exitWon = exitWon;
exports.main = main;



