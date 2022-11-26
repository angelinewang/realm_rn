export type AuthData = {
  token: string;
  email: string;
  name: string;
};
const signIn = async (email: string, _password: string) => {
  // this is a mock of an API call, in a real app
  // will be need connect with some real API,
  // send email and password, and if credential is corret
  //the API will resolve with some token and another datas as the below
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         token: JWTTokenMock,
//         email: email,
//         name: 'Lucas Garcez',
//       });
//     }, 1000);
//   });
 try {
        let response = await fetch('https://335b-82-0-186-223.eu.ngrok.io/api/user/v1/login/', {
            credentials: 'include',
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: _password
            })
        });
        let json = await response.json();
        
    }
    catch(error) {
        console.error(error);
    }

};

export const authService = {
  signIn,
};

const JWTTokenMock =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikx1Y2FzIEdhcmNleiIsImlhdCI6MTUxNjIzOTAyMn0.oK5FZPULfF-nfZmiumDGiufxf10Fe2KiGe9G5Njoa64';