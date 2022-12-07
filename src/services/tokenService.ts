import jwt_decode from "jwt-decode";

// USED ON:

const getUserId = (authData) => {
  const token = authData?.token;
  console.log("TOKEN:");
  console.log(token);

  const decoded = jwt_decode(token);
  console.log("DECODED:");
  console.log(decoded);

  return decoded.sub;
};

export const tokenService = {
  getUserId,
};
