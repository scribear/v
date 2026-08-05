import { ApiStatus, AzureStatus, StreamtextStatus } from "../types";
enum APIS {
    "WEBSPEECH",
    "AZURE",
    "STREAMTEXT"
}
enum STATUS {
    "AVAILABLE",
    "NULL",
    "UNAVAILABLE",
    "INPROGRESS",
    "ERROR"
}


const initialAPIStatusState : ApiStatus = {
    currentAPI: APIS.WEBSPEECH,
    webspeechStatus: STATUS.AVAILABLE,
    azureStatus: STATUS.NULL,
    streamtextStatus: STATUS.NULL,
}

const initialAzureState : AzureStatus = {
    azureKey: "Enter",
    azureRegion: "Enter",
}

const initialStreamtextState : StreamtextStatus = {
    key: "Enter"
}

const saveLocally = (varName: string, value: any) => {
    localStorage.setItem(varName, JSON.stringify(value))
}

const getLocalState = (name: string) => {
    let checkNull = localStorage.getItem(name)
    if (checkNull) {
      return JSON.parse(checkNull);
    } else {
      if (name == "apiStatus") {
        return initialAPIStatusState
      } else if (name == "azureStatus") {
        return initialAzureState
      }
    }
  };

export const APIStatusReducer = (state = getLocalState("apiStatus"), action) => {
    switch (action.type) {
        case 'CHANGE_CURRENT_API':
          return { ...state, ...action.payload};
        case 'CHANGE_API_STATUS':
          if (action.payload.azureStatus == 0 || action.payload.currentAPI !== state.currentAPI) {
            saveLocally("apiStatus", action.payload)
          }
          

          return { ...state, ...action.payload};
        default:
          return state;
      }
}

export const AzureReducer = (state = getLocalState("azureStatus"), action) => {
    switch (action.type) {
        case 'CHANGE_AZURE_LOGIN':
            return {...state, ...action.payload};
        case 'CHANGE_AZURE_STATUS':
            return {...state, ...action.payload};
        default:
          return state;
      }
}
export const StreamtextReducer = (state = initialStreamtextState, action) => {
    switch (action.type) {
        case 'FLIP_RECORDING':
          return !state
        default:
          return state;
      }
}




