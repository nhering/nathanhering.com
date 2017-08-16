var subTotal = [0,0,0,0,0,0];

function UpdateSize() {
	var i = document.querySelector('input[name="size"]:checked').value;
	var sizePrice = [6,10,14,16];
	var sizeOrdered = ["Personal","Medium","Large","Extra Large"];
	document.getElementById("size").innerHTML = "$" + sizePrice[i] + " - " + sizeOrdered[i];
	subTotal[0] = sizePrice[i];
	UpdateTotal();
};
function UpdateCrust() {
	var i = document.querySelector('input[name="crust"]:checked').value;
	var crustPrice = [0,0,3,0,0];
	var crustOrdered = ["Plain","Garlic","Cheese Stuffed","Spicy","House Special"];
	document.getElementById("crust").innerHTML = "$" + crustPrice[i] + " - " + crustOrdered[i] + " Crust";
	subTotal[1] = crustPrice[i];
	UpdateTotal();
};
function UpdateSauce() {
	var i = document.querySelector('input[name="sauce"]:checked').value;
	var saucePrice = [0,0,0];
	var sauceOrdered = ["Marinara","White","No"];
	document.getElementById("sauce").innerHTML = "$" + saucePrice[i] + " - " + sauceOrdered[i] + " Sauce";
	subTotal[2] = saucePrice[i];
	UpdateTotal();
};
function UpdateCheese() {
	var i = document.querySelector('input[name="cheese"]:checked').value;
	var cheesePrice = [0,3,0];
	var cheeseOrdered = ["Regular","Extra","No"];
	document.getElementById("cheese").innerHTML = "$" + cheesePrice[i] + " - " + cheeseOrdered[i] + " Cheese";
	subTotal[3] = cheesePrice[i];
	UpdateTotal();
};
function UpdateVeggies() {
	var veggiesOrdered = [];
	
	if(document.getElementById("to").checked == true){
		veggiesOrdered.push(" Tomato");
	}
	if(document.getElementById("on").checked == true){
		veggiesOrdered.push(" Onion");
	}
	if(document.getElementById("ol").checked == true){
		veggiesOrdered.push(" Olives");
	}
	if(document.getElementById("gp").checked == true){
		veggiesOrdered.push(" Green Peppers");
	}
	if(document.getElementById("mu").checked == true){
		veggiesOrdered.push(" Mushrooms");
	}
	if(document.getElementById("pi").checked == true){
		veggiesOrdered.push(" Pineapple");
	}
	if(document.getElementById("sp").checked == true){
		veggiesOrdered.push(" Spinach");
	}
	if(document.getElementById("ja").checked == true){
		veggiesOrdered.push(" Jalapeno");
	}
	if(veggiesOrdered.length == 0) {
		subTotal[4] = 0;
		} else {
		subTotal[4] = (veggiesOrdered.length - 1);
		document.getElementById("veggiesPrice").innerHTML = "$" + (veggiesOrdered.length - 1) + " - " + (veggiesOrdered);
		}
	UpdateTotal();
}
function UpdateMeat() {
	var meatArray = [];
	
	if(document.getElementById("pe").checked == true){
		meatArray.push(" Pepperoni");
	}
	if(document.getElementById("sa").checked == true){
		meatArray.push(" Sausage");
	}
	if(document.getElementById("cb").checked == true){
		meatArray.push(" Canadian Bacon");
	}
	if(document.getElementById("gb").checked == true){
		meatArray.push(" Ground Beef");
	}
	if(document.getElementById("an").checked == true){
		meatArray.push(" Anchovy");
	}
	if(document.getElementById("ch").checked == true){
		meatArray.push(" Chicken");
	}
	if(meatArray.length == 0) {
		subTotal[5] = 0;
		} else {
		subTotal[5] = (meatArray.length - 1);
		document.getElementById("meatPrice").innerHTML = "$" + (meatArray.length - 1) + " - " + (meatArray);
		}
	UpdateTotal();
}
function UpdateTotal() {
	var total = 0;
	for (i = 0; i < subTotal.length; i++) {
		total = (total + parseInt(subTotal[i]));
	}
	document.getElementById("total").innerHTML = "TOTAL - - $" + (total);
}