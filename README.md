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
