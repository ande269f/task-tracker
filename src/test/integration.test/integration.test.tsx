import { renderWithProviders } from "../../test/render";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import LoginPage from "../../pages/LoginPage";
import "@testing-library/jest-dom";
import DisplayDialog from "../../components/dialogbox/DisplayDialog";

const generateRandomString = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// describe('App', () => {
//   it('renders the App component', () => {
//         renderWithProviders(
//       <App />

//     )

//     screen.debug(); // prints out the jsx in the App component unto the command line
//   })
// })

const loginWithUsername = (username: string) => {
  const usernameInput = screen.getByPlaceholderText(/brugernavn/i);
  expect(usernameInput).toBeInTheDocument();

  fireEvent.click(usernameInput);
  fireEvent.input(usernameInput, {
    target: { value: username },
  });

  const loginButton = screen.getByRole("button", { name: /log ind/i });
  fireEvent.click(loginButton);
};

describe("create user and log in", () => {
  const existingUsername = "anders1";
  const newUsername = generateRandomString(15);

    beforeEach(() => {
    renderWithProviders(
      <>
        <LoginPage />
        <DisplayDialog />
      </>
    );
  });

  it("creates a new user", async () => {


    loginWithUsername(newUsername);

    expect(
      await screen.findByText(/brugernavn du har indtastet er i brug/i)
    ).toBeInTheDocument();

    await waitFor(() => {
      fireEvent.click(screen.getByLabelText("create-new-user"));
    });
    fireEvent.click(await screen.findByText(/Fortsæt/i));
  });

  it("logs in with newly created user without password", async () => {

    loginWithUsername(existingUsername);
  });
});
