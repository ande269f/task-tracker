import  {jwtDecode} from "jwt-decode"
import { LoginStateDto } from "../store/slices/loginSlice";

export default class JwtHandler {


    safeJwtToken = (token: string) => {
        localStorage.setItem("jwt", token);
    }

    static decodeJwt = (token: string): LoginStateDto | null => {
        try {
        const decodedToken = jwtDecode(token);
        return decodedToken as LoginStateDto
        }
        catch (e) {
            console.log("fejl ved decoding: " + token)
            return null
        }

    }
}