import React from 'react'
import store from '../../../store/';
import $ from 'jquery';
import Async from 'react-async';
import ScrollButton from 'react-scroll-button'
import ScrollToBottom from 'react-scroll-to-bottom';
import ApiStatus from '../ChangeAPI/ChangeAPI.js'
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk'
import Key from '../../AzureTopSpace/AzureOptions/Key/Key.js';
import { isPureish } from '@babel/types';
import swal from 'sweetalert';
import { useSelector, connect, useDispatch } from 'react-redux'
import { bindActionCreators } from "redux"


export default function TestFunct(props) {
     //const setting = useSelector(props.setting)
     // useDispatch returns the state modifying function, invoked below.
     const dispatch = useDispatch()

     return (
          <div>
               {props.item}
               <label className="switch">
                    <input type="checkbox" onChange={() => dispatch(props.action())}></input>
                    <span className="slider"></span>
               </label>
          </div>
     )
}
