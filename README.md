# Meerkat

### Reasons for building

These past two weeks i've been working on making the invisible, visible. At any second in modern times countless packets of information are being transmitted all around you and even through you. As someone who is quite interested in the universe information I sought to better understand these mysterious bits of information floating all round. Hence meerkat was created. A set of tools that will help you decode and map network packets. I've also included a deathenticator to kick a device from it's network; for testing purposes; **I am not responsible for how you choose to use this**.

### Notes from building

I original was just playing around with a node backend but being the kind of person I am; I built a GUI for it and introduced electron. This led to me eventually refactoring it from basic html into a react app as i've grown quite comfortable with it's ecosystem. Having said all of this; most of my pain points from this project would have been mitigated if I were to have started from a Electron-React boilerplate that the community has already been kinda enough to provide. As this tech stack is used at companies like Microsoft for VS Code and Spotify for it's desktop apps.

After tweaking the package.json file I had a nice development environment to work in which allowed for modularity in my code and a seamless api from the react frontend to the node backend running on that persons device. This is a slightly different architecture as most backends run on a VPS and not on the clients device. The advantage of this is I was able to write commands for users devices with node instead of a lower level programming language like C++ or Java.

### Pain-points

Most of my issues came from packaging the application. I used the electron-builder package as the official Electron documents suggested. For some reason it did not like how I was bundling some utility scripts and I ended up just copying the functions into the main file instead of adding webpack. I also was originally loading the frontend from a local file; but refactored it to now auto update when I push a new version to github. This is a cleaner and more elegant solution as previously if an update were to be made I would have to rebuild the packages for every operating system and then the user would have to download them again. In doing it my way this will only be the case when making functional changes to either the electron portion or the node portion; allowing the frontend to updated whenever and however I please.
