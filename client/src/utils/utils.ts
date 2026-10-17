type FormatDateTimeOptions = {
  dateStyle?: Intl.DateTimeFormatOptions["dateStyle"];
  timeStyle?: Intl.DateTimeFormatOptions["timeStyle"];
};

export function formatDateTime(
  value: string | Date,
  options: FormatDateTimeOptions = {},
): string {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: options.dateStyle ?? "medium",
    timeStyle: options.timeStyle,
  }).format(date);
}
