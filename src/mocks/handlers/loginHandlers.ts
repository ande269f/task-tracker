import { http, HttpResponse } from "msw";
import { fakeJWT } from "./helperFuncs";
import JwtHandler from "../../API/JwtHandler";

// En lille fake-database i memory
interface User {
  username: string,
  password: string | null,
  active: boolean
}

let users: User[] = [
  { username: "test", password: null, active: true },
  { username: "test2", password: "test", active: true },
];


// chatGPT genereret
const loginHandlers = [
  // --- LOGIN ---
  http.post("*/users/login/", async ({ request }) => {
    const { username, password } = (await request.json()) as {
      username: string;
      password: string | null;
    };

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // token secret key; a-string-secret-at-least-256-bits-long
      const jwtHandler = new JwtHandler();
      jwtHandler.safeJwtToken(fakeJWT(user.username, user.password));
      return HttpResponse.json("SUCCESS", { status: 200 })
    }
    else return HttpResponse.json({ status: "USER_NOT_FOUND" }, { status: 200 })
  }),

  // --- CREATE NEW USER ---
  http.post("*/users/createNewUser/:username", ({ params }) => {
    const { username } = params;

    if (users.some((u) => u.username === username)) {
      return HttpResponse.json(
        { error: "ERROR" },
        { status: 200 }
      );
    }

    const newUser = { username, password: "", active: true } as User;
    users.push(newUser);

    return HttpResponse.json("SUCCESS", { status: 200 });
  }),

  // --- SET USER PASSWORD ---
  http.post("*/users/setUserPassword/:username/:password", ({ params }) => {
    const usernameParam = params.username as string;
    const passwordParam = (params.password ?? null) as string | null;

    const user = users.find((u) => u.username === usernameParam);
    if (!user) {
      return HttpResponse.json("ERROR", { status: 200 });
    }

    // safe assignment
    user.password = passwordParam;

    return HttpResponse.json("SUCCESS", { status: 200 });
  }),

  // --- DELETE USER ---
  http.post("*/users/deleteUser/:username", ({ params }) => {
    const { username } = params;

    const exists = users.some((u) => u.username === username);
    if (!exists) {
      return HttpResponse.json(
        "ERROR",
        { status: 200 }
      );
    }

    users = users.filter((u) => u.username !== username);
    return HttpResponse.json("SUCCESS", { status: 200 });
  }),

  // --- DEACTIVATE USER ---
  http.post("*/users/deactivateUser/:username", ({ params }) => {
    const { username } = params;

    const user = users.find((u) => u.username === username);
    if (!user) {
      return HttpResponse.json("ERROR",
        { status: 200 }
      );
    }

    user.active = false;
    return HttpResponse.json("SUCCESS",
      { status: 200 });
  }),

  // --- CHECK LOGIN STATUS ---
  http.get("*/checkLogin/", () => {
    // Her kunne du fx simulere et “login check” ved at returnere true/false
    // For nu antager vi bare, at brugeren altid er logget ind
    return HttpResponse.json("SUCCESS");
  }),
];

export default loginHandlers
