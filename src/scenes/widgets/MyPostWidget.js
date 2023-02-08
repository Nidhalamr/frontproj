import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
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
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";

import { Formik } from "formik";
import * as yup from "yup";




const registerSchema = yup.object().shape({
  prenom: yup.string().required("required"),
  nom: yup.string().required("required"),
  genre: yup.string().required("required"),
  dateDeNaissance: yup.string().required("required"),
});


const initialValuesRegister = {
  prenom: "",
  nom: "",
  dateDeNaissance: "",
  genre: "",
};



const MyPostWidget = () => {

  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const register = async (values, onSubmitProps) => {


    const savedUserResponse = await axios.post('http://localhost:3001/patient/create', 
      values
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await register(values, onSubmitProps);
  };

  return (
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
                <TextField
                  label="Date de Naissance"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.dateDeNaissance}
                  name="dateDeNaissance"
                  error={Boolean(touched.dateDeNaissance) && Boolean(errors.dateDeNaissance)}
                  helperText={touched.dateDeNaissance && errors.dateDeNaissance}
                  sx={{ gridColumn: "span 4" }}
                  
                />

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
                  sx={{ gridColumn: "span 4" }}
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
            </Button>
            <Typography
              onClick={() => {
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
              </Typography>


          </Box>
        </form>
      )
      }
      </Formik>
      </FlexBetween>
    </WidgetWrapper>
)
};
export default MyPostWidget;
