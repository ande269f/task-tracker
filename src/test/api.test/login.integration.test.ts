import Login from "../../API/Login";
import { AppDispatch } from "../../store";

describe("Login integration tests with real backend", () => {

it("should create, setpassword, deactivate, and delete a user sequentially", async () => {
  const username = "kljasfnbwerlwqerhdshflkjwerlkjwherosdfkjasdfasfd";
  const password = "mypassword";
  const login = new Login(username);

  // 1. Create
  const createResponse = await login.createNewUser(username);
  const createdUser = await login.submit();
  expect(createResponse?.data).toBe("SUCCESS");
  expect(createdUser?.username).toBe(username);

  // 1.5 setPassword
  await login.setUserPassword(username, password);
  const response = await login.submit(username, password)
  expect(response?.username).toBe(username);

  // 2. Deactivate
  const deactivateResponse = await login.deactivateUser(username);
  const deactivatedUser = await login.submit(username, password);
  expect(deactivateResponse).toBe("SUCCESS");
  expect(deactivatedUser?.active).toBe(false);

  // 3. Delete
  const deleteResponse = await login.deleteUser(username);
  expect(deleteResponse).toBe("SUCCESS");
});

  
});
