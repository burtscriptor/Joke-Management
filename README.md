# Joke Management

Access to [Joke Management](https://joke-management-84fa45efb63e.herokuapp.com/)

<img width="1280" alt="Joke mgmt" src="https://github.com/user-attachments/assets/da2f8c6a-c017-4267-a5af-97e78c8c039a">

## Purpose

The joke management system was a challenge given to me in my very first technical interview, it was a live coding session. Time limit was 40 minutes and I think I completed 20% of the solution. It was done in JavaScript using the create-react-app library. The day after the interview I completed the solution, I believe it took me 12 hours to finish including CSS.

<img width="803" alt="joke mg" src="https://github.com/user-attachments/assets/cabfec67-de92-4a6e-85e9-a21ae00a90d8">


## Learnings

A lot of the challenge was new to me, for example having a next and previous button to scroll through elements in array that were displayed to the user, was something I had not done before. Having a button that toggled between a favourite list and a list that displayed all jokes was also new. 

This challenge really helped me to understand how important DRY coding is. My first iteration was like an ocean and there was a lot to be improved upon. It took me sometime to work out how to make the code drier. It boiled down to keeping track of the currentIndex of the joke I was displaying/ editing/ deleting. And also using an ojbect with two properties both arrays, rather then using two separate pieces of state i.e arrayJokes, arrayFavourites, to store the jokes. Keeping track of the currentIndex meant I could pass the currentIndex into different functions such as the next button or the edit function or delete function etc. I toggled booleans to show a favoruites list or a view all list.

In terms of CSS
I got my head around the properties position: absolute;, position: relative; and the z-index to display the edit joke form to the user in the center of the screen in front of the rest of the application.

I also disabled buttons, for example a small icon appears and the previous button is unclickable when you viewing the first joke. 

## Next iteration
Improvements to the edit from layout.
You can still toggle the 'View all jokes'/'View favourite jokes' button even if there are no favourites. 
It would be nice to be able to press the 'next' button when you are viewing the last joke in order to fetch a new joke from the API.
