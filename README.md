Frontend Tech Stack:
- React Native Framework

Frontend Languages:
- TypeScript

Configuration Details:
- JWT Authentication done in backend and passed to frontend

UI Design Wireframes:
(Link to Figma File)[https://www.figma.com/file/bc5WIssEdffCkTHu3JEA5i/Project-4--SEI?node-id=7%3A607&t=DXFglhqtHf0Qn2rS-1]

Tutorials Consulted:
(Learn TypeScript – The Ultimate Beginners Guide)[https://www.freecodecamp.org/news/learn-typescript-beginners-guide/]
(React Typescript Tutorial – Ben Awad)[https://www.https://www.youtube.com/watch?v=Z5iWr6Srsj8]
(Creating a Minimal Expo React Native Project with TypeScript and Jest)[https://levelup.gitconnected.com/creating-a-minimal-expo-react-native-project-with-typescript-and-jest-5979ab8d7c15]
(Getting Started with React Navigation v6 and TypeScript in React Native By Aman Mittal)[https://blog.jscrambler.com/getting-started-with-react-navigation-v6-and-typescript-in-react-native]
--> Creating initial pages, navigation, and bottom nav bar
()[http://www.developerslearnit.com/2022/08/react-native-typescript-building-react.html]
--> Basic Login and Signup Screens with TailwindCSS
--> FRONTEND ONLY
(React Native Authentication Flow, the Simplest and Most Efficient Way By Lucas Garcez - Medium)[https://levelup.gitconnected.com/react-native-authentication-flow-the-simplest-and-most-efficient-way-3aa13e80af61]
--> WITH BACKEND
--> Complete Authentication Flow: Separated responsibilities, persistence and API connection 
(Header buttons: React Navigation)[https://reactnavigation.org/docs/header-buttons/]
--> Button added to header of Guests Screen which leads to Modal through Browse or Guestlist Page

Development:
Used Ngrok to create https// addresses for API
Formik used for form validation and submission 

Lessons:
1. Start with one file and then separate
2. Make all in one file and work and then separate them into modules 
3. javascript debugger keyword YouTube Video
4. Format the code better and do indentations in order to make the code clearer and easier to debug

Re-render on Screen Change: Expert from ()[https://reactnavigation.org/docs/function-after-focusing-screen/]
---
Triggering an action with a 'focus' event listener​
We can also listen to the 'focus' event with an event listener. After setting up an event listener, we must also stop listening to the event when the screen is unmounted.

With this approach, we will only be able to call an action when the screen focuses. This is useful for performing an action such as logging the screen view for analytics.

Example:

```
import * as React from 'react';
import { View } from 'react-native';

function ProfileScreen({ navigation }) {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return <View />;
}
```
See the navigation events guide for more details on the event listener API.

In most cases, it's recommended to use the useFocusEffect hook instead of adding the listener manually. See below for details.
---

Tools
'Quick Database Diagrams' could be used for Data Structure

Netflix Movies JSON File
https://www.whats-on-netflix.com/wp-content/plugins/whats-on-netflix/json/movie.json
--> Third party compilation of Netflix movies7

### Role Differentiation
All User Role Differentiation 
= Done through `getRole()` functions made in `roleService`

Locations used:
1. BrowseScreen 
3. GuestlistScreen 

--> Which are connected to `'/api/user/v1/profile/${authUserId}/'`
--> When this API is called, the backend checks if the user has a party whose first entry is more than 12 hours later than the time right now
--> If yes, the user role is back to Guest

### Planning 
##### Frontend System Architecture Visualization
[Link to Lucidchart File](https://lucid.app/lucidchart/afc1685f-c9fb-4c09-b2f9-5e5e08608ccc/edit?viewport_loc=111%2C-190%2C1247%2C1193%2CHWEp-vi-RSFO&invitationId=inv_61f8a30a-028f-419a-b5e1-5054ec789617)

### Guide for Documentation
= Keep all documentation in this one README doc 
[How to write good documentation: by Victoria Drake](https://victoria.dev/blog/how-to-write-good-documentation/) 
Chronological Order: 
1. Live-time, short notes
--> Written in separate document
- Commands 
- Decisions 
- Sources
2. Context, ideas, decisions
= Expanding on short notes from above
= Make into conversational writing
--> When on break from coding
- Challenges
- Architectural decisions that support project goals 
- Odd-looking decisions 
3. Re-read doc & fill-in blanks
--> After distance from project
--> After a long break, or the next day
--> More time
- Link to prerequisite knowledge
- ie Link to API documentation
- Installation steps
- Relevant support issues 
- Frequently performed command-line actions

### GuestsScreen 
Individual Screens already reloaded on focus, thus unnecessary to `useIsFocused` or `setLoading` on `GuestsScreen`

### Services
Services are files that contain ONLY *Functions* which are reused throughout the program 
--> Functions are exported from these modules for use

### Using tokenService 
= Currently only used on Auth Context and passed down through `useAuth()` to relevant Screens
1. Create `const {authData} = useAuth()` inside File 
--> Because Hooks cannot be used inside the service 
2. Call `tokenService.getUserId` with `authData` argument
3. `setUserId` to response returned from `tokenService.getUserId(authData)`

12 Dec 2022
= Decided to defer the issue with logins without token to later 

### Create SVG
1. Export SVG from Figma
2. Import SVG into assets/images/
a. Download SVG Vector from Figma
b. Then just drag and drop the SVG into VSCode and a file with the SVG element code will be created 
3. Import SVG into relevant page through:
```
import InviteSVG from '../../assets/images/invite.svg'
```

### Confirm Invite Function 
Connected to `/confirm/<int:pk>/`
Creates a PATCH request to the backend that changes the status of the invite to 1 
Returns the new status 
Currently throwing a Possible Unhandled Rejection Error on Expo Go 

### Signup Form 
#### Expo Image Picker
[Expo Documentation - Image Picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
Attempted to use React Native Image Picker
--> But did not work 

#### Base64ImageField Creation in Django Serializers
[Django REST Framework upload image: "The submitted data was not a file"](https://stackoverflow.com/questions/28036404/django-rest-framework-upload-image-the-submitted-data-was-not-a-file)

### App Store Connect Information
#### App Bundle 
com.realmpartyapp.realm

### Daily Notes 
#### 13/12/22
Currently all Image Upload and Rendering is done with uri only
Begin writing daily notes here
##### Resources from today
[Uploading Images to Django REST Framework from Forms in React - dev.to by Thom Zolghadr](https://dev.to/thomz/uploading-images-to-django-rest-framework-from-forms-in-react-3jhj)
--> Used for how to send React Native data as Form Data
###### Tips for next time
- Leave half an hour at end of day to go through all links used 
  - Document the ones with concepts I ended up using
- Don't overcomplicate first versions of features...

### Profile Photo
[ImageBackground Usage: Stack Overflow](https://stackoverflow.com/questions/49442165/how-do-you-add-borderradius-to-imagebackground)
--> Used to add borderRadius to ImageBackground
--> `<ImageBackground>` = a `<View>` wrapping an `<Image>`
--> `style` prop only passes height and width to the `<Image>`

### Google Cloud & Firebase Configuration
#### Firebase Project 
Project ID: realm-rn-dj

#### Google Cloud Console Project
Configurations:
- Firebase enabled
- Connected to Google Analytics
Project ID: realm-rn-dj

#### Google Analytics 
Property Name: **realm-rn-dj**
Property ID: 343867366

## Deployment
### Database Configuration 
Database Type: PostgreSQL
Database Name: realm_django
View Database Contents: PGAdmin

#### PostgreSQL Instance 
Location: Google Cloud Console
Instance ID: realm-django
Password: same as database password
Connection name: realm-rn-dj:europe-west1:realm-django
Public IP address: 35.205.61.83
Service account: p169578510116-ro9r5d@gcp-sa-cloud-sql.iam.gserviceaccount.com

### APIs Configuration
gcloud builds submit --region=europe-west1 --tag europe-west1-docker.pkg.dev/realm-rn-dj/quickstart-docker-repo/quickstart-image:tag1

### .npmrc configuration
https://pnpm.io/npmrc

### Add Podfile to resolve issue with pod install in eas build 
https://dev.to/matthewzruiz/firebase-the-following-swift-pods-cannot-yet-be-integrated-as-static-libraries-b59

### Solution for adding modular headers in Podfile 
Integrate Swift pods as static libraries:
[The following Swift pods cannot yet be integrated as static libraries](https://github.com/invertase/react-native-firebase/issues/6332#issuecomment-1172950523)

Separating plugins in app.json:
[Adding plugin to app.config.js causes an error with eas cli](https://github.com/expo/sentry-expo/issues/239)

Expo documentation for build properties:
[BuildProperties - Expo Docs](https://docs.expo.dev/versions/latest/sdk/build-properties/)

### Integrate Google Analytics into React Native app
[Google Analytics For React Native App](https://medium.com/@ayushi.nig/google-analytics-for-react-native-app-ba03140ed528)

### Adding OTA Updates to EAS Build
[Over-the-air updates from Expo are now even easier to use! - By Eric Samelson](https://blog.expo.dev/over-the-air-updates-from-expo-are-now-even-easier-to-use-376e2213fabf)

### React Native TextInput docs
https://reactnative.dev/docs/textinput

### React Native Button docs
https://reactnative.dev/docs/button

### Adding Google Analytics 
https://firebase.google.com/docs/analytics/get-started?technology=ios&platform=web

### Set Image 
https://stackoverflow.com/questions/42521679/how-can-i-upload-a-photo-with-expo