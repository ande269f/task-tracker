import Login from "../../API/Login";
import { AppDispatch } from "../../store";

describe("Login integration tests with real backend", () => {
  const mockDispatch: AppDispatch = jest.fn();

it("should create, setpassword, deactivate, and delete a user sequentially", async () => {
  const username = "kljasfnbwerlwqerhdshflkjwerlkjwherosdfkj";
  const password = "mypassword";
  const login = new Login(username, mockDispatch);

  // 1. Create
  const createResponse = await login.createNewUser(username);
  const createdUser = await login.submit();
  expect(createResponse?.data).toBe("SUCCESS");
  expect(createdUser?.data.username).toBe(username);

  // 1.5 setPassword
  await login.setUserPassword(username, password);
  const response = await login.submit(username, password)
  expect(response?.data.username).toBe(username);

  // 2. Deactivate
  const deactivateResponse = await login.deactivateUser(username);
  const deactivatedUser = await login.submit(username, password);
  expect(deactivateResponse?.data).toBe("SUCCESS");
  expect(deactivatedUser?.data.active).toBe(false);

  // 3. Delete
  const deleteResponse = await login.deleteUser(username);
  expect(deleteResponse?.data).toBe("SUCCESS");
});

  
});
