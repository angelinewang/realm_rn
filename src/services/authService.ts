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
      "https://realm-dj-34ezrkuhla-ew.a.run.app/api/user/v1/login/",
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

// Function used in Signup and that also signs the User in automatically after Account Creation and brings user to home flow

const signUp = async (
  image: any,
  email: String,
  password: String,
  department: Number,
  name: String,
  gender: Number,
  birthdate: String
): Promise<void> => {
  try {
    console.log("Reach SignUpAndSignIn in authService!");

    // Image submission needs to be done with a "file" field
    // Need to upload files using base64 encoded string
    // The raw file is not supported by Django

    console.log(image);
    console.log(email);
    console.log(password);
    console.log(department);
    console.log(name);
    console.log(gender);
    console.log(birthdate);

    let formData = new FormData();
    formData.append("profile_picture", image);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("department", department);
    formData.append("name", name);
    formData.append("gender", gender);
    formData.append("birthdate", birthdate);

    let response = await fetch(
      "https://realm-dj-34ezrkuhla-ew.a.run.app/api/user/v1/signup/",
      {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          // Accept: "multipart/form-data",
        },
        body: formData,
      }
    );
    return response.json();
    // if (signUpResponse) {
    //   let signInResponse = await fetch(
    //     "https://541f-193-61-207-186.eu.ngrok.io/api/user/v1/login/",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Accept: "application/json",
    //       },
    //       body: JSON.stringify({
    //         email: email,
    //         password: password,
    //       }),
    //     }
    //   );
    //   return signInResponse.json();
    // }
    // Sends the response with auth token back to Auth Context as Object
  } catch (error) {
    console.error(error);
  }
};

export const authService = {
  signIn,
  signUp,
};
