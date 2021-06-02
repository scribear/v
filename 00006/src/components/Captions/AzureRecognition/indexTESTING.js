import React from 'react'
import store from '../../../store/';
import $ from 'jquery';
import Async from 'react-async';

import ScrollButton from 'react-scroll-button'
import ScrollToBottom from 'react-scroll-to-bottom';
import ApiStatus from '../ChangeAPI/ChangeAPI.js'
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk'
import { ResultReason } from 'microsoft-cognitiveservices-speech-sdk';
import Key from '../../AzureTopSpace/AzureOptions/Key/Key.js';
import { isPureish } from '@babel/types';
import swal from 'sweetalert';
import { useSelector, connect, useDispatch } from 'react-redux'
import { bindActionCreators } from "redux"

//Azure Variables
var reco = null;
var key = "empty"
var regionOption = "empty"
var lang = "en-US"
var targetLang = "en"
var SpeechConfig = null;
const azureAudioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();

//Webspeech Variables
export class AzureRecognition extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      rendert: false,
      render1: '',
      currentAPI: 'webspeech',
      line: '',
      targetID: 'curr',
    }
    this.AppendLine = this.AppendLine.bind(this)
    this.azureStart = this.azureStart.bind(this)
    this.azureStop = this.azureStop.bind(this)
  }

  componentDidMount(props) {
    this.azureStart()
    //
    // if (this.props.desiredAPI == 1) {
    // } else {
    //   return
    // }
  }

  // cases
  // checkAzureKey
  // DesiredAPI SWITCHED
  // RECORDING CHANGED

  // Global state 'recording' is passed as a prop. componentDidUpdate is invoked
  // when props change, therefore also when 'recording' changes.
  async componentDidUpdate(prevProps, prevState) {
  //   if (this.props.desiredAPI == 1) {
  //     store.isSuccessReducer = "success";
  //   }
  //   if (store.isSuccessReducer == "inProgress") {
  //     setTimeout(function() { //Start the timer
  //       this.setState({render: true}) //After 1 second, set render to true
  //     }.bind(this), 1000)
  //   }
  //   if (this.props.checkAzureKey) {
  //     store.isSuccessReducer = "inProgress"
  //     this.azureStart()
  //       setTimeout(function(){ //Start the timer
  //         this.setState({render: true}) //After 1 second, set render to true
  //       }.bind(this), 1000)
  //   }
  //   if (this.props.desiredAPI == 1) {
  //     if (prevProps.desiredAPI == 1) {
  //       if (this.props.isRecording == prevProps.isRecording) {
  //         return
  //       } else {
  //         if (this.props.isRecording == false) {
  //           this.azureStop()
  //           return
  //         } else {
  //           this.azureStart()
  //           return
  //         }
  //       }
  //     } else {
  //       this.azureStart()
  //       return
  //     }
  //
  //   } else {
  //     if (prevProps.desiredAPI == 1 && this.props.isRecording == true) {
  //       this.azureStop()
  //     } else {
  //       return;
  //     }
  //   }
  //   return
  // }
  this.azureStart();
}

  downloadTxtFile = () => {
    const element = document.createElement("a");
    var results = [];
    results.push("transcript History \n\n\n\n");
    var searchEles = document.getElementById("out");
    results.push(searchEles.innerHTML);
    const file = new Blob([results], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = "Script.txt";
    document.body.appendChild(element);
    element.click();
  }


  AppendLine(str) {
    const capts = document.getElementById('captionsSpace')
    const out = document.getElementById('out')
    var isScrolledToBottom = capts.scrollHeight - capts.clientHeight <= capts.scrollTop + 1
    var div = document.createElement('div') // create new div
    div.textContent = str // set new div's text to the updated current line
    out.appendChild(div) // add the new div to the document inside 'out' element
    this.setState({ line: '' }) // reset line
    if (isScrolledToBottom)
      capts.scrollTop = capts.scrollHeight - capts.clientHeight // scroll to bottom
  }

  async azureStart() {
    console.log("AYOYOYOYOYOYO")
    this.rendert = true;
    if (store.azureKeyReducer == null || store.azureRegionOptionsReducer == null) {return}
        const speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(store.azureKeyReducer, store.azureRegionOptionsReducer);
        speechConfig.speechRecognitionLanguage = 'en-US';

        const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
        const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

        this.setState({
            render1: 'speak into your microphone...'
        });

        recognizer.recognizeOnceAsync(result => {
            let render1;
            console.log(result.reason);
            if (result.reason === ResultReason.RecognizedSpeech) {
                console.log("WIN");
                this.render1 = `RECOGNIZED: Text=${result.text}`

            } else {
                console.log("FAIL");
                this.render1 = 'ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.';
            }

            this.setState({
                render1: render1
            });
        });
    // if (store.isSuccessReducer != 'success' && store.isSuccessReducer != 'done') {
    //   if (store.isSuccessReducer == 'inProgress') {
    //     if (store.azureKeyReducer == undefined || store.azureRegionOptionsReducer == undefined || store.azureKeyReducer == '' || store.azureRegionOptionsReducer == '') {
    //       store.azureKeyReducer = 'empty'
    //       store.azureRegionOptionsReducer = 'empty'
    //     } else {
    //       key = store.azureKeyReducer;
    //       regionOption = store.azureRegionOptionsReducer;
    //     }
    //   }
    // }
    // if (store.currentLanguage == undefined) {
    //   lang = "en-US"
    // } else {
    //   lang = store.currentLanguage
    // }
    // if (store.targetLanguage == undefined) {
    //   targetLang = "en"
    // } else {
    //   targetLang = store.targetLanguage
    // }
    // SpeechConfig = SpeechSDK.SpeechTranslationConfig.fromSubscription(key, regionOption);
    // SpeechConfig.speechRecognitionLanguage = lang;
    // SpeechConfig.addTargetLanguage(targetLang);
    // //allow all profanity (raw);
    // SpeechConfig.setProfanity(2);
    // reco = new SpeechSDK.TranslationRecognizer(SpeechConfig, azureAudioConfig);
    // reco.recognizeOnceAsync(result => {
    //   console.log("HELLO!");
    //   let displayText;
    //   if (result.reason === ResultReason.RecognizedSpeech) {
    //         swal({
    //           title: "Success!",
    //           text: "Connected to Azure Speech Recognition!",
    //           icon: "success",
    //           timer: 2000,
    //         })
    //   } else {
    //         swal({
    //           title: "Warning!",
    //           text: "Wrong key or region!",
    //           icon: "warning",
    //         })
    //   }
    // });

    // var out = await document.getElementById('out');
    // var lastRecognized = out.innerHTML;
    // reco.sessionStarted = async function (s, e) {
    //   if (store.desiredAPI != 1 && store.isSuccessReducer != 'done'  && store.isSuccessReducer != 'success') {
    //
    //     swal({
    //       title: "Success!",
    //       text: "Connected to Azure Speech Recognition!",
    //       icon: "success",
    //       timer: 2000,
    //     })
    //   }
    //   store.isSuccessReducer = 'success';
    //   store.desiredAPI = 1;
    //
    // }
    // reco.canceled = async function (s, e) {
    //   store.isSuccessReducer = 'failure'
    //
    //   if (store.isSuccessReducer != 'success') {
    //     store.azureIsStart = "false";
    //     swal({
    //       title: "Warning!",
    //       text: "Wrong key or region!",
    //       icon: "warning",
    //     })
    //   }
    // };
    // reco.recognizing = function (s, e) {
    //   var language = targetLang;
    //   out.innerHTML = lastRecognized + e.result.translations.get(language);
    //   const capts = document.getElementById('captionsSpace')
    //   capts.scrollTop = capts.scrollHeight - capts.clientHeight // scroll to bottom
    // }
    //
    // reco.recognized = function (s, e) {
    //   var language = targetLang;
    //   lastRecognized += e.result.translations.get(language) + "\r\n";
    //   out.innerHTML = lastRecognized;
    //
    // }
  }
  azureStop() {
    store.azureIsStart = "false";
    reco.stopContinuousRecognitionAsync(
      function () {
        reco.close();
        reco = undefined;
      },
      function (err) {
        reco.close();
        reco = undefined;
      }
    );
  }
  scrollBottom() {
    var element = document.getElementById("curr");
    element.scrollIntoView({ behavior: "smooth" });
  }

  // Webspeech Render

  render() {
    console.log("next part?!");
    let renderContainer = false //By default don't render anything
    if(this.state.render) { //If this.state.render == true, which is set to true by the timer.
      return (
        <div>
          <div contenteditable="true" id='out'></div>
          <div id='curr'>{this.state.line}</div>
          <this.state.render1/>
          <ApiStatus/>
        </div>
        )
    }
    return (
      renderContainer //Render the dom elements, or, when this.state == false, nothing.
    )
    // out holds all past lines. curr holds the current line.


    }

}
export default AzureRecognition
