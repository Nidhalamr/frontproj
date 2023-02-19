import { Box, useMediaQuery } from "@mui/material";
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import axios from "axios"

const SearchPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id,picturePath} = useSelector((state) => state.user);
  const search = useSelector((state) => state.search);
  const token = useSelector((state) => state.token);

  let searchEnc=encodeURI(search)

  let url=`/search/query?search=${searchEnc}&limit=10`

  const config = {
    headers:
      { Authorization: token }
    
  };

  const getPatient = async () => {
    const response = await axios.get(url, config)
    .then(res=> console.log(res))
    .catch(err=> console.log(err))
    
    
 


  }
  

    getPatient();



  
  return (
    <div>
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
          {/* <PostsWidget userId={_id} /> */}
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            {/* <Box m="2rem 0" />
            <FriendListWidget userId={_id} /> */}
          </Box>
        )}
      </Box>

    </Box>
       </div>
  );
};

export default SearchPage;
