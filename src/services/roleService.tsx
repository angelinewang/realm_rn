const getRole = async (userId, setUserRole, passedLastEntry, setPassedLastEntry) => {
    // REPEATED AT: all getUserRoles --> Move into a module 

    // Every getUserRole function calls: 
    // 1. Get Profile 
    // 2. If Role is Guest, setUserRole 
    // 3. If Role is Host, API to find party, grab the party first entry and see if last entry passed is true or false  
    // 4. If last entry passed is true, then call API to change the User Role to Guest on the backend 
    // 5. And then grab new User Info with changed Role
      try {
        let response = await fetch(`https://212a-193-61-207-186.eu.ngrok.io/api/user/v1/profile/${userId}/`);
        let json = await response.json();

        // Option 1: IF User Role is "Guest": Set User Role variable and move on 
        if (json.role == 0) {
          setUserRole(json.role)
          console.log("Reached Get User Role Function with Role = 0")
        }

        // Options 2: IF User Role is "Host": Check Last Entry of recent party to determine whether to alter user role
        else if (json.role == 1) {
        // Sets user role, pending further change if last entry  
        setUserRole(json.role)
        getFirstEntry(userId, passedLastEntry, setPassedLastEntry, setUserRole)
        console.log("Reached Get User Role Function with Role = 1")
       }} catch (error) {
          console.error(error);
      }
  
}

const getFirstEntry = async (userId, passedLastEntry, setPassedLastEntry, setUserRole) => {
  try {
    // Get most recent party of the user and return the first entry time of that party 
    let response = await fetch(`https://212a-193-61-207-186.eu.ngrok.io/api/user/v1/firstentry/${userId}/`);
    let json = await response.json();
    console.log("Passed last entry: (roleService)")
    console.log(json)
    setPassedLastEntry(json)
    console.log(passedLastEntry)

    // CRASH REPORT: After posting party and returning to Guestlist Page, app crashed
    if (json == true) {
      changeUserRole(userId, setUserRole, passedLastEntry)
    }
    else {
      console.log("Role not changed since party in future")
    }
  }
  catch (error) {
    console.error(error);
  }
}

// TASKS:
// 1. Put getting user role into a separate module, whose content is passed down to all relevant pages
// 2. Ensure that Party posting modal closes after posting party 

const changeUserRole = async (userId, setUserRole, passedLastEntry) => {
    try {
    // Get most recent party of the user and return the first entry time of that party 
    let response = await fetch(`https://212a-193-61-207-186.eu.ngrok.io/api/user/v1/changerole/${userId}/`);
    let json = await response.json();
    setUserRole(json.role)
    console.log(passedLastEntry)
  }
  catch (error) {
    console.error(error);
  }
}

//   const getUserRole = async (userId) => {
//     // REPEATED AT: all getUserRoles --> Move into a module 

//     // Every getUserRole function calls: 
//     // 1. Get Profile 
//     // 2. If Role is Guest, setUserRole 
//     // 3. If Role is Host, API to find party, grab the party first entry and see if last entry passed is true or false  
//     // 4. If last entry passed is true, then call API to change the User Role to Guest on the backend 
//     // 5. And then grab new User Info with changed Role
//       try {
//         let response = await fetch(`https://212a-193-61-207-186.eu.ngrok.io/api/user/v1/profile/${userId}/`);
//         let json = await response.json();

//         // Option 1: IF User Role is "Guest": Set User Role variable and move on 
//         if (json.role == 0) {
//           setUserRole(json.role)
//           console.log("Reached Get User Role Function with Role = 0")
//         }

//         // Options 2: IF User Role is "Host": Check Last Entry of recent party to determine whether to alter user role
//        else if (json.role == 1) {
//         // Sets user role, pending further change if last entry  
//         setUserRole(json.role)
//          getFirstEntry()
//          console.log("Reached Get User Role Function with Role = 1")
//        }

        
//         } catch (error) {
//           console.error(error);
//         }
//   }

// const getFirstEntry = async () => {
//   try {
//     // Get most recent party of the user and return the first entry time of that party 
//     let response = await fetch(`https://212a-193-61-207-186.eu.ngrok.io/api/user/v1/firstentry/${userId}/`);
//     let json = await response.json();
//     console.log("Passed last entry:")
//     console.log(response)
//     setPassedLastEntry(response)
//     console.log(passedLastEntry)

//     // CRASH REPORT: After posting party and returning to Guestlist Page, app crashed
//     if (json == true) {
//       changeUserRole()
//     }
//     else {
//       console.log("Role not changed since party in future")
//     }
//   }
//   catch (error) {
//     console.error(error);
//   }
// }

// // TASKS:
// // 1. Put getting user role into a separate module, whose content is passed down to all relevant pages
// // 2. Ensure that Party posting modal closes after posting party 

// const changeUserRole = async () => {
//     try {
//     // Get most recent party of the user and return the first entry time of that party 
//     let response = await fetch(`https://212a-193-61-207-186.eu.ngrok.io/api/user/v1/changerole/${userId}/`);
//     let json = await response.json();
//     setUserRole(json.role)
//     console.log(passedLastEntry)
//   }
//   catch (error) {
//     console.error(error);
//   }
// }

export const roleService = {
  getRole,
};
