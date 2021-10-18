import { type } from "os";
import { DisplayStatus } from "../types";
enum COLOR {
  "BLACK",
  "WHITE",
}

const  initialState : DisplayStatus = {
  textSize: 6,
  color: COLOR.BLACK,
}


const saveLocally = (varName: string, value: any) => {
  localStorage.setItem(varName, JSON.stringify(value))
}

const getLocalState = (name: string) => {
  let checkNull = localStorage.getItem(name)
  if (checkNull) {
    return JSON.parse(checkNull);
  } else {
    return initialState
  }
};

export const DisplayReducer = (state = getLocalState("displayReducer"), action) => {
  switch (action.type) {
    case 'PICK_BLACK':
      state.color = 0;
      return state.color;
    case 'PICK_WHITE':
      state.color = 1;
      return state.color;
    case 'SET_TEXT':
      saveLocally("displayReducer", action.payload)
      return { ...state, ...action.payload};

      // return {
      //   ...state,
      //   textSize: action.payload,};
    default:
      return state;
  }
}