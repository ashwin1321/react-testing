import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from './Register';

describe("Register component", () => {
  it("should render register component correctly", () => {
    render(<Register />)
    const element = screen.getByRole("heading", { level: 2 })         // it is the heading tag with level 2 (h2)
    expect(element).toBeInTheDocument()
  })

  it("should not show any error message when the component is loaded", () => {
    render(<Register />);
    const alertElement = screen.queryByRole("alert");    // there is no alert tag when the component is loaded so we use queryByRole instead of getByRole 
    expect(alertElement).not.toBeInTheDocument();
  });

  it("should show error message when all fileds are not entered", async () => {
    render(<Register />)
    const button = screen.getByRole("button", { name: /register/i });    // it is the button with name register
    await userEvent.click(button) // it will click the button and then we can check the error message
    // screen.debug()   // it shows the structure of the DOM at the moment when we clicked the button
    const alertElement = screen.getByRole("alert")   // it is the alert tag which is shown when we click the button
    expect(alertElement).toBeInTheDocument()
  })

  it("should show success message when the registration is successful.", async () => {
    const username = "testuser";
    const password = "testpassword";
    const email = "asf@gmail.com";

    const { container } = render(<Register />);

    const usernameInput = screen.getByRole('textbox', {
      name: /name/i
    })
    const passwordInput = screen.getByLabelText(/password/i)
    const emailInput = screen.getByRole('textbox', {
      name: /email/i
    })
    const subscribe = screen.getByText(/subscribe to our newsletter/i)
    const skills = container.querySelector('#root > div > div > form > div:nth-child(5) > div > div:nth-child(3) > div:nth-child(1) > div:nth-child(2)')

    await userEvent.type(usernameInput, username)
    await userEvent.type(passwordInput, password)
    await userEvent.type(emailInput, email)
    await userEvent.click(subscribe)
    await userEvent.click(skills)

    const button = screen.getByRole("button", { name: /register/i });
    await userEvent.click(button)

    const alertElement = await screen.findByRole("alert");
    expect(alertElement).toBeInTheDocument();
  });

})