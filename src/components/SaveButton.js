import { Box,Button,Typography,useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer,toast} from 'react-toastify';


const SaveButton =(state) => {

const patient = useSelector((state) => state.patient);
const token = useSelector((state) => state.token);




console.log(state)
const { palette } = useTheme();
const main = palette.neutral.main;
const primary = palette.primary.main;
const dark = palette.neutral.dark;
const medium = palette.neutral.medium;
const navigate = useNavigate();


function refreshPage() {
  window.location.reload(false);
}


const updatePatient = async () => {
  const config = {
    headers:{ Authorization: token }
  }
  const UpdatedPatientResponse = await axios.patch(`/patient/update/${patient._id}`, 
  state.state,config
)
.then(function (response) {
  if (response.status==200){
    toast.success('Patient modifié', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      })

      refreshPage()

  }else{
    toast.error("Erreur lors de la modification", {
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
  console.log(response);
})
.catch(function (error) {
  console.log(error);
});

// const savedUser = await UpdatedPatientResponse;


}


const handleClickSave= () => {
  updatePatient()
  }



  return (
<>
<Box
display="flex"
justifyContent="center"
alignItems="center"

gap="3px"
gridTemplateColumns="repeat(3, minmax(0, 1fr))">
<Button
fullWidth
type="submit"
onClick={handleClickSave}
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
</Box>
          <ToastContainer/> 
</>
  )
}

export default SaveButton;
