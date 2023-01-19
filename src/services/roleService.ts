// USED ON: 1. BrowseScreen 2. GuestlistScreen

// TASK: Could add role extraction to tokenService extraction
// So that authUserId and authUserRole are both passed through Auth Context

const getRole = async (
  authUserId,
  setUserRole,
  passedLastEntry,
  setPassedLastEntry
) => {
  // REPEATED AT: all getRoles --> Move into a module

  // Every getRole function calls:
  // 1. Get Profile
  // 2. If Role is Guest, setUserRole
  // 3. If Role is Host, API to find party, grab the party first entry and see if last entry passed is true or false
  // 4. If last entry passed is true, then call API to change the User Role to Guest on the backend
  // 5. And then grab new User Info with changed Role
  try {
    let response = await fetch(
      `https://realm-dj-34ezrkuhla-ew.a.run.app/api/user/v1/profile/${authUserId}/`
    );
    let json = await response.json();

    // Option 1: IF User Role is "Guest": Set User Role variable and move on
    if (json.role == 0) {
      setUserRole(json.role);
      console.log("Reached Get User Role Function with Role = 0");
    }

    // Options 2: IF User Role is "Host": Check Last Entry of recent party to determine whether to alter user role
    else if (json.role == 1) {
      // Sets user role, pending further change if last entry
      setUserRole(json.role);
      getFirstEntry(
        authUserId,
        passedLastEntry,
        setPassedLastEntry,
        setUserRole
      );
      console.log("Reached Get User Role Function with Role = 1");
    }
  } catch (error) {
    console.error(error);
  }
};

const getFirstEntry = async (
  authUserId,
  passedLastEntry,
  setPassedLastEntry,
  setUserRole
) => {
  try {
    // Get most recent party of the user and return the first entry time of that party

    // Same log from below API endpoint used to find relevant invited parties for guests
    let response = await fetch(
      `https://212a-193-61-207-186.eu.ngrok.io/api/user/v1/firstentry/${authUserId}/`
    );
    let json = await response.json();
    console.log("Passed last entry: (roleService)");
    console.log(json);
    setPassedLastEntry(json);
    console.log(passedLastEntry);

    // CRASH REPORT: After posting party and returning to Guestlist Page, app crashed
    if (json == true) {
      changeUserRole(authUserId, setUserRole, passedLastEntry);
    } else {
      console.log("Role not changed since party in future");
    }
  } catch (error) {
    console.error(error);
  }
};

const changeUserRole = async (authUserId, setUserRole, passedLastEntry) => {
  try {
    // Get most recent party of the user and return the first entry time of that party
    let response = await fetch(
      `https://212a-193-61-207-186.eu.ngrok.io/api/user/v1/changerole/${authUserId}/`
    );
    let json = await response.json();
    setUserRole(json.role);
    console.log(passedLastEntry);
  } catch (error) {
    console.error(error);
  }
};

export const roleService = {
  getRole,
};
