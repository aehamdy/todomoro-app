import {
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../routes/paths";
import type { TNavItem } from "../types";

type NavItemProps = {
  item: TNavItem;
  generalTasksLength: number;
};

function NavItem({ item, generalTasksLength }: NavItemProps) {
  return (
    <ListItemButton
      key={item.to}
      component={NavLink}
      to={item.to}
      end
      sx={{
        borderRadius: 2,
        color: "text.secondary",
        "&:hover": {
          bgcolor: "action.hover",
          color: "primary.main",
          "& .MuiListItemIcon-root": {
            color: "primary.main",
          },
        },
        "&.active": {
          bgcolor: "action.selected",
          color: "primary.main",
          "& .MuiListItemIcon-root": {
            color: "primary.main",
          },
        },
      }}
    >
      <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
        {item.icon}
      </ListItemIcon>

      <ListItemText primary={item.label} />

      {item.to === ROUTES.tasks && (
        <Chip
          label={generalTasksLength}
          size="small"
          color="primary"
          sx={{
            height: 24,
            minWidth: 24,
            fontWeight: 600,
            fontSize: "0.75rem",
            borderRadius: 1.5,
          }}
        />
      )}
    </ListItemButton>
  );
}

export default NavItem;
