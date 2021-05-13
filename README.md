<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<p align="center">
  <img src="https://res.cloudinary.com/musikverein/image/upload/v1619342803/logo-M2_bnwhux.svg" alt="Logo" width="150" height="150">
  <h1 align="center" >Musikverein</h1>
</p>


This project proposes a music web platform based on Spotify/SoundCloud. Developing a client-server system, employing NodeJS, Express, MongoDB, Firebase and Cloudinary for the back-end implementation, and ReactJS + Redux for the front-end.

## Start 🚀

Get a clone of the project in local.
You need to have installed nodejs and yarn in your computer to develop the proyect.

### Requirements 📋

_You need to install nodejs_

Go to [NodeJs web page](https://nodejs.org/es/) download and install the program.

_Then you have to install yarn_
```
npm install --global yarn
```

_When yoy have installed this two programs you nedd to create acounts in:_

- Firebase
- MogoDB Atlas
- Cloudinary
- Google ReCaptcha

### Instalation 🔧

_First clone the repository_

```
git clone https://github.com/Musikverein/musikverein-project.git
```

_Then run yarn install in the base folder_

```
yarn install
```

_When you have all the denpedencies intalled you need to create two .env files, one in web folder, and the other in api folder_

_The web .env file need to contain the next variables:_

```
REACT_APP_API_BASE_URL= http://localhost:4000
REACT_APP_API_KEY = Your FireBase Api key
REACT_APP_AUTH_DOMAIN = Your FireBase auth domain
REACT_APP_PROJECT_ID = Your FireBase project id
REACT_APP_STORAGE_BUCKET = Your FireBase storage bucket 
REACT_APP_MESSAGING_SENDER_ID = Your FireBase messaging sender id
REACT_APP_APP_ID = Your FireBase app id
REACT_APP_CLOUDINARY_IMG_URL = Your Cloudinary img url
REACT_APP_CLOUDINARY_PRESET_PROFILE_IMG = A Cloudinary preset to upload profile images
REACT_APP_CLOUDINARY_PRESET_SONGS = A Cloudinary preset to upload songs
REACT_APP_CLOUDINARY_PRESET_COVERS = A Cloudinary preset to upload covers images
REACT_APP_CLOUDINARY_PRESET_PLAYLIST = A Cloudinary preset to upload playlist images
REACT_APP_RECAPTCHA_WEB_KEY = Your Google ReCaptcha web key
```

_The api .env file need to contain the next variables:_

```
FB_CERT_TYPE= Your FireBase cert type
FB_CERT_PROJECT_ID= Your FireBase project id
FB_CERT_PRIVATE_KEY_ID= Your FireBase private key id
FB_CERT_PRIVATE_KEY= Your FireBase private key
FB_CERT_CLIENT_EMAIL= Your FireBase client email
FB_CERT_CLIENT_ID= Your FireBase client id 
FB_CERT_AUTH_URI= Your FireBase Auth uri
FB_CERT_TOKEN_URI= Your FireBase token uri
FB_CERT_AUTH_PROVIDER_X_509_CERT_URL= Your FireBase cert auth provider x 509 cert url
FB_CERT_CLIENT_X_509_CERT_URL= Your FireBase cert client x 509 cert url
MONGO_DB_URL_PRODUCTION= Your MongoDB Atlas connection url for producction
MONGO_DB_URL_DEVELOPMENT= Your MongoDB Atlas connection url for development
MONGO_DB_URL_TEST= Your MongoDB Atlas connection url for test
RECAPTCHA_KEY = Your Google ReCaptcha secure api key
```

## Build with 🛠️

* [NodeJS](https://nodejs.org/es/)
* [Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [ReactJs](https://es.reactjs.org/)
* [Redux](https://es.redux.js.org/)
* [FireBase](https://firebase.google.com/)
* [Cloudinary](https://cloudinary.com/)

## Contributing 🖇️

If you want to contribute, please fork the repository, create a new branch whit your contribution, and push the branch as a pull requests.

## Wiki 📖

- You can find more information of how the app works in the [TDR](./documentation/TDR.md) file.
- You can also check the full [Memory](./documentation/Memory.pdf) on PDF.
- You can also check the custom [hooks](./packages/web/src/hooks/documentation.md) file.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/vvelazquezc"><img src="https://avatars.githubusercontent.com/u/73468274?v=4?s=100" width="100px;" alt=""/><br /><sub><b>vvelazquez</b></sub></a><br /><a href="https://github.com/Musikverein/musikverein-project/commits?author=vvelazquezc" title="Code">💻</a> <a href="#design-vvelazquezc" title="Design">🎨</a> <a href="#content-vvelazquezc" title="Content">🖋</a> <a href="#ideas-vvelazquezc" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/RaulCatedra3003"><img src="https://avatars.githubusercontent.com/u/65410632?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Raúl Cátedra Martínez</b></sub></a><br /><a href="https://github.com/Musikverein/musikverein-project/commits?author=RaulCatedra3003" title="Code">💻</a> <a href="https://github.com/Musikverein/musikverein-project/commits?author=RaulCatedra3003" title="Tests">⚠️</a> <a href="#content-RaulCatedra3003" title="Content">🖋</a> <a href="#ideas-RaulCatedra3003" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/rshernan"><img src="https://avatars.githubusercontent.com/u/42167693?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ramon</b></sub></a><br /><a href="https://github.com/Musikverein/musikverein-project/commits?author=rshernan" title="Code">💻</a> <a href="https://github.com/Musikverein/musikverein-project/commits?author=rshernan" title="Tests">⚠️</a> <a href="#content-rshernan" title="Content">🖋</a> <a href="#ideas-rshernan" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/joserra-15"><img src="https://avatars.githubusercontent.com/u/72786719?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jose Ramón Serralvo Rojo</b></sub></a><br /><a href="https://github.com/Musikverein/musikverein-project/commits?author=joserra-15" title="Code">💻</a> <a href="https://github.com/Musikverein/musikverein-project/commits?author=joserra-15" title="Tests">⚠️</a> <a href="#content-joserra-15 " title="Content">🖋</a> <a href="#ideas-joserra-15" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
