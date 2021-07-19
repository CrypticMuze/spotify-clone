<p align="center">
<img src="https://github.com/CrypticMuze/netflix-clone/blob/master/netflix-clone/public/netflixlogo.png" alt="SpotifyLogo" height=200px width=200px/>
</p>

# Spotify Clone

## About the Project

  This repo contains the output files for the Spotify Clone with respect to the [React JS Tutorial for Beginners](https://www.youtube.com/watch?v=-cMqr9HpZ-Y). All credits go to [CleverPrograamer YT Channel](https://www.youtube.com/channel/UCqrILQNl5Ed9Dz6CGMyvMTQ)

## Live Demonstartion of the Project

  LIVE Demonstration: [Click Here](https://spotify-clone-19062000.web.app/)

## Installation/Personal Integration

1. Clone repo on your local system

```bash
git clone https://github.com/CrypticMuze/spotify-clone.git
```
2. Open a terminal on your localhost and install the dependencies

```bash
npm install
```
3. Go to Spotify's Developers Portal and login to your dashboard

```
https://developer.spotify.com/dashboard/
```
4. On your dashboard create a new application and provide necessary details. Next open project overview.

5. Under edit settings, provide the redirect URL of the site after spotify authorizes the user. Ususlly this is the URL of the hosted site (Netlify/Firebase). You can enter http://localhost:3000/ initially as it is the local server of the react application.

6. Now copy the Client ID provided on the dasboard.

```
Goto spotify-clone\src\spotify.js
```
```bash
#In the spotify.js file (line 5) make the following changes to the file -->
const clientId = ""; # Add your personal Client ID key here
```
7. Open a terminal on your localhost and build the React app.

```bash
npm build
```

8. Deploy the production build of the app in the same terminal.
```bash
npm run build
```
You're good to go! HealthHub should open on the live server.

## Want to Contribute?
To contribute to this project:
1. Fork this repo
2. Make desired changes after cloning it on your local system.
3. Generate a pull request.

Note: Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please make sure to update tests as appropriate.

## Connect with the Me
1. Aman Anand - [LinkedIN](https://www.linkedin.com/in/amanxanand/) || [GitHub](https://github.com/aman-anand1906) || [Instagram](https://www.instagram.com/aman_anand_619/")

