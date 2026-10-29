import { List } from "@mui/material";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { ROUTES } from "../../routes/paths";
import { useFetchTasks } from "../../features/tasks/hooks/useFetchTasks";
import NavItem from "./NavItem";
import type { TNavItem } from "../types";

const navItems: TNavItem[] = [
  {
    id: 1,
    label: "Overview",
    to: ROUTES.overview,
    icon: <SpaceDashboardRoundedIcon />,
  },
  {
    id: 2,
    label: "Tasks",
    to: ROUTES.tasks,
    icon: <ChecklistIcon />,
  },
];

function NavList() {
  const { tasks: generalTasks } = useFetchTasks(null);

  return (
    <List
      disablePadding
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
      }}
    >
      {navItems.map((item) => (
        <NavItem
          key={item.id}
          item={item}
          generalTasksLength={generalTasks.length}
        />
      ))}
    </List>
  );
}

export default NavList;
