# Computer Graphics (CS4300) Final Project - Fall 2012

This project uses JavaScript, the jQuery library, the RaphaelJS library (http://raphaeljs.com/), and artwork by Niklas Jansson of Android Arts (http://androidarts.com/).

Refer to the user_manual.pdf for gameplay instructions.

This was my first forray into object-oriented JS and I learned a lot doing it.

One of the more complicated features of my project involved the firing of lasers. When they fire, they're given an origin and an offset destination. I needed them to be a specified length and go a specified speed no matter what direction they were traveling in. I created an equation based on the Pythagorean theorem to find the horizontal and vertical speed based on the given destination and speed, in addition to calculating the start and end points of the path based on the length.

## KNOWN BUGS

I'm not sure if it's just a browser issue or if my computer was just slowed down a bit but sometimes, when the page loads, the framerate is way below what it should be. Refreshing fixes this.

Leaving the window or tab and coming back while the game is running results in a build-up of content. None of the rendering or updating occurs but all of the processes seem to continue running.

I made this project before I knew about RAF and the like. This was likely the cause of these issues.

One final issue. If a laser sound is playing when the mute button is hit, that laser sound will not be muted for the rest of the session within that same window, no matter what the mute status is. Couldn't quite figure out why.