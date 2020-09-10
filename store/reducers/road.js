import { ADD_ROAD, FETCH_ROADS } from "../actions/road";

const initialState = {
  roads: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROADS:
      return {
        ...state,
        roads: [...action.payload],
      };

    case ADD_ROAD:
      // console.log(action.payload);
      return state;

    default:
      return state;
  }
};