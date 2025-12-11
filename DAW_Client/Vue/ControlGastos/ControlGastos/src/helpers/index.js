export const cambioMoneda = (number) => {
  return number.toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
  });
}
export const generarID = () => {
  const fecha = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2);
  return fecha + random;
}