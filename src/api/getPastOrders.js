export default async function getPastOrders(page) {
  const Response = await fetch(`/api/past-orders?page=${page}`);
  const data = await Response.json();
  return data;
}
