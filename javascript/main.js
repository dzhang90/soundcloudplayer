/* 1. Search */

var searchValue;

var inputBar = document.querySelector("input.js-search");
var searchIcon = document.querySelector("i.js-submit");
//mainContainer = document.querySelector("div.js-container");

inputBar.addEventListener("keyup", pressEnter);
searchIcon.addEventListener("click", pressButton);


function pressEnter (e) {
	
	//13 = keycode for "enter"; if enter pressed, then...
	if (e.which === 13) {
		pressButton();
	}
}

function pressButton () {
	keyword = inputBar.value;
	//clearContainer();
	SoundCloudAPI.getTrack(keyword);
}


/* 2. Query Soundcloud API */

var SoundCloudAPI = {};

SoundCloudAPI.init = function () 
{
	SC.initialize(
	{
		client_id: "cd9be64eeb32d1741c17cb39e41d254d"
	});
}


SoundCloudAPI.getTrack = function(searchValue)
{
	// find all sounds of buskers licensed under 'creative commons share alike'
	SC.get("/tracks", {
	  	q: searchValue
	}).then(function(tracks) {
	  	console.log(tracks);
	  	SoundCloudAPI.renderTracks(tracks);
	});

}


/* 3. Display the cards */

SoundCloudAPI.renderTracks = function(tracks) 
{

	tracks.forEach(function(track) {

		//create HTML elements
		var card = document.createElement("div");
		card.classList.add("card");

		var image = document.createElement("div");
		image.classList.add("image");

		var imageImg = document.createElement("img");
		imageImg.classList.add("image_img");
		imageImg.src = track.artwork_url;

		var content = document.createElement("div");
		content.classList.add("content");

		var header = document.createElement("div");
		header.classList.add("header");

		var link = document.createElement("a");
		link.href = track.permalink_url;
		link.target ="_blank";
		link.textContent = track.title;

		var bottom = document.createElement("div");
		bottom.classList.add("ui", "bottom", "attached", "button", "js-button");
		bottom.addEventListener("click", function() {
			SoundCloudAPI.getEmbed (track.permalink_url);
		})

		var icon = document.createElement("i");
		icon.classList.add("add", "icon");

		var span = document.createElement("span");
		span.textContent = "Add to playlist";

		//place HTML elements on DOM
		var searchResults = document.querySelector(".js-search-results");
		searchResults.appendChild(card);
		
		card.appendChild(image);
		card.appendChild(content);
		card.appendChild(bottom);

		image.appendChild(imageImg);

		content.appendChild(header);
		header.appendChild(link);

		bottom.appendChild(icon);
		bottom.appendChild(span);

	});
}



/* 4. Add to playlist and play */

SoundCloudAPI.getEmbed = function(url)
{
	SC.oEmbed(url, {
	  auto_play: true
	}).then(function(embed){
	 var sideBar = document.querySelector(".js-playlist");
	 
	 var box = document.createElement("div");
	 box.innerHTML = embed.html;

	 sideBar.insertBefore(box, sideBar.firstChild)

	});
}


SoundCloudAPI.init();
//SoundCloudAPI.playTracks("a");

