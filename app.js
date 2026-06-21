
let cart = [];

function add(name, price){
cart.push({name, price});
render();
}

function render(){
let html = "";
let total = 0;

cart.forEach(i=>{
html += i.name + " - " + i.price + "<br>";
total += i.price;
});

document.getElementById("cart").innerHTML = html + "<br><b>Total: "+total+"</b>";
}

function placeOrder(){
let tableNo = document.getElementById("tableNo").value;

if(!tableNo){
alert("Enter table number");
return;
}

db.ref("orders").push({
tableNo: tableNo,
items: cart,
status: "pending",
time: new Date().toLocaleString(),
total: cart.reduce((a,b)=>a+b.price,0)
});

alert("Order Placed!");

cart = [];
render();
}
