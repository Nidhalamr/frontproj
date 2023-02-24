import React from 'react';

import { ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { setAdded } from "state";
import { RepartitionRounded } from '@mui/icons-material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AdapterDateFns from '@date-io/date-fns';

const registerSchema = yup.object().shape({
  prenom: yup.string().required("required"),
  nom: yup.string().required("required"),
  genre: yup.string().required("required"),
  dateDeNaissance: yup.date().required("required"),
});


const initialValuesRegister = {
  prenom: "",
  nom: "",
  dateDeNaissance: "",
  genre: "",
};



const MyPostWidget = () => {
  const [arrayOfPatients,setarrayOfPatients]=useState([])
  let savedUser=undefined
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const added = useSelector((state) => state.added);

  const register = async (values, onSubmitProps) => {

const config ={
  headers:{ Authorization: token }
}
    const savedUserResponse = await axios.post('/patient/create', 
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
      toast.success('Patient ajouté', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        })
    }else{
      toast.error("Erreur lors de l'ajout", {
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

  // const notify=()=>{
  // if(savedUser){}else{}
  //     console.log(savedUser,"aaa")

  // }
  

  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log(values)

    if(arrayOfPatients.length>4){

    setarrayOfPatients((arrayOfPatients)=>arrayOfPatients.slice(0,4))
    }
    setarrayOfPatients((arrayOfPatients)=>[values,...arrayOfPatients])
    dispatch(
      setAdded({
        added: arrayOfPatients,
    
      })
    );
    setarrayOfPatients((arrayOfPatients)=>arrayOfPatients)
    await register(values, onSubmitProps);
    console.log(added)
  };

  return (
    <>
    <WidgetWrapper>


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
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >

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


    </WidgetWrapper>
      <ToastContainer/> 
      </>

)
};
export default MyPostWidget;
