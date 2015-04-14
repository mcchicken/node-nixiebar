# node-nixiebar
![build status](https://travis-ci.org/mcchicken/node-nixiebar.svg?branch=master)[![Coverage Status](https://coveralls.io/repos/mcchicken/node-nixiebar/badge.svg?branch=master)](https://coveralls.io/r/mcchicken/node-nixiebar?branch=master)

As an avid craft beer drinker, I had a bar installed in my basement.  I check in 
the beers I consume using an application called Untappd (http://untappd.com).  I
decided to have the number of unique check-ins displayed somewhere on the bar.  
I came across a kickstarter project 
(https://www.kickstarter.com/projects/36162341/raspberry-pi-nixie-tube-driver/).  
I backed this project and I am still waiting to receive the unit.  Once I have
the board and python driver, I will port it to node and complete this project.  
The basic use is to poll Untappd for the number of unique beer check-ins for a 
given user(s) and then to display that number on the nixie tubes.


## Usage Instructions

First, an Untappd API application must be accepted.  This can be done by going 
to https://untappd.com/api/register?register=new and requesting one.  The client
ID and client secret can be obtained from the dashboard after Untappd accepts 
the application.  Both of these pieces of information are required to use the 
node-nixiebar application.

Second, node must be installed on a raspberry pi.  Instructions for this can be
found at https://learn.adafruit.com/node-embedded-development/installing-node-dot-js.  
node-nixiebar was tested against version v0.12.0.

Once the hardware and environment are set up, run the following command to start 
up the application (on port 8080): 
<I>node [PATH_TO_APP]/lib/node-nixiebar.js [CLIENT_ID] [CLIENT_SECRET]</I> 

Start the polling of Untappd data by making a POST request to <I>/jobs/nixiebar</I>.
The same request is used to stop the polling of Untappd data if necessary.  The 
interval is set to 1 minute.

Add a user whose data you want displayed on the nixie tubes by making a PUT request
to <I>/users/:username</I>.  The username is the username of the person on Untappd.  
If more information beyond unique check-ins is desired, OAuth is currently not 
supported.  Please consult the Untappd API explorer to determine what information
requires an authorized token.