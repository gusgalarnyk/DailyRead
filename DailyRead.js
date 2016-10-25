/*
Daily Read Daily Read is made by P. Augustus Galarnyk around October 2016.
For more information about the author please visit https://www.linkedin.com/in/p-augustus-galarnyk-175487108.
*/

var websites = ["http://www.reddit.com", "http://www.xkcd.com", "http://www.poorlydrawnlines.com", "http://www.explosm.net"]; //Initial values for new users.

/* 
This chunk checks to see if the user is new to the extension by calling a key they shouldn't have yet using the chrome storage API. When it returns undefined we add the default values. 
This is done largely to insure when the user opens up the settings, they have an example of what the input should look like. The added benefit of immediate functionality is just a bonus.
*/
chrome.storage.sync.get("Websites", function(al) {
	if (al.Websites == undefined) {
		SaveWebsites(websites);
	}
})

var args = new Object(); //Creates the object used later as input for the open function built into the chrome API.

//I fetch all of the various buttons and textfields and assign them simple variable names.
var obutton = document.getElementById("openButton");
var mbutton = document.getElementById("manageButton");

var site1 = document.getElementById("site1");
var site2 = document.getElementById("site2");
var site3 = document.getElementById("site3");
var site4 = document.getElementById("site4");
var site5 = document.getElementById("site5");
var site6 = document.getElementById("site6");

var plus1 = document.getElementById("plus1");
var plus2 = document.getElementById("plus2");
var plus3 = document.getElementById("plus3");
var plus4 = document.getElementById("plus4");
var plus5 = document.getElementById("plus5");
var plus6 = document.getElementById("plus6");

var minus1 = document.getElementById("minus1");
var minus2 = document.getElementById("minus2");
var minus3 = document.getElementById("minus3");
var minus4 = document.getElementById("minus4");
var minus5 = document.getElementById("minus5");
var minus6 = document.getElementById("minus6");

/* 
This function will load the websites using the key and assigning it to al; calling that same object and property and giving it to the variable name of choice.
Then for each website in the array open a tab using the chrome tabs API. The use of al as the object is intended and hopefully humorous.
*/
function OpenTabs() {
	chrome.storage.sync.get("Websites", function(al) {
		websites = al.Websites;
		for (var i = websites.length - 1; i >= 0; i--) {
			args.url = websites[i];
			chrome.tabs.create(args);
		}
	})
}

function PopupToggle() {
	document.getElementById("managerPopup").classList.toggle("show"); //Display the setting elements by toggling the .show class and by extension the visiblity characteristic.
}

function SaveWebsites(websites) {
	chrome.storage.sync.set({"Websites": websites}); //Save the websites variable to the Websites key using the chrome storage API.
}

/*
This function's title is slightly misleading. It starts by grabbing the websites as discussed before. Then based on its length assigns values to the text fields in the setting elements.
This is to insure the user, when changing the settings, doesn't misunderstand the website array and react accordingly.
*/
function LoadWebsites() {
	chrome.storage.sync.get("Websites", function(al) { //chrome.storage.sync.get(null, function (data) { console.info(data) }); This will display what is in storage.
		websites = al.Websites;
		if (websites.length > 0) {
			site1.value = websites[0];
		} else {
			site1.value = null;
			site2.value = null;
			site3.value = null;
			site4.value = null;
			site5.value = null;
			site6.value = null;
		}
		if (websites.length > 1) {
			site2.value = websites[1];
		} else {
			site2.value = null;
			site3.value = null;
			site4.value = null;
			site5.value = null;
			site6.value = null;
		}
		if (websites.length > 2) {
			site3.value = websites[2];
		} else {
			site3.value = null;
			site4.value = null;
			site5.value = null;
			site6.value = null;
		}
		if (websites.length > 3) {
			site4.value = websites[3];
		} else {
			site4.value = null;
			site5.value = null;
			site6.value = null;
		}
		if (websites.length > 4) {
			site5.value = websites[4];
		} else {
			site5.value = null;
			site6.value = null;
		}
		if (websites.length > 5) {
			site6.value = websites[5];
		} else {
			site6.value = null;
		}
	})
}

obutton.onclick = function() {
	OpenTabs(); //The biggest button, the simplest code. Getting this whole thing functional took a day, getting this pretty and fool proof took a week*. (-.-) *to clarify time estimates are exaggerated.
}

mbutton.onclick = function() {
	PopupToggle(); //Open the setting elements.
	LoadWebsites(); //Populate those setting elements accurately.
}

plus1.onclick = function() {
	if (site1.value != "") { //If their is a value worth saving...
		websites[0] = site1.value; //Change the internal array to reflect the new value...
		SaveWebsites(websites); //And sync that array. Repeat this code for each plus button.
	}
}

plus2.onclick = function() {
	if (site2.value != "") {
		websites[1] = site2.value; 
		SaveWebsites(websites);
	}
}

plus3.onclick = function() {
	if (site3.value != "") {
		websites[2] = site3.value; 
		SaveWebsites(websites);
	}
}

plus4.onclick = function() {
	if (site4.value != "") {
		websites[3] = site4.value; 
		SaveWebsites(websites);
	}
}

plus5.onclick = function() {
	if (site5.value != "") {
		websites[4] = site5.value; 
		SaveWebsites(websites);
	}
}

plus6.onclick = function() {
	if (site6.value != "") {
		websites[5] = site6.value; 
		SaveWebsites(websites);
	}
}

minus1.onclick = function () {
	if (site1.value != "") { //If there is a value worth deleting...
		websites.splice(0, 1); //Surgically extract it...
		SaveWebsites(websites); //Sync that new array...
		LoadWebsites(); //And then reflect the changes in the text fields. This isn't necessary when adding because the list will already reflect the user's changes. Repeat for remaining buttons.
	}
}

minus2.onclick = function () {
	if (site2.value != "") {
		websites.splice(1, 1);
		SaveWebsites(websites);
		LoadWebsites();
	}
}

minus3.onclick = function () {
	if (site3.value != "") {
		websites.splice(2, 1);
		SaveWebsites(websites);
		LoadWebsites();
	}
}

minus4.onclick = function () {
	if (site4.value != "") {	
		websites.splice(3, 1);
		SaveWebsites(websites);
		LoadWebsites();
	}
}

minus5.onclick = function () {
	if (site5.value != "") {	
		websites.splice(4, 1);
		SaveWebsites(websites);
		LoadWebsites();
	}
}

minus6.onclick = function () {
	if (site6.value != "") {	
		websites.splice(5, 1);
		SaveWebsites(websites);
		LoadWebsites();
	}
}