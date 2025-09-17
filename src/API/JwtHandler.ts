import  {jwtDecode} from "jwt-decode"

export default class JwtHandler {


    safeJwtToken = (token: string) => {
        localStorage.setItem("jwt", token);
    }

    decodeJwt = (token: string) => {
        try {
        const decodedToken = jwtDecode(token);
        return decodedToken
        }
        catch (e) {
            console.log("fejl ved decoding: " + token)
            return null
        }

    }
}