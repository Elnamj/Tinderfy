Tinderfy
=================================================

This app will let the user enter search filters and then present recommended songs based on this choice as well as what kind of music the user usually listens to. The song will be presented with a card containing title and album cover and a 30 second clip will also play. The user can either decide to add the song to a playlist by swiping to the right, or ignore the song by swiping to the left. 

What we have done
=====================

So far, we have started implementing the basic layout of our app. We have also spent a lot of time getting the API to work. Since we are using the Spotify Web API which requires user login and authorization, it's a bit more complicated than the Spoonacular API. Right now we are doing one call to the API, which is the login-call.

What we have left to do
=====================

We have some work left with the API. Right now, we are using a hardcoded list of songs. The playlist overview page that you end up on once you're done with your playlist also uses a hardcoded list of songs. The swipe view songs should be fetched from the API, and then a playlist should be crated from the liked songs by calling the API. We also would like to implement the swipe feature in the song choosing view.

Our project file structure (short description/purpose of each file)
=====================
Auth-server folder - Contains authorization code provided by Spotify.

Swipe folder - This folder contains
....
