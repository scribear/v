import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import store from '../../../store'
import {
  flip_recording, flip_switch_to_azure,
  flip_switchMenus, flip_entered_key,
  flip_correct_azureKey, flip_check_azureKey,
  api_Azure, api_Webspeech, api_StreamText
} from '../../../redux/actions'


export default function ChangeAPI(props) {
     const recording = (state) => state.recording
     const recordingAzure = (state) => state.recordingAzure

     const dispatch = useDispatch()
     const currentAPI = useSelector((state) => state.currentAPIReducer)
     const correctKey = useSelector((state) => state.correctAzureKey)
     const checkKey = useSelector((state) => state.checkAzureKey)
     if (checkKey == true) {
       dispatch(flip_check_azureKey())
     }
     if (store.desiredAPI == 1 && correctKey == false) {
       dispatch(flip_correct_azureKey())
     }
     if (store.desiredAPI != currentAPI) {
       if (store.desiredAPI == 0) {
         dispatch(api_Webspeech());
       } else if (store.desiredAPI == 1) {
         dispatch(api_Azure());
       } else if (store.desiredAPI == 2) {
         dispatch(api_StreamText());
       }
     }

     return (
       <div>
         <div className="setting-wrapper">
         </div>
       </div>
     )
}
