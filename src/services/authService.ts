export type AuthData = {
  token: string;
  // Should be able to get user ID through token
};

const signIn = async (email: string, password: string): Promise<AuthData> => {
  try {
    console.log("Reach authService!");
    console.log(email);
    console.log(password);
    let response = await fetch(
      "https://3341-193-61-207-166.eu.ngrok.io/api/user/v1/login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );
    // Sends the response with auth token back to Auth Context as Object
    return response.json();
  } catch (error) {
    console.error(error);
  }
};
// console.log(_authData)
// const signIn = async (_email: string, _password: string): Promise<AuthData> => {
//   // this is a mock of an API call, in a real app
//   // will be need connect with some real API,
//   // send email and password, and if credential is corret
//   //the API will resolve with some token and another datas as the below
//   //   return new Promise((resolve) => {
//   //     setTimeout(() => {
//   //       resolve({
//   //         token: JWTTokenMock,
//   //         email: email,
//   //         name: "Lucas Garcez",
//   //       });
//   //     }, 1000);
//   //   });

//   try {
//     console.log("Reach authService!");
//     let response = await fetch(
//       "https://334d-193-61-207-166.eu.ngrok.io/api/user/v1/login/",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ email: _email, password: _password }),
//       }
//     );
//     return await response.json();
//     // let json = await response.json();
//     // setAuthData(json);
//     // console.log(json);
//   } catch (error) {
//     console.error(error);
//   }
// };

export const authService = {
  signIn,
};

// const JWTTokenMock =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikx1Y2FzIEdhcmNleiIsImlhdCI6MTUxNjIzOTAyMn0.oK5FZPULfF-nfZmiumDGiufxf10Fe2KiGe9G5Njoa64";
