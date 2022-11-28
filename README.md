# WeGiveYouEat

### About us

Diego Anzola : [GitHub](https://github.com/danzola01)

Brandon Bodemer : [GitHub](https://github.com/bbode837)

Christian Shammas : [GitHub](https://github.com/csham420)

Ramin Radmand : [GitHub](https://github.com/imraminradmand/)

### Overview

WeGiveYouEat is aimed to reduce the amount of food that gets wasted from large gatherings by connecting leftover food with people in need. The intended audience for this application is everyone! Users will be able to make a post which they will take an image of the extra food they have left over, fill out information about what it is that they are giving out such as, portion size, dietary restrictions, good till date, their location, and their preferred pick up time. Other users will be able to view listings based on their current location and how far they are willing to travel, and other available filters. This will be a progressive web application created using typed React Native which takes advantage of the Google Maps API and cloud services provided by Google Cloud.

### Figma Prototype

<figure><img src=".gitbook/assets/Screen Shot 2022-09-28 at 6.41.22 PM.png" alt=""><figcaption></figcaption></figure>

### High level Design (HLD)

As part of this app's functionality there is a need for end users to connect with other users within their desired radius, the [Google Maps API](https://developers.google.com/maps/documentation/android-sdk) will be used for this. Allowing users to adjust the map to find posts closest to them so no one has to go out of their way!

As storing information is a crucial part of this project [Google Cloud MySQL](https://cloud.google.com/sql/mysql) will be used. This option has been chosen over the other possible options as a sequential database allows for a more fluid implementation of the desired outcome. Communication with the database is enabled through a REST API hosted on a [Compute Engine](https://cloud.google.com/compute#section-4) instance and [PM2](https://pm2.io/docs/runtime/overview/). As authentication is another requirement, [Firebase Authentication](https://firebase.google.com/docs/auth) will be used. 

The diagram below shows a high level architecture of this app, and outlines what Google Cloud service will be used.

![Screenshot 2022-11-27 at 9 06 29 PM](https://user-images.githubusercontent.com/69999501/204191991-58e40085-38b4-40ba-9062-75d1f75cc7f1.png)
