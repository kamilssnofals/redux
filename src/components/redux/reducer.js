// const initialState = {
//   searchLine : [],
//   movies : []
// }
// function reducer (state = initialState, action) {
//   switch (action.type) {
//     case 'SEARCH':
//       const searhLine = action.payload.searchLine;
//       console.log(searhLine);

//       return {
//         ...state,
//         searhLine:action.payload.searchLine
//       }
//       break;
//   }
//   return initialState
// }

// export default reducer;

const initialState = {
  searchLine: [],
  movies: [],
  favMovies: [],
  idList: "",
};
let reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH":
      let searchline = action.payload.searchLine;
      console.log("searchline");
      console.log(searchline);
      let x = {
        ...state,
        searchLine: action.payload.searchLine,
        movies: action.payload.movies,
      };
      return x;
      break;

    case "ADD_TO_FAVS":
      const newState = { ...state };
      console.log(newState, "appppppp");
      const id = action.payload.id;
      const arr = [...state.favMovies];
      const movieInFav = arr.find((item) => item.id === id);

      if (movieInFav) {
        //  newState.movies = [...newState.movies, {...movieInFav}]
        return state;
      } else {
        arr.push(action.payload);
      }
      return { ...state, favMovies: arr };

      break;

    case "DELETE_FROM_FAVS":
      const favs = [...state.favMovies];
      const index = favs.findIndex(item => item.id === action.payload.id);
      favs.splice(index, 1);
      return { ...state, favMovies: favs };

    case "GET_LIST_ID":
      return {
        ...state,
        idList: action.payload.idList,
      };

    default:
      return state;
  }
};
export default reducer;
