import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";
import type { TProject } from "../project.types";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";

type ProjectItemProps = {
  project: TProject;
};
function ProjectItem({ project }: ProjectItemProps) {
  return (
    <ListItemButton
      component={NavLink}
      to={`/projects/${project._id}`}
      end
      sx={{
        display: "flex",
        alignItems: "center",
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
      <ListItemIcon sx={{ color: project.color || "inherit", minWidth: 40 }}>
        <FolderRoundedIcon />
      </ListItemIcon>

      <ListItemText primary={project.title} />
    </ListItemButton>
  );
}

export default ProjectItem;
