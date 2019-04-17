Tinderfy
=================================================

This app will let the user login to their own Spotify account before entering search filters and then it will present recommended songs based on this choice as well as what kind of music the user usually listens to. The song will be presented with a card containing title, artists, album name,  album cover, release date and a 30 second clip will also play if there is a preview available (Spotify Premium users will have access to more previews than the basic users).  The user can either decide to add the song to a playlist by swiping to the right, or ignore the song by swiping to the left. (These choices can also be made by clicking the heart/cross.) When the user is satisfied with their new playlist, they are able to save it to their Spotify account. 

For the Heroku app, we use this front-end repository and one back-end repository. The back-end repository contains files that we have gotten from the Spotify Web API page for authorization. We have changed very little in this code and it is quite unneccessary to look at when reviewing our project.

Where to check it out
=================================================

Visit tinderfy.herokuapp.com on Google Chrome or Firefox to check out the app. Please do not switch from desktop to phone in midst of using the app. 

Our project file structure
=================================================

Images folder - contains images that are used throughout the app, i.e. our logo and the heart button

FirstPage folder - this folder contains the following files:
	FirstPage.js - this is the first page of the website and contains the Slideshow-component as well as Welcome-component.
	FirstPage.css - styling of the first page (background animation), this also overrides other css-files so the background animation is shown on every page. 

Slideshow folder - this folder contains the following folder and files:
	Images - this folder contains 9 images.
	Slideshow.js - this contains the spinning slideshow presenting 9 album covers.
	Slideshow.css - styling of the slideshow.
	
Welcome folder - this folder contains the following folder and files:
	Welcome.js - contains a component with two buttons. One that redirects the user to Spotify's login, and the other links to a guide.
	Welcome.css - styling of the buttons. This css overrides other css-files so the buttons' animations are shown on every page.
	
Guide folder - this folder contains the following files:
	Guide.js - this is similar to the first page, but are showing instructions on how to use Tinderfy as well as the GuideButtons-component.
	Guide.css - empty. Could delete this, lol.

GuideButtons folder - this folder containts the following files:
	GuideButtons.js - similar to the Welcome-component, but there is a back-button which is linking back to the first page.
	GuideButtons.css - empty. Could delete this, lol.
	


Presentation folder - This folder contains two files, one containing js and one with css. The js one collects the playlist from the Modul and then uses map to go through the playlist and disply each song in a container. The css-file styles the js-file with a picture and container and more.  

Filter folder - this folder contains the following  two files: Filter.css for styling and Filter.js. In Filter.js a form is created so that the user can search and filter tracks. The user writes the name of the playlist that will be created and can thereafter select genres/moods and search for an artist. To be able to click on the button "start" the user must fill in a name for the playlist and at least one of the genre/mood and artist options. When clicking on the ”start” button the user will end up on the swipe page with songs that match the users chosen filter. 

Swipe folder - this folder contains the following files:
	<br/>Swipe.css - styling for the swipe component
	<br/>Swipe.js - takes care of the swipe page. Initializes SwipeCard components for each song (the song is passed as a props) and adds these songs to a playlist if they are "liked" by the user. The Swipe component has different states depending on if it's loading, if the song list is empty, if it's in "regular view" (desktop + mobile) or if it's in "detail view" (mobile only). The state is also passed down through props to the SwipeCard component. Also contains a hard-coded list of songs that are used for the swipe right now, will be switched out later to an actual API call.
	
SwipeCard folder - this folder contains the following files:
	<br/>SwipeCard.css - styling for the swipe card component
	<br/>SwipeCard.js - is responsible for creating a song card containing info from the song passed as a prop from the Swipe component.

