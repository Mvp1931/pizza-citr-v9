export default async function getPastOrder(ordersId) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const Response = await fetch(`/api/past-order/${ordersId}`);
  const data = await Response.json();
  return data;
}
