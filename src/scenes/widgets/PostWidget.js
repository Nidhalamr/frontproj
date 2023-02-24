
import { Box, Divider, IconButton, Typography,  TextField, useTheme,   Button, useMediaQuery} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPatient } from "state";
import axios from "axios";
import ReportButton from "components/ReportButton";
import SaveButton from "components/SaveButton";
import { useNavigate } from "react-router-dom";
import { setData } from "state";
import { ToastContainer,toast} from 'react-toastify';


const PostWidget = (data) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const { isMedecin} = useSelector((state) => state.user);
  const search = useSelector((state) => state.search);
  // const data = useSelector((state) => state.data);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [editClicked,setEditClicked] = useState(false);
  const patient = useSelector((state) => state.patient);
  

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;


  const [state, setState] = useState({
    nom: "",
    prenom: "",
    dateDeNaissance: "",
    genre:"",
  });

  const handleChange=(evt) =>{
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }

console.log(state)

 console.log(data.data.data)



 function refreshPage() {
  window.location.reload(false);
}

  
    let searchEnc=encodeURI(search)
  
    let url=`/patient/search/query?search=${searchEnc}&limit=10`
  






  
// const getPatient = async () => {
//   const response = await fetch(url, {
//     method: "GET",
//     headers: { Authorization: token },
//   });


// };


  



// useEffect(async () => {
// let res=await getPatient();
// Co
// dispatch(
//   setData({
//     data: res,

//   })
//   )
//   console.log(data)
// }, []); // eslint-disable-line react-hooks/exhaustive-deps

// if (!data) {
//   return null;
// }

const handleClickEdit= (el) => {

let index=data.data.data.indexOf(el)



dispatch(
  setPatient({
    patient: data.data.data[index],

  })
);

setEditClicked(true)
console.log(patient)




}


const deletePatient = async (el) => {



  const response = await fetch(`/patient/delete/${el._id}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });
  const responseDelete = await response.json();
  if (responseDelete.data){
    toast.success('Supprimé avec succés', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      })
      data.data.data.slice(data.data.data.indexOf(el))


      refreshPage()

  }else{
    toast.error("Erreur lors de la suppression", {
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
  setEditClicked((editClicked)=>editClicked)
};


const handleClickDelete=async (el) => {

  
  await deletePatient(el) 
  dispatch(
    setPatient({
      patient: null,
  
    })
  );

}

 

  return (
    <>
    <WidgetWrapper m="0rem 0">

      <Typography color={main} sx={{ mt: "1rem" }}>
      <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {editClicked?
              <>
              <Box
              justifyContent="center"
              alignItems="center"
              marginTop="20px"
              display="grid"
              gap="20px"
              gridTemplateColumns="repeat(6, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >

         <TextField
          type='text'
          label={`Ancien Prenom: ${patient.prenom}`}
          defaultValue={state.prenom}
          name="prenom"
          onChange={handleChange}

          sx={{ gridColumn: "span 3" }}
        />
         <TextField
          type='text'
          label={`Ancien Nom: ${patient.nom}`}
          defaultValue={state.nom}
          name="nom"
          onChange={handleChange}

          sx={{ gridColumn: "span 3" }}
        />
         <TextField
          type='text'
          label={`Ancienne Date de Naissance: ${patient.dateDeNaissance}`}
          defaultValue={state.dateDeNaissance}
          name="dateDeNaissance"
          onChange={handleChange}

          sx={{ gridColumn: "span 3" }}
        />
         <TextField
          type='text'
          label={`Ancien Genre: ${patient.genre}`}
          defaultValue={state.genre}
          name="genre"
          onChange={handleChange}

          sx={{ gridColumn: "span 3" }}
        />
          </Box>
            
          <FlexBetween/>
              
              
              
              
              
              
              
              <SaveButton state={state} />
              </>
              :data.data.data.length>0?


              data.data.data.map(el=>
                
              <>
                <Box
                justifyContent="center"
                alignItems="center"
                marginTop="20px"
                display="grid"
                gap="20px"
                gridTemplateColumns="repeat(6, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                type='text' 
                label="Prenom"
                defaultValue={el.prenom}
                value={el.prenom}
                name="Prenom"
                
                inputProps={
                  { readOnly: true, }
                }
                sx={{ gridColumn: "span 3" }}
                
              />
   <TextField
            type='text'
            label="Nom"
            value={el.nom}
            name="Nom"
            inputProps={
              { readOnly: true, }
            }
            sx={{ gridColumn: "span 3" }}
          />
           <TextField
            type='text'
            label="Date de Naissance"
            value={el.dateDeNaissance}
            name="Date de Naissance"
            inputProps={
              { readOnly: true, }
            }
            sx={{ gridColumn: "span 3" }}
          />
           <TextField
            type='text'
            label="Genre"
            value={el.genre}
            name="Genre"
            inputProps={
              { readOnly: true, }
            }
            sx={{ gridColumn: "span 3" }}
          />
            </Box>
              
            <FlexBetween/>
              

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"

            gap="3px"
            gridTemplateColumns="repeat(3, minmax(0, 1fr))">
            <Button
              fullWidth
              type="submit"
              onClick={()=>handleClickEdit(el)
              }
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              Modifier
            </Button>
 
            {isMedecin?<ReportButton id={el._id}/>:<></>}



            <Button
              fullWidth
              type="submit"
              onClick={()=>{

                handleClickDelete(el)
 
              }
              }

              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              Supprimer
            </Button>

            


          </Box>
          
          
            <Divider />



               </>
            ):"rien à afficher"}
            
            </Typography>
          </Box>
      </Typography>

      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">


          </FlexBetween>

          <FlexBetween gap="0.3rem">


          </FlexBetween>
        </FlexBetween>


      </FlexBetween>
        <Box mt="0.5rem">
          
        </Box>
    </WidgetWrapper>
    <ToastContainer/>
    </>
  );
  }

export default PostWidget;
