import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  search:"",
  patient:null,
  added:null,
  data:null,
  registered:null,
  id:null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setPatient: (state, action) => {
      state.patient = action.payload.patient;
    },
    setData: (state, action) => {
      state.data = action.payload.data;
    },
    setSearch: (state, action) => {
      state.search = action.payload.search;
    },
    setAdded: (state,action) => {

        state.added=action.payload.added;
      // }else{
      //   state.added=state.added.pop()
      //   state.added=state.added.push(action.payload.added)
      // }
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setRegistered: (state, action) => {
      state.registered = action.payload.registered;

    },



 
  },
});

export const {setAdded,setRegistered,setData, setMode,setPatient,setSearch, setLogin, setLogout } =
  authSlice.actions;
export default authSlice.reducer;
