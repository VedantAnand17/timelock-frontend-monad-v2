import { BigNumber } from 'bignumber.js';

type BigNumberish = BigNumber.Value;

export function toBigNumber(input: BigNumberish): BigNumber {
  if (BigNumber.isBigNumber(input)) {
    return input;
  }

  return new BigNumber(input);
}

/**
 * Format a (BigNumber|number) to a shortened string for display
 * Attempts to only show {digits} overall digits (will show more if whole part is longer)
 * Condenses leading decimal zeros to subscript notation
 * @param input number or BigNumber
 * @param decimals how many decimals the token has
 * @param digits how many overall digits to display (default: 8)
 */
export function formatTokenDisplayCondensed(
  input: string,
  decimals = 18,
  largeValueDisplayDecimals = 2,
  digits = 8
): string {
  const value = toDecimalPlaces(input, decimals);

  if (value.isZero()) {
    return '0';
  }

  // Default/Clamp: all decimals
  if (digits === undefined || digits > decimals) {
    digits = decimals + 1;
  }

  // Work out how many digits we have for whole and fraction
  const wholeDigits = value
    .absoluteValue()
    .decimalPlaces(0, BigNumber.ROUND_DOWN)
    .toString(10).length;
  const decimalDigits = digits - wholeDigits;

  // Handle large values using compact notation
  if (value.isGreaterThanOrEqualTo(10000)) {
    return formatLargeTokenValue(
      parseFloat(value.toString()),
      largeValueDisplayDecimals
    );
  }

  // Whole number only
  if (decimalDigits <= 0) {
    return formatGrouped(value, 0);
  }

  // Handle small numbers with leading decimal zeros using subscript notation
  if (value.isLessThan(1) && decimalDigits > 0) {
    return condenseDecimalZeros(formatGrouped(value, decimals), decimalDigits);
  }

  // For other cases, use the significant decimals calculated
  return formatGrouped(value, decimalDigits);
}

function toSubString(input: string) {
  const subchars = '₀₁₂₃₄₅₆₇₈₉';
  return input.replace(/[0-9]/g, (m) => subchars[+m]);
}

function condenseDecimalZeros(value: string, decimalDigits: number) {
  // Get whole and fraction part
  const [whole, decimal] = value.split('.');

  // No decimal part
  if (!decimal || !decimal.length) {
    return whole;
  }

  // Condense zeros
  let subLength = 0;
  const formattedDecimal = decimal
    .replace(/0*$/, '')
    .replace(/^0{3,}/, (match) => {
      const removed = match.length.toString();
      const sub = toSubString(removed);
      subLength = sub.length;
      return `0${sub}`;
    });

  return `${whole}.${formattedDecimal
    .slice(0, decimalDigits + subLength)
    .replace(/0*$/, '')}`;
}

export function toDecimalPlaces(value: string, decimals: number): BigNumber {
  return toBigNumber(value).decimalPlaces(decimals, BigNumber.ROUND_DOWN);
}

export function formatGrouped(value: BigNumber, decimals: number): string {
  return stripTrailingZeros(
    value.toFormat(decimals, BigNumber.ROUND_DOWN, {
      prefix: '',
      decimalSeparator: '.',
      groupSize: 3,
      secondaryGroupSize: 0,
      fractionGroupSeparator: '.',
      fractionGroupSize: 0,
      suffix: '',
    })
  );
}

function stripTrailingZeros(str: string) {
  return str.replace(/(\.[0-9]*?)(0+$)/, '$1').replace(/\.$/, '');
}

export function formatDollarValue(value: string): string {
  const numValue = parseFloat(value);

  if (numValue === 0) {
    return '$0';
  }

  if (numValue < 0.01) {
    return '<$0.01';
  }

  const formats = [
    {
      max: 10000,
      options: {
        style: 'currency' as const,
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
    {
      max: 1000000,
      options: {
        notation: 'compact' as const,
        compactDisplay: 'short' as const,
        style: 'currency' as const,
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
    {
      max: Infinity,
      options: {
        notation: 'compact' as const,
        compactDisplay: 'short' as const,
        style: 'currency' as const,
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
  ];

  for (const format of formats) {
    if (numValue < format.max) {
      return new Intl.NumberFormat('en-US', format.options)
        .format(numValue)
        .replace('K', 'k');
    }
  }

  return new Intl.NumberFormat(
    'en-US',
    formats[formats.length - 1].options
  ).format(numValue);
}

function formatLargeTokenValue(
  value: number,
  largeValueDisplayDecimals = 2
): string {
  const formats = [
    {
      max: 1000000,
      options: {
        notation: 'compact' as const,
        compactDisplay: 'short' as const,
        minimumFractionDigits: largeValueDisplayDecimals,
        maximumFractionDigits: largeValueDisplayDecimals,
      },
    },
    {
      max: Infinity,
      options: {
        notation: 'compact' as const,
        compactDisplay: 'short' as const,
        minimumFractionDigits: largeValueDisplayDecimals,
        maximumFractionDigits: largeValueDisplayDecimals,
      },
    },
  ];

  for (const format of formats) {
    if (value < format.max) {
      return new Intl.NumberFormat('en-US', format.options)
        .format(value)
        .replace('K', 'k');
    }
  }

  return new Intl.NumberFormat(
    'en-US',
    formats[formats.length - 1].options
  ).format(value);
}
