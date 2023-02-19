import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>

        <Typography color={dark} variant="h5" fontWeight="500">
          Dernier Patient ajouté
        </Typography>
       <Typography color={medium} m="0.5rem 0">
          Dernier patient ajouté
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;