//Require modules
var mysql = require("mysql");
var inquirer = require("inquirer");

//Initialize connection
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

//Start function
function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Welcom to BAM-azon! What would you like to do?",
      choices: ["View Current Items", "Place an Order"]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Current Items":
          readTable();
          break;

        case "Place an Order":
          placeOrder();
          break;
      }
    });
}

function createTable() {
  console.log("Welcome to BAM-azon!");
  console.log("Here's what we have for sale:");
  var query =
    "SELECT item_id, product_name, department_name, stock_quantity, price FROM products";
  connection.query(query, function(err, res) {
    if (err) throw err;
    for (i = 0; i < res.length; i++) {
      console.log(
        "Item Number: " +
          res[i].item_id +
          "|| Item: " +
          res[i].product_name +
          "|| Department: " +
          res[i].department_name +
          "|| Price: $" +
          res[i].price +
          "|| Number On-Hand: " +
          res[i].stock_quantity
      );
    }
    tableOrder();
  });
}

function tableOrder() {
  inquirer
    .prompt([
      {
        name: "readyToOrder",
        type: "confirm",
        message: "Would you like to place an order?"
      }
    ])
    .then(function(answer) {
      if (answer) {
        placeOrder();
      } else {
        console.log("Ok, come back when you are ready!");
        start();
      }
    });
}

function readTable() {
  createTable();
}

function placeOrder() {
  inquirer
    .prompt([
      {
        name: "itemNumber",
        type: "input",
        message: "What would you like to buy (Item Number)?"
      },
      {
        name: "userQuantity",
        type: "input",
        message: "How many would you like?"
      }
    ])
    .then(function(answer) {
      var query =
        "SELECT product_name, price, stock_quantity FROM products WHERE ?";
      connection.query(query, { item_id: answer.itemNumber }, function(
        err,
        res
      ) {
        if (err) throw err;
        if (res[0].stock_quantity < answer.userQuantity) {
          console.log("Not enough stock!");
          start();
        } else {
          var orderTotal = res[0].price * answer.userQuantity;
          console.log(
            "Congratulations! You have purchased " +
              answer.userQuantity +
              " " +
              res[0].product_name +
              "\nYour order total is : $" +
              orderTotal
          );
          var newquantity = res[0].stock_quantity - answer.userQuantity;
          var update = "UPDATE products SET ? WHERE ?";
          connection.query(
            update,
            [{ stock_quantity: newquantity }, { item_id: answer.itemNumber }],
            function(err, res) {
              if (err) throw err;
              start();
            }
          );
        }
      });
    });
}
