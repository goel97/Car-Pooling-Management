Carpool-Management-System
===

Car-Pooling Management System (CMS) is intended to help the user to share car rides with other users traveling on the same route. The user may intend to share his car or else ride with another user who is willing to share.

The carpooling software is designed and developed in Django framework using GoogleMaps API.

CMS is aimed toward a person who is a frequent traveller and is looking for cheap and comfortable mode of transport. It will prove beneficial for office commuters who are headed on a common route and are willing to share the travel cost. Anyone can opt to provide a drive, thus reducing his/her expense. 



:::info
Github Repo: **[Carpool-Management-System](https://github.com/goel97/Car-Pooling-Management)**
:::
## Table of Contents

[TOC]

## Setup
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See getting started for notes on how to deploy the project on a live system.

### Prerequisites
You need to install:
1. [Python 3.6 or above](https://www.python.org/downloads/)
2. [Django 3.0 or above](https://docs.djangoproject.com/en/3.0/intro/install/)
3. [GoogleMaps API](https://developers.google.com/maps/documentation)


---
### Getting Started

Once django is installed, all you need to do is clone this repository.

```bash
$ git clone https://github.com/goel97/Car-Pooling-Management.git
```

After this, enter the following commands to run the webserver:
```bash
$ python manage.py migrate
$ python manage.py runserver
```


---
## Technologies Used

### Django Framework

Django is a Python-based free and open-source web framework, which follows the model-template-view architectural pattern.

### Google APIs Used
* **Directions API** - It is used to display route between two points. Route similarity is inferred based on this to broadcast ride request to specific drivers.
* **Distance Matrix API** - It is used to get distance between two points. This is used to decide fare of ride.
*  **Geocoding API** - It is used to convert a place name(For eg: Central Park, New York) to its corresponding coordinates(latitude and longitude). 
*  **Maps JavaScript API** - The API is used to make calls to different APIs using JavaScript.
*  **Places API** - The API is used to get suggestions of places when user types a string.

### Jquery

jQuery is a JavaScript library designed to simplify HTML DOM tree traversal and manipulation, as well as event handling, CSS animation, and Ajax. 

### Javascript

JavaScript, often abbreviated as JS, is a programming language that conforms to the ECMAScript specification. JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.

### Bootstrap

Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS- and JavaScript-based design templates for typography, forms, buttons, navigation, and other interface components.

### Python

Python is an interpreted, high-level, general-purpose programming language.

### Python Google Maps API

The API is used to make calls to different APIs using Python.

---
## Functionality

There are two cateogories of users: 
* **Driver** - A user who wants to share his ride with other people along the same route or is a full-time driver.

* **Rider** - A user(other than driver) sharing a ride. He can book in realtime and will be assigned a driver from the pool of drivers available.

### User Authentication
```gherkin=

Feature: Login

    A user who already has an account
    authenticates to use the service
    
Feature: Password Incorrect

Feature: Update Password

    Allow user to update password incase he/she 
    has forgotton the password.

Feature: Register

    First time user can register and then continue
    to use the service
    
Feature: Userid Already Exists

    Checks if user with userId already exists 
    while registeration 

Feature: Select your choice

    Depending on your need, you can either book a
    ride or opt for drive

```
---
### Driver Functionality

```gherkin=

Feature: Opt to Ride

    As a driver, we enter the destination details.
    The google places API is used to show a list of
    suggestions of places that may be chosen as
    destination. Thereafter are directed to driver
    dashboard, where we have the following features:
    
    Feature: Seating Capacity
    
        Shows the number od seats currently
        available
    
    Feature: Number of Ride Request
    
        Shows the number of ride requestes pending
        currenty
    
    Feature: Seating Capacity Full
    
        If the seating capacity is full driver
        can't accept more rides
    
    Feature: Ride Requests Cards
    
        The driver dashbaord shows the ride
        request cards, which get updated
        dynamically on our application whenever a
        new rides comes and are removed
        dynamically if driver accepts the ride
    
    Feature: Accept a Ride
    
        Driver receives notification with the
        location of the rider to accept his
        request.
    
    Feature: Accepted Rides Cards
    
        The driver dashbaord shows the accepted
        ride cards, which get updated
        dynamically on our application whenever
        driver accepts a ride and are removed
        dynamically if driver ends the ride
        
    Feature: End a Ride
    
        Once a rider has reached his destination,
        the Driver will end his ride and collect
        displayed fare.
    
    Feature: Calculate and Display Payment
    
        Depending on the cost computing algorithm,
        the payment will be displayed at the end
        of ride. The geocoding API is used to get
        coordinates. Distance Matrix API is used
        to get distance between two point. The
        cost is a combination of base price and
        distance travelled.
```
---
### Rider Functionality
```gherkin=
Feature: Live Car-Pooling

    Real-Time reuesting to share a ride with near
    by users (drivers)
  
    Feature: Create Request
    
        The Rider will give his location and the
        place of destination.
        
    Feature: Show route to Pickup Point
    
        While rider request is being processed,
        the Rider will be shown the route to his
        pickup point
    
    Feature: Ride Details
    
        Once ride is accepted, the details of the
        rides are updated dynamically and show in 
        form of cards 
        
    Feature: Estimated Fare
    
        The estimated payment details are shown to
        rider once his ride has been accepted.
        
    Feature: Collect Feedback
    
        Driver rating are collected once the ride
        ends.
    
    Feature: Ride Status and Fare
    
        Ride status is updated and final fare is 
        shown once ride ends.
```
---

## Low level Module Description
### User
```gherkin=

Function: index()

    Directs you to login page

Function: drive_or_ride()

    Directs you to a html page where you can
    choose either to drive or ride

Function: register()

    Directs you to a html page where you can fill
    the registration details

Function: forget()

    Set a new password in case old one is lost

Function: validateForm()

    Validates Form data
    
Function: addUser()

    Adds user to database after validity check.

Function: verifyUser()

    Checks for correct login credentials
```
---
### Rider 
```gherkin=

Function: rideInfo()

    It collect pickup and destination from rider
    to be storedfor a later broadcast to 
    appropriate driver
    
Function showDriverInfo()

    It communicates to the rider UI the driver
    details who accept the ride request.   

Function rideSuccessful()

    It executes the necessary backend operations 
    after ride completion.
```
---

### Driver
```gherkin=

Function: index() 
    Directs you to home page of Driver

Function: driverInfo()
    Directs you to the page where rider
    information is displayed.

Function: searchRider()
    Hits the database for potential riders to be
    displayed after a specific interval.

Function: acceptRide()
    Changes the ride status and updates the
    database once a ride is accepted.

Function: endRide()
    Marks the ride as complete and updates the
    database once a ride is ended.

```

---
## Software Architecture

The CMS developed here is a web application. It has three layers.
* The most external of them is the View Layer, which is the visible part of the application, the one that interacts with the user. 
* The layer in the middle is the Business Logic Layer, which serves as an intermediate between the View (or presentation) and the innermost layer, which is the Data Layer. 
* The Data Layer one is where all the data used by the application is stored. 


![Arhcitecture](https://i.imgur.com/NYTazpo.png)

---


## Software Data Flow Diagram

This is the overall data flow diagram of the Car-pool. 
* It starts with the UserId and Password being accepted as input for authentication after validating them. The user data then flows to a Drive/Ride option.
* If the driver is chosen, there is flow to form validation. Once the drive data is obtained, we pass to Ride accept/reject. 
* On the rider side, the user data is flown to book Ride followed by intervention of Map api usage (to get location/pickup details). 
* The interaction between (Ride Accept/Reject) and (Ride Processing) decides the final Ride followed by payment.


---

![DFD](https://i.imgur.com/VVbBDVu.jpg)



---

![Factoring-Input.jpg](https://i.imgur.com/iERts5Q.jpg)



---


![First-Level-Factoring.jpg](https://i.imgur.com/FJntwcp.jpg)



---

![Factoring_ride_processing(FACTORING-CENTRAL-TRANSFORM).jpg](https://i.imgur.com/gd1L3Kz.jpg)

---

## Authors

* [Abhishek Pawar](https://github.com/thehiddencoder)
* [Siddharth Goel](https://github.com/goel97)
* [Saahil Sirowa](https://github.com/ssirowa14)
* [Siddharth Shrivastava](https://github.com/sid20071997)

---
## Appendix and FAQ

:::info
**Find this document incomplete?** Leave a comment!
:::
