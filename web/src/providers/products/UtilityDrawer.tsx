import { BoxProps, Box } from "@mui/material";
import { FilterControl } from "./FilterControl";
import { SortControl } from "./SortControl";

type UtilityDrawerProps = {} & BoxProps;

export const UtilityDrawer: React.FC<UtilityDrawerProps> = ({ ...props }) => {
  return (
    <Box {...props} sx={{ ...props.sx, backgroundColor: "#fff" }}>
      <FilterControl />
      <SortControl sx={{ marginTop: "2rem" }} />
    </Box>
  );
};