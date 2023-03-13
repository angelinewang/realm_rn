import analytics from "@react-native-firebase/analytics";

//Screen Views
export async function loginScreenView() {
  await analytics().logEvent("specific_screen_view", {
    screen_name: "Login",
  });
}

export async function signupScreenView() {
  await analytics().logEvent("specific_screen_view", {
    screen_name: "Signup",
  });
}

export async function profileScreenView() {
  await analytics().logEvent("specific_screen_view", {
    screen_name: "Profile",
  });
}

export async function invitedScreenView() {
  await analytics().logEvent("specific_screen_view", {
    screen_name: "Invited",
  });
}

export async function confirmedScreenView() {
  await analytics().logEvent("specific_screen_view", {
    screen_name: "Confirmed",
  });
}

export async function browseScreenView() {
  await analytics().logEvent("specific_screen_view", {
    screen_name: "Browse",
  });
}

export async function guestlistScreenView() {
  await analytics().logEvent("specific_screen_view", {
    screen_name: "Guestlist",
  });
}

//Button Presses
//TO-BE-FINISHED: Add all buttons that exist in the application
export async function guestlistScreenView() {
  await analytics().logEvent("specific_screen_view", {
    screen_name: "Guestlist",
  });
}
