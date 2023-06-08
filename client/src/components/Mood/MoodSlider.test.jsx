import { render, screen, act } from "@testing-library/react";
import MoodSlider from "./MoodSlider";
import { AuthProvider } from "../../contexts/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

it("should render a slider to get mood input", () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <MoodSlider />
      </AuthProvider>
    </BrowserRouter>
  );

  const slider = screen.getByLabelText("mood-slider");
  expect(slider).toBeInTheDocument();
});

it("should update slider value on interaction", async() => {
  const user = userEvent.setup();
  render(
    <BrowserRouter>
      <AuthProvider>
        <MoodSlider />
      </AuthProvider>
    </BrowserRouter>
  );
  const slider = screen.getByLabelText("mood-slider");
  await user.click(slider);
  await user.keyboard('{arrowright}')
  expect(slider).toHaveAttribute("aria-valuenow", "25");
  expect(screen.getByLabelText("current-mood")).toEqual('I am sad')
});
