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

export async function partyModalView() {
  await analytics().logEvent("specific_screen_view", {
    screen_name: "PartyModal",
  });
}

//Button Presses
//TO-BE-FINISHED: Add all buttons that exist in the application
//Login Page
export async function loginButtonPress() {
  await analytics().logEvent("button_press", {
    button_name: "Login/Login",
  });
}
export async function createAccountButtonPress() {
  await analytics().logEvent("button_press", {
    button_name: "CreateAccount/Login",
  });
}

//Signup Page
export async function submitAccountButtonPress() {
  await analytics().logEvent("button_press", {
    button_name: "SubmitAccount/Signup",
  });
}
export async function backToLoginButtonPress() {
  await analytics().logEvent("button_press", {
    button_name: "BackToLogin/Signup",
  });
}

//Profile Page
export async function logoutButtonPress() {
  await analytics().logEvent("button_press", {
    button_name: "Logout/Profile",
  });
}
export async function deleteAccountButtonPress() {
  await analytics().logEvent("button_press", {
    button_name: "DeleteAccount/Profile",
  });
}

//Guests Page
export async function addPartyButtonPress() {
  await analytics().logEvent("button_press", {
    button_name: "AddParty/Guests",
  });
}

//Add Party Modal
export async function submitPartyButtonPress() {
  await analytics().logEvent("button_press", {
    button_name: "SubmitParty/AddParty",
  });
}

//Browse Page
export async function inviteButtonPress() {
  await analytics().logEvent("button_press", {
    button_name: "Invite/Browse",
  });
}

//Invited Page
export async function confirmButtonPress() {
  await analytics().logEvent("button_press", {
    button_name: "Confirm/Invited",
  });
}
