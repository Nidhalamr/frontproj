import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { setAdded } from "state";
import { useSelector } from "react-redux";
import { Box, Divider, IconButton, Typography,  TextField, useTheme,   Button, useMediaQuery} from "@mui/material";



const AdvertWidget = (added) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
console.log(added)

  return (
    <WidgetWrapper>

        <Typography color={dark}               
                    margin= "auto auto auto"

                sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}  variant="h4" fontWeight="500">
          Derniers Patients ajoutés
        </Typography>
        {Array.isArray(added.added)?
        added.added.map(el=>{
          return(
          <>
          <Box
          justifyContent="center"
          alignItems="center"
          margin="15px 2px 15px"
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
          <Divider

          />
          </>
          
          
        )})

        :       <Typography color={medium} m="0.5rem 0">
          Vous verrez les derniers patients ajoutés ici
      </Typography>
        
        
        }
        

    </WidgetWrapper>
  );
};

export default AdvertWidget;