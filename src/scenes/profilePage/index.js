import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer,toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";

import Navbar from "scenes/navbar";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import UserWidget from "scenes/widgets/UserWidget";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import {
  Box,
  Divider,
  TextField,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AdapterDateFns from '@date-io/date-fns';

const ProfilePage = () => {
  let savedUser
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme();
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id} = useSelector((state) => state.user);




  const getUser = async () => {
    const response = await fetch(`/user/${userId}`, {
      method: "GET",
      headers: { Authorization: token },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    prenom,
    nom,
    dateDeNaissance,
    genre
  } = user.data;

  const registerSchema = yup.object().shape({
    prenom: yup.string().required("required"),
    nom: yup.string().required("required"),
    genre: yup.string().required("required"),
    dateDeNaissance: yup.string().required("required"),
    password: yup.string().required("required"),
  });
  

  
  const initialValuesRegister = {
    _id: userState._id,
    prenom: prenom,
    nom: nom,
    dateDeNaissance: dateDeNaissance,
    genre: genre,
  };


  const register = async (values, onSubmitProps) => {

    const config ={
      headers:{ Authorization: token }
    }
        const savedUserResponse = await axios.patch(`/user/update/${userId}`, 
          values,config
        )
        .then(function (response) {
          console.log(response);
          savedUser=response
        })
        .catch(function (error) {
          console.log(error);
        });
        console.log(savedUser)
        if (savedUser){
          toast.success('Informations mises à jour', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            })

                setLogin({
                  user: savedUser.user,
                  token: savedUser.token,
                }
                  )
                  
                navigate("/home")
        }else{
          toast.error("Verifiez votre mot de passe", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            })


    
        }
        onSubmitProps.resetForm();
      };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await register(values, onSubmitProps);
  };






  return (
    <>
    <Box>
      <Navbar userId={_id} />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={userState.picturePath} />
          <Box m="2rem 0" />
          {/* <FriendListWidget userId={userId} /> */}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >

<WidgetWrapper>

<FlexBetween gap="1.5rem">

<Formik
onSubmit={handleFormSubmit}
initialValues={initialValuesRegister}
validationSchema={registerSchema}
>
{({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
  setFieldValue,
  resetForm,
}) => (
  <form onSubmit={handleSubmit}>
    <Box
      display="grid"
      gap="50px"
      gridTemplateColumns="repeat(6, minmax(0, 1fr))"
      sx={{
        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
      }}
    >
                <TextField
				    type='text' 

            label="Login"
            defaultValue={userState.theId}
            value={values.theId}

            name="Login"
            inputProps={
              { readOnly: true, }
            }
            sx={{ gridColumn: "span 8" }}
            
          />

  <TextField
            label="Prenom"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.prenom}
            name="prenom"
            error={
              Boolean(touched.prenom) && Boolean(errors.prenom)
            }
            helperText={touched.prenom && errors.prenom}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            label="Nom"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.nom}
            name="nom"
            error={Boolean(touched.nom) && Boolean(errors.nom)}
            helperText={touched.nom && errors.nom}
            sx={{ gridColumn: "span 4" }}
          />
                <LocalizationProvider dateAdapter={AdapterDateFns}>

            <DesktopDatePicker
            type="text"
            label="Date de Naissance"
            onBlur={handleBlur}
            inputFormat="dd/mm/yyyy"
            value={values.dateDeNaissance}
            onChange={(value) => setFieldValue("dateDeNaissance", value, true)}
              renderInput={(params) => <TextField {...params} 
              sx={{ gridColumn: "span 4" }}
              error={Boolean(touched.dateDeNaissance) && Boolean(errors.dateDeNaissance)}
              helperText={touched.dateDeNaissance && errors.dateDeNaissance}                  
              />}
            error={Boolean(touched.dateDeNaissance) && Boolean(errors.dateDeNaissance)}
            helperText={touched.dateDeNaissance && errors.dateDeNaissance}
            sx={{ gridColumn: "span 4" }}

              />

            </LocalizationProvider>

          <TextField
            label="Genre"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.genre}
            name="genre"
            error={
              Boolean(touched.genre) && Boolean(errors.genre)
            }
            helperText={touched.genre && errors.genre}
            sx={{ gridColumn: "span 8" }}
            />
              <TextField
              label="Mot de passe"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              autoComplete="on"
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 8" }}
            />
      </Box>

      <Box>
        
      <Button
        fullWidth
        type="submit"
        sx={{
          m: "2rem 0",
          p: "1rem",
          backgroundColor: palette.primary.main,
          color: palette.background.alt,
          "&:hover": { color: palette.primary.main },
        }}
      >
      ENREGISTRER

      </Button>
      <Typography
        onClick={() => {
        resetForm()


        }}
        sx={{
          textDecoration: "underline",
          color: palette.primary.main,
          "&:hover": {
            cursor: "pointer",
            color: palette.primary.light,
          },
        }}
      >
        </Typography>


    </Box>
  </form>

)
}
</Formik>
</FlexBetween>

</WidgetWrapper>

          <Box m="2rem 0" />
        </Box>
      </Box>
    </Box>
          <ToastContainer/> 
      </>
  );
};

export default ProfilePage;
