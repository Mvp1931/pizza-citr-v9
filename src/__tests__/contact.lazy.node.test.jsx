import { render, cleanup } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route } from "../routes/contact.lazy";

const queryClient = new QueryClient();

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

test("can submit contact form", async () => {
  fetchMocker.mockResponse(JSON.stringify({ status: "ok" }));
  const screen = render(
    <QueryClientProvider client={queryClient}>
      <Route.options.component />
    </QueryClientProvider>,
  );

  const nameInput = screen.getByPlaceholderText("name");
  const emailInput = screen.getByPlaceholderText("email@eample.com");
  const textAreaInput = screen.getByPlaceholderText("Enter Message");

  const testData = {
    name: "verstappen",
    email: "verstappen@gmail.com",
    message: "Ferrari pizza",
  };

  nameInput.value = testData.name;
  emailInput.value = testData.email;
  textAreaInput.value = testData.message;

  const submitButton = screen.getByRole("button");
  submitButton.click();

  const h3 = await screen.findByRole("heading", { level: 3 });
  expect(h3.innerText).toContain("submitted");

  const requests = fetchMocker.requests();
  expect(requests.length).toBe(1);
  expect(requests[0].url).toBe("http://localhost:3000/api/contact");
  expect(fetchMocker).toHaveBeenCalledWith("/api/contact", {
    body: JSON.stringify(testData),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
});
