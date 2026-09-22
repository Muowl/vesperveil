interface Theme {
  readonly name: string;
  contrast: number;
}

// Check types, generics, strings and interpolation.
export function readable<T extends Theme>(themes: T[]): T[] {
  const minimum = 4.5;
  return themes.filter(({ contrast }) => contrast >= minimum);
}

const theme: Theme = { name: "Vesperveil", contrast: 14.02 };
console.log(`${theme.name}: ${readable([theme]).length}`);
