import React from 'react'
import ReactDOM from 'react-dom'
import store from '../../../store/';
import $ from 'jquery'
import { useSelector, useDispatch, getState } from 'react-redux'
import { If } from 'react-control-statements'
import { useTimer } from 'react-timer-hook';
import swal from 'sweetalert';
import { bot_size, invertColors, textSize, flip_check_streamText_Key} from '../../../redux/actions'

var adder = 20;
let fontSize = document.querySelector("#fontSize");
let scroll = document.querySelector("#scroll");
let fontFamily = document.querySelector("#fontFamily");
let backColor = document.querySelector("#backColor");
let foreColor = document.querySelector("#foreColor");
let language = document.querySelector("#language");
let languageLabel = document.querySelector("#languageLabel");
var base = "https://www.streamtext.net/player?event=IHaveADream"
var streamTextWindow;
export default function StreamTextRender(props) {
    const dispatch = useDispatch()
    const bot_mode = useSelector((state)=>state.botsize);
    var prev = false;
    const invert_colors = useSelector((state)=>state.invertColors);
    var textSize = props.textSize * 6;
    const checkKey = useSelector((state)=>state.checkStreamTextKey);
    if (checkKey) {
      localStorage.setItem('azure_subscription_key', 1);
      setTimeout(() => {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", 'https://www.streamtext.net/player?event=IHaveADm', true ); // false for synchronous request
            xmlHttp.send( null );
            streamTextWindow = xmlHttp.responseText
            // streamTextWindow.postMessage(JSON.stringify({ operation: "update-options", options: {textSize: "48px"} }), "*");
             store.streamTextStatus = 1;
        dispatch(flip_check_streamText_Key())
      }, 2000)
    }

    // streamTextWindow.postMessage(JSON.stringify({ operation: "update-options", options: options }), "*");
    var bcgColor = invert_colors ? 'white' : 'black';
    // document.querySelector("#streamTextIFrame").src = "//www.streamtext.net/player/embedded" + document.location.search + "&annotations=1";

    window.addEventListener("message", receiveMessage, false);

    // document.addEventListener("DOMContentLoaded", function () {
    //   fontSize.addEventListener("change", function (e) {
    //     updateStreamTextWindow({ fontSize: e.target.value });
    //   });
    // });
    if (props.desiredAPI == 2) {
      if (document.getElementById("StreamTextDemo") != null) {
        document.getElementById("StreamTextDemo").src = "https://www.streamtext.net/player?event=" + store.streamText + "&chat=false&controls=false&header=false&footer=false&ff=Tahoma&fs=" + textSize + "&fgc=FFFFFF&";
      }
      return (
        <div>

    <iframe id = "StreamTextDemo"
      frameborder = "0"
      width = "100%"
      height = "400vh"
    >
    </iframe>
    </div>


      );
  } else {
    return( null )
  }
}
function receiveMessage(event) {
  streamTextWindow = document.getElementById("StreamTextDemo")
  if (streamTextWindow == null) {
    return;
  }
  let option = document.createElement("option");
  option.value = "" + adder + "px";
  option.label = "fontSize";
  streamTextWindow.contentWindow.postMessage(JSON.stringify({ operation: "update-options", options: option }), "*");
}

function updateOptions(options) {
  if (options.fontFamily) fontFamily.value = options.fontFamily;
  if (options.fontSize) fontSize.value = options.fontSize;
  if (options.foreColor) foreColor.value = options.foreColor;
  if (options.backColor) backColor.value = options.backColor;
  if (options.scroll !== undefined) scroll.checked = options.scroll;
  if (options.languages && options.languages.length > 1) {
    language.innerHTML = ""; //clear the options if they exist
    language.style.display = "unset";
    languageLabel.style.display = "unset";
    options.languages.forEach(function (lang) {
      let option = document.createElement("option");
      option.value = lang.value;
      option.label = lang.label;
      language.appendChild(option);
    });
    language.value = options.language;
  }
}

function updateStreamTextWindow(options) {
  if (!streamTextWindow) return;
}
