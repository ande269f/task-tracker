import { LoginStateDto } from "../../store/slices/loginSlice/loginSlice";


export const fakeJWT = (username: string, password: string | null): string => {


    const fakePayload = {
        username: username,
        password: password,
        userId: 1,
        exp: Math.floor(Date.now() / 1000) + 360000, // 1 time fra nu
        iat: Math.floor(Date.now() / 1000),
        active: true,
    };

    const fakeToken =
        btoa(JSON.stringify({ alg: "HS256", typ: "JWT" })) + "." +
        btoa(JSON.stringify(fakePayload)) +
        ".UejSk2Bmdo5eHXHUjksRNDZR05dcnqiPf4l8pYQmzJk";

    return fakeToken

}
