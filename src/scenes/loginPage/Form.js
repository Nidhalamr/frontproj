import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@mui/material";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import { setRegistered } from "state";
import { useSelector } from "react-redux";

import axios from "axios";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Checkbox from '@mui/material/Checkbox';
import { ToastContainer,toast} from 'react-toastify';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AdapterDateFns from '@date-io/date-fns';
import capitalizeFirstLetter from "./CapitalizeFirstLetter"

const registerSchema = yup.object().shape({
  prenom: yup.string().required("required"),
  nom: yup.string().required("required"),
  password: yup.string().required("required"),
  genre: yup.string().required("required"),
  dateDeNaissance: yup.date(),
  isMedecin: yup.boolean(),
  picture: yup.string()
});

const loginSchema = yup.object().shape({
  theId: yup.string().required("required")
  // .test('len', 'Doit contenir 6 ou 8 caractères', val => val.length === 6||val.length === 8)
  ,
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  prenom: "",
  nom: "",
  password: "",
  dateDeNaissance: "",
  genre: "",
  medecinId: false,
  picture:"C:\Users\Nidhal\Desktop\Projet cab\public\assets\Capture333.PNG"
};







const initialValuesLogin = {
  theId: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const registered = useSelector((state) => state.registered);



  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    // const formData = new FormData();
    // for (let value in values) {
    //   formData.append(value, values[value]);
    // }
    // formData.append("picturePath", values.picture.name);

    // const savedUserResponse = await fetch(
    //   "http://localhost:5000/user/create",
    //   {
    //     method: "POST",
    //     body: JSON.stringify(values),
    //   }
    // );
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);


    const savedUserResponse = await axios.post('/user/create', 
      formData
    )
    .then(function (response) {
      console.log(response);
      toast.success('Compte crée avec succes', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        })
        let rez=response.data.theId
        dispatch(
          setRegistered({
            registered: rez,
          })
        )

        console.log(registered)
    })
    .catch(function (error) {
      console.log(error)
      toast.error("Echec lors de la creation du compte", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        })
  
  
    });

    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };






  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("/user/login", {
      method: "POST",
      headers: { "Access-Control-Allow-Origin": "*",
      'Access-Control-Allow-Methods':'GET, POST, PUT, PATCH, DELETE',
      "Content-Type":"application/json" },
      body: JSON.stringify(values),
    });

  //   const loggedInResponse = await axios.post('/user/login', 
  //   values
  // )
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });




    const loggedIn =await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn.token) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );

        toast.success('Connexion avec succes', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          })
        
          dispatch(
            setRegistered({
              registered: null,
            })
          )


      setTimeout(() => {
        navigate("/home");

      }, 2000);
    }  else{
      toast.error("Echec de connexion,Vérifiez vos Infos", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        })
  
  
      }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {


    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) {
      values.nom=capitalizeFirstLetter(values.nom)
      values.prenom=capitalizeFirstLetter(values.prenom)
      await register(values, onSubmitProps)};
  };

  return (
    <>
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
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
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>


                          {registered!=null?(
                            



                            <TextField
                            name="theId"
                            label="Votre Login"
                            defaultValue={registered}
                            inputProps={
                              { readOnly: true, }
                            }
                            value={registered?registered:values.theId}
            
                             sx={{ gridColumn: "span 4" }}
                            />
                                      
                        
                        
                  ):null}
                          
        
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
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Nom"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.nom}
                  name="nom"
                  error={Boolean(touched.nom) && Boolean(errors.nom)}
                  helperText={touched.nom && errors.nom}
                  sx={{ gridColumn: "span 2" }}
                />
                {/* <TextField
                  label="Date de Naissance"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.dateDeNaissance}
                  name="dateDeNaissance"
                  error={Boolean(touched.dateDeNaissance) && Boolean(errors.dateDeNaissance)}
                  helperText={touched.dateDeNaissance && errors.dateDeNaissance}
                  sx={{ gridColumn: "span 4" }}
                  
                /> */}


                  <LocalizationProvider dateAdapter={AdapterDateFns}>

                  <DesktopDatePicker
                  type="text"
                  label="Date de Naissance"
                  onBlur={handleBlur}
                  format="MM/dd/yyyy"
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




              <FormControl fullWidth
                sx={{ gridColumn: "span 4" }}
                  >
              <InputLabel id="demo-simple-select-label">Genre</InputLabel>

                <Select
                    label="Genre"

                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.genre}
                    name="genre"
                    onChange={handleChange}
                  >

                    <MenuItem value={"Homme"}>Homme</MenuItem>
                    <MenuItem value={"Femme"}>Femme</MenuItem>
                    </Select>
                </FormControl>
                  <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Ajoutez une photo</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>

                  Medecin?
   
            
              <input
              label="Medecin?"
              value={values.medecin}

              name="isMedecin"
              type="checkbox"
              onChange={handleChange}
            />
            
      
                  

                
              </>
            )}




            {isLogin&& (
              



              <TextField
              label="Login"

              onBlur={handleBlur}
              onChange={handleChange}
              value={values.theId}
              name="theId"
              error={Boolean(touched.theId) && Boolean(errors.theId)}
              helperText={touched.theId && errors.theId}
              sx={{ gridColumn: "span 4" }}
            />
            
            )}




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
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
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
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
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
              
          
              
              {isLogin
                ?
                 "Vous n'avez pas encore de compte, créez-en un!"
                : "Vous avez déja un compte."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
    <ToastContainer/>
    </> 

  );
};

export default Form;
