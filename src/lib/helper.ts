export const truncateAddress = (
  address: string,
  length: number = 4
): string => {
  if (!address) return "";
  if (address.length <= length * 2) return address;

  const start = address.slice(0, length);
  const end = address.slice(-length);

  return `${start}...${end}`;
};

export const isSameAddress = (
  address1: string | undefined | null,
  address2: string | undefined | null
): boolean => {
  if (!address1 || !address2) return false;
  return address1.toLowerCase() === address2.toLowerCase();
};

export const preventMinusAndEKey = (e: React.KeyboardEvent) => {
  if (e.code === "Minus" || e.key === "e" || e.key === "E") {
    e.preventDefault();
  }
};

export const preventPasteNegative = (e: React.ClipboardEvent) => {
  const clipboardData = e.clipboardData;
  const pastedData = parseFloat(clipboardData.getData("text"));

  if (pastedData < 0) {
    e.preventDefault();
  }
};
