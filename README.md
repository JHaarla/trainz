# Train Schedules
-------

This seemingly simple train schedule app had a few hidden challenges that I had to overcome. The page let's any user/visitor add a train to the "schedule". There is some data validation happening to the input fields to ensure the input is useable.  This project really highlighted the diffivulties with dealing with dates and times computationally. Luckily, we learned about moment.js to help with the more complicated than expected math with dealing with dates/times. 

There is also a persistent data component. I used Firebase as a database to store all the input information so it would be accessible by anyone who visits the site - independent of the device used. 

On the visual, front-end side, I chose to use the Materialize CSS framework instead of Bootstrap. I enjoyed the challenge of learning a new framework. It also allowed me to accomplish some visual presentation styles that I had not explored in Bootstrap - parallax scrolling. Even though Materialize may not be quite as well fleshed out as bootstrap, I enjoyed working with it more and like the visual presentation better. 

**Under the Hood**

- Learn basic data validation methods
- Moment.js to handle times (and dates). Moment.js sysntax is surprisingly simple for how powerful it is. 
- Materialize CSS - exploring a new (to me) CSS framework. I enjoyed working with it and the visual style of it.
- Firebase DB for persistent data storage. All visitors see all the trains inputted through the form no matter if they have visited before or from a different device. 

*This is a homework assignment for UNCC Coding Bootcamp*

Written by Jarkko Haarla

