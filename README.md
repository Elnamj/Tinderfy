Tinderfy
=================================================

This app will let the user enter search filters and then present recommended songs based on this choice as well as what kind of music the user usually listens to. The song will be presented with a card containing title and album cover and a 30 second clip will also play. The user can either decide to add the song to a playlist by swiping to the right, or ignore the song by swiping to the left. 
For the Heroku app, we use this front-end repository and one back-end repository. The back-end repository contains files that we have gotten from the Spotify Web API page for authorization. We have changed very little in this code and it is quite unneccessary to look at when reviewing our project.

What we have done
=====================

So far, we have started implementing the basic layout of our app. We have also spent a lot of time getting the API to work. Since we are using the Spotify Web API which requires user login and authorization, it's a bit more complicated than the Spoonacular API. Right now we are doing one call to the API, which is the login-call.

What we have left to do
=====================

We have some work left with the API. Right now, we are using a hardcoded list of songs. The playlist overview page that you end up on once you're done with your playlist also uses a hardcoded list of songs. The swipe view songs should be fetched from the API, and then a playlist should be crated from the liked songs by calling the API. We also would like to implement the swipe feature in the song choosing view.

Our project file structure (short description/purpose of each file)
=====================

Images folder - contains images that are used throughout the app, i.e. our logo and the heart button

FirstPage folder - this folder contains the following files:
	FirstPage.js - this is the first page of the website and contains the Slideshow-component.
	FirstPage.css - styling of the first page (background image).

Slideshow folder - this folder contains the following folder and files:
	Images - this folder contains 9 image-files which is not used at the moment. Ignore these.
	Slideshow.js - this contains the spinning slideshow presenting 9 album covers.
	Slideshow.css - styling of the slideshow.

Presentation folder - This folder contains two files, one containing js and one with css. The js one collects the playlist from the Modul and then uses map to go through the playlist and disply each song in a container. The css-file styles the js-file with a picture and container and more.  

Swipe folder - this folder contains the following files:
	Swipe.css - styling for the swipe component
	Swipe.js - takes care of the swipe page. Initializes SwipeCard components for each song (the song is passed as a props) and adds these songs to a playlist if they are "liked" by the user. The Swipe component has different states depending on if it's loading, if the song list is empty, if it's in "regular view" (desktop + mobile) or if it's in "detail view" (mobile only). The state is also passed down through props to the SwipeCard component. Also contains a hard-coded list of songs that are used for the swipe right now, will be switched out later to an actual API call.
	
SwipeCard folder - this folder contains the following files:
	SwipeCard.css - styling for the swipe card component
	SwipeCard.js - is responsible for creating a song card containing info from the song passed as a prop from the Swipe component.

