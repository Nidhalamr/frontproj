import { Box, useMediaQuery,TextField,Typography,useTheme ,Divider,Button} from "@mui/material";
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Navbar from "scenes/navbar";
import { useParams } from 'react-router-dom';
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostWidget from "scenes/widgets/PostWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import axios from "axios"
import FlexBetween from "components/FlexBetween"
import { setData } from "state";
import { ToastContainer,toast} from 'react-toastify';


const ReportPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id,picturePath} = useSelector((state) => state.user);
  const user = useSelector((state) => state.user);
  const search = useSelector((state) => state.search);
  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();
  let rez
  const [activeP,setActiveP] =useState(0)
  const [activeR,setActiveR] =useState(0)


  const [writing,setWriting] =useState("")

  const { id } = useParams();
  
  const config = {
    headers:
      { Authorization: token }
    
  };

  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;


  const handleChange=(evt) =>{
    const value = evt.target.value;
    setWriting(
      value
    );
  }

  function refreshPage() {
    window.location.reload(false);
  }


let values={
MedecinId:_id,
idPatient:id,
publicationDate:Date.now(),
nomPrenom:`${user.prenom} ${user.nom}`,
contenu:writing




}


const postRapport = () => {

axios.post(`/rapport/create/`,values, config)
.then(res=> {
toast.success('Compte rendu publié avec succés', {
  position: "top-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  })

  setTimeout(() => {
    refreshPage()
  }, 1500);
  }
)
.catch(err=> {
console.log(err)
toast.error("Erreur lors de la publication", {
  position: "top-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  })

  }
  )

}



  const handlePublish= () => {
    postRapport()


  }


  const deleteRapport = (el) => {

    axios.delete(`/rapport/delete/${el}`, config)
    .then(res=> {
    toast.success('Compte rendu supprimé', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      })
    
      setTimeout(() => {
        refreshPage()
      }, 1500);
      }
    )
    .catch(err=> {
    console.log(err)
    toast.error("Echec de la suppression", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      })
    
      }
      )
    
    }  


  const handleDelete= (el) => {
    deleteRapport(el)

  }





 
  const getPatient = () => {
   axios.get(`/patient/find/${id}`, config)
    .then(res=> {
      setActiveP((activeP)=> res);

        
 

      }
)
    .catch(err=> console.log(err))



 


  }


//   const getReports =async () => {
//    axios.get(`/rapport/find/${id}`, config)
//     .then(res=> {

//       setActiveR(()=>res);
//       console.log(activeR)
          
           
 

//       }
// )
//     .catch(err=> console.log(err))



 


  // }

  const getReports = async () => {
    const response = await axios.get(`/rapport/find/${id}`, config);
    setActiveR((act)=>response);

  };



  
  useEffect( () => {
    
   getPatient()
   getReports()


  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  


  
  return (
    <div>
    {activeP!=0&&activeR!=0?
    <Box>
      <Navbar  userId={_id}/>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id}  picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <>







          <Box
          justifyContent="center"
          alignItems="center"
          margin="15px 2px 15px"
          display="grid"
          gap="20px"
          gridTemplateColumns="repeat(6, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobileScreens ? undefined : "span 4" },
          }}
        >
          <TextField
          type='text' 
          label="Prenom"
          // defaultValue={activeP.data.data.prenom}
          value={activeP.data.data.prenom}
          name="Prenom"
          
          inputProps={
            { readOnly: true, }
          }
          sx={{ gridColumn: "span 3" }}
          
        />
<TextField
      type='text'
      label="Nom"
      value={activeP.data.data.nom}
      name="Nom"
      inputProps={
        { readOnly: true, }
      }
      sx={{ gridColumn: "span 3" }}
    />
{activeR.data.data.length>0?
        <Typography color={dark}               
                    margin= "auto auto auto"

                sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
                gridColumn: "span 6"
                }}  
                variant="h4" fontWeight="500">

          Derniers rapports publiés
        </Typography>
        :
       <Typography color={dark}               
        margin= "auto auto auto"

          sx={{
          "&:hover": {
            color: palette.primary.light,
            cursor: "pointer",
          },
          gridColumn: "span 6"
          }}  
          variant="h4" fontWeight="500">

          Aucun rapport publié      
          </Typography>

  }
      {activeR?
        activeR.data.data.map((el)=>{

          return(
<>




        <TextField
          type='text' 
          label="Medecin"
          // defaultValue={activeP.data.data.prenom}
          value={el.nomPrenom}
          name="medecin"
          
          inputProps={
            { readOnly: true, }
          }
          sx={{ gridColumn: "span 3" }}
          
        />

<TextField
          type='text' 
          label="Date de Publication"
          // defaultValue={activeP.data.data.prenom}
          value={el.publicationDate}
          name="date"
          
          inputProps={
            { readOnly: true, }
          }
          sx={{ gridColumn: "span 3" }}
          
        />


<TextField
          id="outlined-multiline-flexible"
          label="Compte Rendu"
          multiline
          value={el.contenu}

          inputProps={
            { readOnly: true, }
          }
          sx={{ gridColumn: "span 6" }}
        />

          {el.MedecinId==_id?
            (<>
        <Button
        fullWidth
        type="submit"
        onClick={()=>
          handleDelete(el._id)
        }
        sx={{
          m: "1rem 0",
          p: "1rem",
          backgroundColor: palette.primary.main,
          color: palette.background.alt,
          gridColumn: "span 6" ,
          "&:hover": { color: palette.primary.main },
        }}
      >
      Supprimer ce rapport

      </Button>
          </>):null
        
                  
      }


          <Divider
          sx={{ gridColumn: "span 6" }}
          />
        </>
        )})
          :null}








<TextField
          id="standard-multiline-flexible"
          label="Commencez à rédiger le rapport Ici"
          multiline
          onChange={handleChange}
          maxRows={30}
          variant="standard"
          sx={{ gridColumn: "span 6" }}
        />

<Button
        fullWidth
        type="submit"
        onClick={()=>handlePublish()}
        sx={{
          m: "2rem 0",
          p: "1rem",
          backgroundColor: palette.primary.main,
          color: palette.background.alt,
          gridColumn: "span 6" ,
          "&:hover": { color: palette.primary.main },
        }}
      >
      Publier

      </Button>


    </Box>
          
  
          </>
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />

          </Box>
        )}
      </Box>

    </Box>:null}
    <ToastContainer/>

       </div>
  );
};

export default ReportPage;
