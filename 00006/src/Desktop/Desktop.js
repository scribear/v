import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import TopSpace from '../components/TopSpace'
import Captions from '../components/Captions'
import MiddleSpace from '../components/MiddleSpace'
import PlaceHolder from "../components/PlaceHolder"
import {
  flip_recording,
  flip_entered_key,
  flip_correct_azureKey,
  flip_check_azureKey,
  flip_entered_region
} from '../redux/actions'
import { useTimer } from 'react-timer-hook';
import store from '../store'
import styles from './Desktop.module.css'
import swal from 'sweetalert';
import { resetWarningCache } from 'prop-types';

export default function Desktop(props) {
  const dispatch = useDispatch()
  const { text, setText } = props
  // Get global state from Redux. See the React Redux tutorial.
  // webspeech on-off
  const api = useSelector((state) => state.currentAPI)
  const on = useSelector((state) => state.checkStreamTextKey)
  const onWebspeech = useSelector((state) => state.onWebspeech)
  //azure related
  const enteredKey = useSelector((state) => state.enteredKey)
  const enteredRegion = useSelector((state) => state.enteredRegion)
  const correctAzureKey = useSelector((state) => state.correctAzureKey)
  const checkAzureKey = useSelector((state) => state.checkAzureKey)
  const streamtext = useSelector((state) => state.streamtext);
  const checkKey2= useSelector((state)=>state.checkStreamTextKey);
  //size of font display
  const textSize = useSelector((state) => state.textSize)
  //listening on-off
  const recording = useSelector((state) => state.recording)
  //theme color
  const invertColors = useSelector((state) => state.invertColors)
  //which menu shown
  const switchMenus = useSelector((state) => state.switchMenus)
  //caption space size display mode
  const bot_mode = useSelector((state) => state.botsize)
  //stream-text on-off
  const stream_text = useSelector((state) => state.streamtext)
  // Convert variables to CSS-friendly strings.
  var sizeString = text + 'vh'
  // Size of bottom space (text area) relative to text size and number of lines.
  // Webpage layout
  // please use this layout as the standard for bottom/top/middle/placeholder space
  var botHeight = (3 - bot_mode) * 28 + 'vh'
  var topHeight = 14 + 'vh'
  var placeHeight = 2 + 'vh'
  var midHeight = (84 - (3 - bot_mode) * 28) + 'vh'
  //-----------------------
  //checks how often user is still on browser
  //currently set to checking every 1 hour(s)
  var timerCheck = 600000;
  //----------------------
  // var topHeight = 9 + 'vh'
  // var placeHeight = 5 + 'vh'
  // var midHeight = 34 + 'vh'
  //-----------------------
  // topHeight + botHeight should always = 100vh because we don't want the full
  // page to scroll (we only want the individual areas to scroll).
  //------------------------
  //checkAzureKey is changed changed HERE in normal return
  //isCorrectKey is done in AzureCaptions
  //azureKeyEntered is done in enter button
  if (checkAzureKey) {
    if (api == 1 && recording == true) {
      dispatch(flip_recording())
    }
  }
  //some bool based on the value of redux state
  var isRecording = recording ? true : false
  var isEnteredKey = enteredKey ? true : false
  var isEnteredRegion = enteredRegion ? true : false
  var isCorrectKey = correctAzureKey ? true : false
  //theme color
  var bgColor = 'black'
  if (invertColors == 1) {
    bgColor = 'white'
  } else {
    bgColor = 'black'
  }


  //  var color = invertColors ? 'black' : 'white'
  // cases where azureKey is false but isrecording is not????
  if (bgColor === 'black') {
    return (
      <div className={styles.App1} style={{
        backgroundColor: 'black',
        color: 'white',
        overflow: 'hidden',
        position: 'fixed',
      }}>
        <TopSpace height={topHeight} color={bgColor} textSize={text} setTextSize={setText} />
        <PlaceHolder height={placeHeight} color={bgColor} textSize={sizeString} />
        <MiddleSpace height={midHeight} color={bgColor} />
        <Captions height={botHeight} textSize={sizeString} text={text}/>


        {/* <DNDTest /> */}
      </div>
    )
  } else {

    return (
      <div className={styles.App2} style={{
        backgroundColor: 'white',
        color: 'black',
        overflow: 'hidden',
        position: 'fixed',
      }}>
        <TopSpace height={topHeight} color={bgColor} textSize={text} setTextSize={setText} />
        <PlaceHolder height={placeHeight} color={bgColor} textSize={sizeString} />
        <MiddleSpace height={midHeight} color={bgColor} />
        <Captions height={botHeight} textSize={sizeString} text={text}/>
        {/* <DNDTest /> */}
      </div>
    )
  }
  // You can't comment in JSX.
  // The style tag is the easiest way to set style based on JS variables.

}

var timer = 30
  , isTimerStarted = false;
var myTime;
function checkIfStillHere() {
  swal({
    title: 'Are you still here?',
    confirmButtonText: "OK",
    icon: 'warning',
    text: 'If you want to continue using Azure Recogition click ok.  \n You have ' + timer + ' seconds.',
    timer: !isTimerStarted ? timer * 1000 : undefined,

  }
  ).then(function (isConfirm) {
    if (isConfirm) {
      swal({
        title: 'Continue using Azure Recognition.',
        icon: 'success',
        timer: 2000,
        buttons: false,
      });
      timer = 30;
      clearTimeout(myTime);
    }
  });

  isTimerStarted = true;
  if (timer) {
    timer--;
    myTime = setTimeout(checkIfStillHere, 1000);
  } else {
    swal({
      title: "Reloading...",
      icon: 'error',
      timer: 3000,
      buttons: false,
    });
    window.location.reload(true);
  }
}
