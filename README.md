
# Topos Intern Challenge - Nicolas Shak

Completed front end assignment

## How to run

I've hosted the app on aws s3 and it can be accessed at: http://topos-intern-challenge.s3-website-us-east-1.amazonaws.com/

To run the app locally, clone the repository and run `npm install` inside the folder. Then you can run `npm start` to start the local server. The app can then be accessed by navigating to `localhost:3000`

## Commentary

**Why trees?**
I felt that it was important to choose a topic that a. wasn't painfully dull and b. wasn't *too* random. I was between using the 1995 tree census ([https://data.cityofnewyork.us/Environment/1995-Street-Tree-Census/tn4g-ski5](https://data.cityofnewyork.us/Environment/1995-Street-Tree-Census/tn4g-ski5)) and using the Yelp API to compare types of restaurants per zip code. In the end, I decided to go with the trees, mainly because the Yelp API didn't return results in a definite area.

**Mobile shortcomings**
Because of the nature of the React library I used for the map (react-simple-maps), I wasn't able to add any sort of zoom controls. Although I did my best to accommodate mobile layouts, the map would just be difficult to use as is (not to mention that the scale is too large on mobile). I did try to use other Google Maps and Leaflet to remedy this, but it just took too long to load the zip code boundaries since Geojson is relatively big compared to Topojson. 
