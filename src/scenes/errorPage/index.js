
import { useTheme,Box, Typography } from '@mui/material';
import Navbar from "scenes/navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



const ErrorPage = () => {


const { _id} = useSelector((state) => state.user);
const navigate = useNavigate();

const theme = useTheme();

const background = theme.palette.background.default;
const primaryLight = theme.palette.primary.light;


return(
            <>
            <Navbar userId={_id}/>
            <Box
            sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: background,
            }}
            >



            <Typography
            fontWeight="bold"
            fontSize="clamp(10rem, 2rem, 2.25rem)"
            color="primary"
            onClick={() => navigate("/home")}
            variant="h1"
            sx={{
            "&:hover": {
                color: primaryLight,
                cursor: "pointer",
            },

            }}

            >
            404 
            </Typography>

            
            </Box>
            </>
        )
}

export default ErrorPage;