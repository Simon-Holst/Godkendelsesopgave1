// Formaterer et beløb i kroner med punktum som tusindtalsseparator, fx 1350 → "1.350 kr".
// Vi formaterer selv i stedet for toLocaleString, fordi dansk talformat ikke
// er garanteret på alle telefoner.
export function formatKr(amount) {
  const rounded = Math.round(amount);
  return `${String(rounded).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} kr`;
}
