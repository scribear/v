import { type } from "os";
import { DisplayStatus } from "../types";
enum COLOR {
  "BLACK",
  "WHITE",
}
const  initialState : DisplayStatus = {
  textSize: 6,
  primaryColor: '#0f0f0f',
  secondaryColor: "#292929",
  textColor: '#FFFFFF',
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
    case 'CHANGE_PRIMARY_THEME':
      return {
        ...state,
        primaryColor: action.payload
      }
    case 'CHANGE_SECONDARY_THEME':
      return {
        ...state,
        secondaryColor: action.payload
      }
    case 'CHANGE_TEXT_COLOR':
      return {
        ...state,
        textColor: action.payload,
      }
    case 'SET_TEXT':
      saveLocally("displayReducer", action.payload)
      return { ...state, ...action.payload };

    // return {
    //   ...state,
    //   textSize: action.payload,};
    default:
      return state;
  }
}