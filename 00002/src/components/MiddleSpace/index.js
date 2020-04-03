import React from 'react'
import Index from './Loudness/index'
import './index.css'
import { useSelector } from 'react-redux'

export default function MiddleSpace(props) {
    var h = props.height
    const mic = useSelector((state) => state.mic)
    const color = useSelector((state) => state.invertColors)
   //  var wid = "calc(100vh - 2 * " + paddingString + ")"
   //  if(window.innerHeight > window.innerWidth) {
   //    wid = "calc(100vw - 2 * " + paddingString + ")"
   //  }

    return ( <div className="MiddleSpace"
         style={{
           height: h,
           width: "100vw",
           overflow:"hidden" }}>
             <Index ismic = {mic} iscolor = {color} style={{
               position:"relative",
             }}/>
         </div> )
}
