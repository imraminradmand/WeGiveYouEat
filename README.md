# WeGiveYouEat

### About us

Diego Anzola : [GitHub](https://github.com/danzola01)

Brandon Bodemer : [GitHub](https://github.com/bbode837)

Christian Shammas : [GitHub](https://github.com/csham420)

Ramin Radmand : [GitHub](https://github.com/imraminradmand/)

### Overview

WeGiveYouEat is aimed to reduce the amount of food that gets wasted from large gatherings by connecting leftover food with people in need. The intended audience for this application is everyone! Users will be able to make a post which they will take an image of the extra food they have left over, fill out information about what it is that they are giving out such as, portion size, dietary restrictions, good till date, their location, and their preferred pick up time. Other users will be able to view listings based on their current location and how far they are willing to travel, and other available filters. This will be an Android application created using Java which takes advantage of the Google Maps API and cloud services provided by Google Cloud.

### Figma Prototype

<figure><img src=".gitbook/assets/Screen Shot 2022-09-28 at 6.41.22 PM.png" alt=""><figcaption></figcaption></figure>

### High level Design (HLD)

As part of this app's functionality there is a need for end users to connect with other users within their desired radius, the [Google Maps API](https://developers.google.com/maps/documentation/android-sdk) will be used for this. Allowing users to set a desired radius and search for items within it, ensuring that the no one has to go out of their way!

As storing information is a crucial part of this project [Google Cloud Firestore](https://cloud.google.com/firestore#section-4) will be used. This option has been chosen as Firestore is a NoSQL database which will reduce overhead and allow for easier and more fluid implementation. As users create posts for items relevant data such as, images, location, time to pick up, good for time limit, dietary restrictions, amount and any other fields that are deemed necessary.

The diagram below shows a high level architecture of this app, and outlines what Google Cloud service will be used.

<figure><img src=".gitbook/assets/Screen Shot 2022-10-19 at 8.30.18 PM.png" alt=""><figcaption></figcaption></figure>
