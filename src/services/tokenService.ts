import jwt_decode from "jwt-decode";

// USED ON: Auth context
// token decoded on authData straight away, so calling authUserId will get userId
// const {authUserId} = useAuth() should get the user id decoded through the token on auth context using tokenService
// authData still kept on Auth Context in case need of use

// TASKS:
// 1. Add tokenService to Auth Context
// 2. Change all token use into {authUserId} = useAuth()

const getUserId = (_authData) => {
  // Not allowed to call useAuth() within tokenService
  // const { authData } = useAuth();

  console.log("TOKEN SERVICE AUTH DATA:");
  console.log(_authData);

  const token = _authData?.token;
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
