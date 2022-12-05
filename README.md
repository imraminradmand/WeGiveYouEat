# WeGiveYouEat
![Screenshot 2022-12-03 at 2 16 00 PM](https://user-images.githubusercontent.com/69999501/205470044-12e6a2af-25be-47c3-98ec-43c33449241b.png)

### About us

Diego Anzola : [GitHub](https://github.com/danzola01)

Brandon Bodemer : [GitHub](https://github.com/bbode837)

Christian Shammas : [GitHub](https://github.com/csham420)

Ramin Radmand : [GitHub](https://github.com/imraminradmand/)

### Overview

WeGiveYouEat is aimed to reduce the amount of food that gets wasted from large gatherings by connecting leftover food with people in need. The intended audience for this application is everyone! Users will be able to make a post which they will take an image of the extra food they have left over, fill out information about what it is that they are giving out such as, portion size, dietary restrictions, good till date, their location, and their preferred pick up time. Other users will be able to view listings based on their current location and how far they are willing to travel, and other available filters. This will be a progressive web application created using typed React Native which takes advantage of the Google Maps API and cloud services provided by Google Cloud.

### UI Design
![Group 1](https://user-images.githubusercontent.com/69999501/205470976-ec232b69-afca-41e1-8cc9-17ada19cb430.svg)



### High level Design (HLD)

As part of this app's functionality there is a need for end users to connect with other users within their desired radius, the [Google Maps API](https://developers.google.com/maps/documentation/android-sdk) will be used for this. Allowing users to adjust the map to find posts closest to them so no one has to go out of their way!

As storing information is a crucial part of this project [Google Cloud MySQL](https://cloud.google.com/sql/mysql) will be used. This option has been chosen over the other possible options as a sequential database allows for a more fluid implementation of the desired outcome. Communication with the database is enabled through a REST API hosted on a [Compute Engine](https://cloud.google.com/compute#section-4) instance and [PM2](https://pm2.io/docs/runtime/overview/). [Firebase Storage](https://firebase.google.com/docs/storage) is also used to store post images, which will be retrieved on a as per need basis when displaying pins on the map, or displaying the post image on each individual post page. Authentication is another requirement that will levarge [Firebase Authentication](https://firebase.google.com/docs/auth), allowing for both email/password and third party authentication.

The diagram below shows a high level architecture of this app, and outlines what Google Cloud service will be used.

![newHLD](https://user-images.githubusercontent.com/69999501/205745962-e8db4757-905e-4c31-b06a-9a52aab6265d.png)

