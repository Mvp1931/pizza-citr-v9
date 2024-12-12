import { render } from "vitest-browser-react";
import { expect, test } from "vitest";
import Pizza from "../Pizza";

test("alt text rendered on the image", async () => {
  const name = "My favorite pizza";
  const src = "http://picsum.photos/200";
  const screen = render(
    <Pizza
      name={name}
      description="super cool pizza stuff on browsers"
      image={src}
    />,
  );

  const img = screen.getByRole("img");
  await expect.element(img).toBeInTheDocument();
  await expect(img).toHaveAttribute("src", src);
  await expect(img).toHaveAttribute("alt", name);
});
