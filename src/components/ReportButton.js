import { Box,Button,Typography,useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";



const ReportButton =(props) => {


const { palette } = useTheme();
const main = palette.neutral.main;
const primary = palette.primary.main;
const dark = palette.neutral.dark;
const medium = palette.neutral.medium;
const navigate = useNavigate();

console.log(props)

const handleClickNewRep= () => {
    navigate(`/rapport/patient/${props.id}`)
  }

  return (
            <>
            <Button
              fullWidth
              type="submit"
              onClick={handleClickNewRep}
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              
            Rapport
            </Button>

            </>
            )
}

export default ReportButton;
