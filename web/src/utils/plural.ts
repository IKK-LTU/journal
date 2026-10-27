/**
 * Lithuanian noun forms depend on the number:
 *   1, 21, 31…           → one   ("1 įrašas")
 *   2–9, 22–29…          → few   ("3 įrašai")
 *   0, 10–20, 30, 40…    → many  ("12 įrašų")
 */
export const pluralizeLt = (count: number, forms: { one: string; few: string; many: string }): string => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  const isTeen = lastTwoDigits >= 11 && lastTwoDigits <= 19;

  if (lastDigit === 1 && !isTeen) return forms.one;
  if (lastDigit >= 2 && !isTeen) return forms.few;
  return forms.many;
};

export const ENTRY_FORMS = { one: "įrašas", few: "įrašai", many: "įrašų" };
export const DAY_FORMS = { one: "diena", few: "dienos", many: "dienų" };
