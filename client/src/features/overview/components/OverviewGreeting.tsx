import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import CurrentDateTime from "./CurrentDateTime";
import { useAuth } from "../../auth/hooks/useAuth";

type DayPeriod = "lateNight" | "morning" | "afternoon" | "evening" | "night";

interface GreetingContent {
  greeting: string;
  subtitles: string[];
}

const CONTENT: Record<DayPeriod, GreetingContent> = {
  lateNight: {
    greeting: "Burning the midnight oil",
    subtitles: [
      "Your tasks are all here. Don't forget to get some rest too 🌙",
      "Here's what's left on your plate. Pace yourself 😴",
      "A quiet hour to focus. Everything's at a glance below ✨",
    ],
  },
  morning: {
    greeting: "Good morning",
    subtitles: [
      "Here's your day at a glance. Let's start strong ☀️",
      "A fresh start. Pick one task and begin 💪",
      "Everything you need for today, all in one place 📋",
    ],
  },
  afternoon: {
    greeting: "Good afternoon",
    subtitles: [
      "Keep the momentum going. Your progress is right here 🚀",
      "Halfway there. See where you stand today 📊",
      "One task at a time. You've got this ✅",
    ],
  },
  evening: {
    greeting: "Good evening",
    subtitles: [
      "Wrap up strong. Here's what's left for today 🌇",
      "Your day at a glance. Finish what matters most 🎯",
      "Almost there. A few more wins to go ✨",
    ],
  },
  night: {
    greeting: "Good night",
    subtitles: [
      "Review today's progress and plan for tomorrow 🌙",
      "Clear your list, clear your mind 🧠",
      "Here's how today went. Rest well, you've earned it 🌱",
    ],
  },
};

function getDayPeriod(hour: number): DayPeriod {
  if (hour < 5) return "lateNight"; // 00:00 – 04:59
  if (hour < 12) return "morning"; // 05:00 – 11:59
  if (hour < 17) return "afternoon"; // 12:00 – 16:59
  if (hour < 21) return "evening"; // 17:00 – 20:59
  return "night"; // 21:00 – 23:59
}

/** Stable per day, so the text doesn't flicker on re-render but still rotates. */
function pickSubtitle(subtitles: string[], date: Date): string {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
      86_400_000,
  );
  return subtitles[dayOfYear % subtitles.length];
}

function useDayPeriod(): DayPeriod {
  // `getHours()` uses the user's local timezone (browser / device setting).
  const [period, setPeriod] = useState<DayPeriod>(() =>
    getDayPeriod(new Date().getHours()),
  );

  useEffect(() => {
    const update = () => setPeriod(getDayPeriod(new Date().getHours()));
    const id = window.setInterval(update, 60_000);

    // Timers are throttled in background tabs, so also refresh on return.
    const onVisible = () => {
      if (document.visibilityState === "visible") update();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return period;
}

function OverviewGreeting() {
  const { user } = useAuth();
  const period = useDayPeriod();
  const { greeting, subtitles } = CONTENT[period];
  const subtitle = pickSubtitle(subtitles, new Date());

  const name = user?.name.split(" ")[0];

  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 4,
        bgcolor: "primary.main",
        backgroundImage: (theme) =>
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%)"
            : "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0.05) 100%)",
        boxShadow: (theme) =>
          theme.palette.mode === "dark"
            ? "0px 10px 30px rgba(0, 0, 0, 0.4)"
            : "0px 10px 30px rgba(0, 0, 0, 0.12)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Stack spacing={1}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontSize: { xs: 16, md: 18 },
              fontWeight: 600,
              color: "primary.contrastText",
              letterSpacing: "-0.02em",
            }}
          >
            {greeting}, {name}! 👋
          </Typography>

          <CurrentDateTime />
        </Box>

        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            fontSize: { xs: 12, md: 16 },
            color: "primary.contrastText",
            opacity: 0.85,
          }}
        >
          {subtitle}
        </Typography>
      </Stack>
    </Box>
  );
}

export default OverviewGreeting;
