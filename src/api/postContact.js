export default async function postContact(name, email, message) {
  const Response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, message }),
  });

  if (!Response.ok) {
    throw new Error("Response was not ok, Failed to send contact, send help");
  }

  return Response.json();
}
