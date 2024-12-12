import { expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import createFetchMock from "vitest-fetch-mock";
import { usePizzaOfTheDay } from "../usePizzaOfTheDay";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const testPizza = {
  id: "calabrese",
  name: "The Calabrese Pizza",
  category: "Supreme",
  description:
    "The Calabrese is a pizza with a thick, chewy, and crispy crust, topped with fresh tomatoes, fresh mozzarella, and fresh basil.",
  image: "/public/pizzas/calabrese.webp",
  size: { s: 12.25, m: 16.25, l: 20.25 },
};

test("gives null when first called", async () => {
  fetchMocker.mockResponseOnce(JSON.stringify(testPizza));
  const { result } = renderHook(() => usePizzaOfTheDay());
  expect(result.current).toBeNull();
});

test("call API again and get the pizza of the day", async () => {
  fetchMocker.mockResponseOnce(JSON.stringify(testPizza));
  const { result } = renderHook(() => usePizzaOfTheDay());
  await waitFor(
    () => {
      expect(result.current).toEqual(testPizza);
    },
    { timeout: 5000 },
  );
  expect(fetchMocker).toBeCalledWith("/api/pizza-of-the-day");
});
