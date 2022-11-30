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