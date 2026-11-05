import type { PomodoroStatsPeriod } from "../types/pomodoro-stats.types.js";

interface DateParts {
  year: number;
  month: number;
  day: number;
}

interface NumericDateParts extends DateParts {
  hour: number;
  minute: number;
  second: number;
}

// Extract numeric date parts in the specified timezone.
function getNumericDateParts(date: Date, timezone: string): NumericDateParts {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hourCycle: "h23",
  });

  const parts = formatter.formatToParts(date);

  const values = Object.fromEntries(
    parts.map(({ type, value }) => [type, Number(value)]),
  );

  const { year, month, day, hour, minute, second } = values;

  if (
    year === undefined ||
    month === undefined ||
    day === undefined ||
    hour === undefined ||
    minute === undefined ||
    second === undefined
  ) {
    throw new Error("Failed to extract date parts.");
  }

  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
  };
}

// Get the calendar date in the specified timezone.
function getDatePartsInTimezone(date: Date, timezone: string): DateParts {
  const { year, month, day } = getNumericDateParts(date, timezone);

  return { year, month, day };
}

// Convert a local calendar date into its corresponding UTC date.
function getUtcDateFromTimezone(
  year: number,
  month: number,
  day: number,
  timezone: string,
): Date {
  const targetTimestamp = Date.UTC(year, month - 1, day);

  let timestamp = targetTimestamp;

  // Resolve the timezone offset iteratively.
  for (let i = 0; i < 4; i++) {
    const { year, month, day, hour, minute, second } = getNumericDateParts(
      new Date(timestamp),
      timezone,
    );

    const localTimestamp = Date.UTC(year, month - 1, day, hour, minute, second);

    const offset = localTimestamp - timestamp;

    const nextTimestamp = targetTimestamp - offset;

    if (nextTimestamp === timestamp) {
      break;
    }

    timestamp = nextTimestamp;
  }

  return new Date(timestamp);
}

// Add calendar days without relying on the server's local timezone.
function addCalendarDays(
  { year, month, day }: DateParts,
  days: number,
): DateParts {
  const date = new Date(Date.UTC(year, month - 1, day + days));

  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  };
}

// Calculate the UTC boundaries of a reporting period.
export function getPomodoroStatsDateRange(
  period: PomodoroStatsPeriod,
  timezone: string,
  now: Date = new Date(),
) {
  const currentDate = getDatePartsInTimezone(now, timezone);

  let startDate: DateParts;
  let endDate: DateParts;

  switch (period) {
    case "today": {
      startDate = currentDate;
      endDate = addCalendarDays(currentDate, 1);
      break;
    }

    case "week": {
      const dayOfWeek = new Date(
        Date.UTC(currentDate.year, currentDate.month - 1, currentDate.day),
      ).getUTCDay();

      // Monday = 0, Sunday = 6.
      const daysSinceMonday = (dayOfWeek + 6) % 7;

      startDate = addCalendarDays(currentDate, -daysSinceMonday);
      endDate = addCalendarDays(startDate, 7);
      break;
    }

    case "month": {
      startDate = {
        year: currentDate.year,
        month: currentDate.month,
        day: 1,
      };

      endDate =
        currentDate.month === 12
          ? {
              year: currentDate.year + 1,
              month: 1,
              day: 1,
            }
          : {
              year: currentDate.year,
              month: currentDate.month + 1,
              day: 1,
            };

      break;
    }
  }

  return {
    startDate: getUtcDateFromTimezone(
      startDate.year,
      startDate.month,
      startDate.day,
      timezone,
    ),
    endDate: getUtcDateFromTimezone(
      endDate.year,
      endDate.month,
      endDate.day,
      timezone,
    ),
  };
}
