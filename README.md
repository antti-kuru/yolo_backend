This is the backend of my full-stack Yolo project (https://github.com/antti-kuru/Yolo). This project enables customers to give feedback and suggest foods they would like to eat on the restauraunt. 

Feedback can be given in three buttons, good/neutral/bad and when feedback is given a table shows the responses. 

The suggestions are stored in MongoDB so the website always shows the up-to-date list of suggested foods. If the written suggested food already exists, the original suggestion's quantity is updated



Technologies used
* Node.js
* Express.js
* Render
* MongoDB

Link to the web page
https://yolo-e30q.onrender.com/    



This project has taught me extremely much on web development
- question everything, even in this extremely simple project the complexity feels very high and trying to understand what happens and in which order is hard and it needs time. 
- importance why both frontend and backend are needed
- REST API
- using database



Key problems solved
- even though I had db initialized and it worked on frontend dev environment (the list of proposals matched the db), on the web service the list wasn't the same. I checked from developers tools network tab that it fetched the proposals from the db the right way but then there was another proposals GET call where the address was the current url + /api/proposals and it fetched some old test database and overwrite the right query. The problem was not in backend but in frontend where the was two queries (in app.jsx and main.jsx) so I deleted the initial fetch call from main.jsx. 