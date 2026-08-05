import React from 'react'
import OnOff from './OnOff'
import Record from './Record'
import Slider from './Slider'
import store from '../../../store'
import Micvisual from './Micvisual'
import Save from './Save'
import {useSelector} from "react-redux"
import Instru from "./Instru"
import Divider from '@material-ui/core/Divider';
import AzureTopSpace from '../../AzureTopSpace'
import './index.css'
import SwipeableTemporaryDrawer from "../../Drawer"
import MenuHider from '../../PlaceHolder/MenuHider'

import {
  flip_instructions,

     flip_switchMenus,
     flip_invertColors,
     flip_micVisual,
     increment_textSize,
     decrement_textSize,
     increment_lineWidth,
     decrement_lineWidth,
     increment_numLines,
     decrement_numLines
} from '../../../redux/actions'

export default function Options() {
     // These are functions that take an object and return an element of the object.
     // They are passed to useSelector, which feeds the global state object into them.
     const textSize = (state) => state.textSize
     const lineWidth = (state) => state.lineWidth
     const numLines = (state) => state.numLines
     const invertColors = (state) => state.invertColors
     const switchMenus = (state) => state.switchMenus
     const ins = (state) => state.ins
     const if_ins = useSelector((state) => state.ins)
var choice = if_ins ? 'appear' : 'disappear';

     var botHeight = 36
     var midHeight = 32
     var topHeight = 100 - botHeight + 'vh'
     if (store.isSuccessReducer == 'success') {
       return (
            <div className="Options" id="options-space">
                <h2 style = {{fontFamily:"Arial"}}>OPTIONS</h2>
                <Divider/>
                <div className="item-wrapper">
                    <Save />
                 </div>
                 <div className="item-wrapper">
                      <Slider item="Text size" setting={textSize}
                           increment={increment_textSize}
                           decrement={decrement_textSize} />
                 </div>
                 <div className="item-wrapper">
                      <Slider item="Line width" setting={lineWidth}
                           increment={increment_lineWidth}
                           decrement={decrement_lineWidth} />
                 </div>
                 <div className="item-wrapper">
                      <OnOff item="Invert colors" setting={invertColors}
                           action={flip_invertColors} />
                 </div>
                 <div className= "item-wrapper">
                    <Instru item="Instructions" setting = {ins}
                     action = {flip_instructions} />
               </div>
                 <div className="item-wrapper">
                      <Micvisual />
                 </div>
                 <div className="item-wrapper">
                      <Record />
                 </div>
                 <Divider />
               <div className = {choice}>
                    <p style = {{margin:0}}>-The text size button can be used to change size of
                    text shown in caption space.</p>
                    <p style = {{margin:0}}>-There are 3 different graph can be toggled to help
                    reflex the surrounding voices by clicking forth button</p>
                    <p style = {{margin:0}}>-For circular graph, try to drag it around.</p>
                    <p style = {{margin:0}}>-To stop captioning just click switch button for Recording. Also
                    click again to resume captioning.</p>
                    <p style = {{margin:0}}>-To memorize textsize option, click save after chose a proper size of the text.</p>
               </div>
            </div>
       );
     } else {
     return (
          <div className="Options" id="options-space">
          <h2 style = {{fontFamily:"Arial"}}>OPTIONS</h2>
          <Divider/>
          <div className="item-wrapper">
              <Save />
           </div>
               <div className="item-wrapper">
                    <Slider item="Text size" setting={textSize}
                         increment={increment_textSize}
                         decrement={decrement_textSize} />
               </div>
               <div className="item-wrapper">
                    <Slider item="Line width" setting={lineWidth}
                         increment={increment_lineWidth}
                         decrement={decrement_lineWidth} />
               </div>
               <div className="item-wrapper">
                    <OnOff item="Invert colors" setting={invertColors}
                         action={flip_invertColors} />
               </div>
               <div className= "item-wrapper">
                    <Instru item="Instructions" setting = {ins}
                     action = {flip_instructions} />
               </div>
               <div className="item-wrapper">
                    <Micvisual />
               </div>
               <div className="item-wrapper">
                    <Record />
               </div>
               <div className="item-wrapper">
                    <AzureTopSpace button="Switch To Azure" setting={switchMenus}
                         action={flip_switchMenus} />
               </div>
               <Divider />
               <div className = {choice}>
                    <p style = {{margin:0}}>-The text size button can be used to change size of
                    text shown in caption space.</p>
                    <p style = {{margin:0}}>-There are 3 different graph can be toggled to help
                    reflex the surrounding voices by clicking forth button</p>
                    <p style = {{margin:0}}>-For circular graph, try to drag it around.</p>
                    <p style = {{margin:0}}>-To stop captioning just click switch button for Recording. Also
                    click again to resume captioning.</p>
                    <p style = {{margin:0}}>-To memorize textsize option, click save after chose a proper size of the text.</p>
               </div>
          </div>
     );
   }
}
