import JwtHandler from "../../../API/JwtHandler";
import { errorState, loggedOutState, LoginState, LoginStateDto } from "./loginSlice";
import { v4 as uuid } from "uuid";

export const decodeJwtService = (jwt: string | null): LoginStateDto | null => {
  if (!jwt) {
    return null;
  }
  if (jwt.length < 100) {
    console.error("længden på jwt er under 100 karaktere");
    return null;
  }

  const jwtDecoded = JwtHandler.decodeJwt(jwt) as LoginStateDto;
  // hvis data er loaded korrekt, sæt det ind og sæt loginState til PENDING
  if (jwtDecoded != null) {
    return {
      username: jwtDecoded.username,
      password: jwtDecoded.password,
      userId: jwtDecoded.userId,
      exp: jwtDecoded.exp,
      iat: jwtDecoded.iat,
      active: jwtDecoded.active,
    };
  } else {
    console.error("jwtDecoded er null");
    return null;
  }
};

export const loadJwtTokenDataService = (): LoginState => {
  try {
    const jwt = localStorage.getItem("jwt");
    const jwtDecoded = decodeJwtService(jwt) as LoginStateDto;
    //hvis jwt ikke findes i localstorage
    if (jwtDecoded == null) {
      return loggedOutState
    } else {
      return {
        username: jwtDecoded.username,
        password: jwtDecoded.password,
        sessionId: uuid(),
        userId: jwtDecoded.userId,
        exp: jwtDecoded.exp,
        iat: jwtDecoded.iat,
        loginState: "SUCCESS",
      };
    }
  } catch (e) {
    console.error("loadJwtTokenData fejler: " + e);
    return errorState
  }
};

