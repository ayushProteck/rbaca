# Commands for working with Expo

## For create an expo app
> npx create-expo-app _App / project name_

## For starting metro bundler
> **npm start** or **npx expo start**

## Checks your project for common issues and suggests fixes
> npx expo doctor

## For showing connected devices in android
> Press shift + a

## For showing connected devices in ios
> Press shift + i

# For developing app locally 
> npx expo prebuild
### --> This makes it to setup android and ios file locally for the project.
# Setting up eas for create app builds with eas

## Installing eas-cli
> npm install -g eas-cli

## Logging in eas
### User login with expo account in eas
> eas login

## For checking current user logged in
> npx expo whoami

## For creating build 
### We need to configur our project first
> eas build:configure
### it creates an eas.json file in your project
### copy this eas file for creating builds locally
```
// /eas.json
{
  "cli": {
    "version": ">= 16.26.0",
    "appVersionSource": "remote"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      },
      "ios": {
        "simulator": false
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

## For building android application for production locally
> eas build --platform android --profile production --local

## For building android application for developement locally
> eas build --platform android --profile developement --local

## Submits your built app to app stores
> npx eas submit

## Deploys over-the-air updates to your app
> npx eas update