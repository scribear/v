
import React from 'react'
import store from '../../../../store/';
import swal from 'sweetalert';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.lang = 'en-US'
recognition.continuous = false
recognition.interimResults = true

// In this document, a 'line' is more like a sentence.
// this.state.line is like a buffer of text held at the end of the page. When the line
// is finished, the buffer is flushed: a new div is appended to the 'out' div and
// this.state.line is reset for the next line.
var base = "https://www.streamtext.net/player?event=IHaveADream&chat=false&controls=false&header=false&footer=false&ff=Tahoma&fs="
base += 48 + "&fgc=FFFFFF&"
class StreamTest extends React.PureComponent {
   constructor(props) {
        super(props)
        this.state = {
             line: '',
             //recording: true
        }
        this.checkIframeLoaded = this.checkIframeLoaded.bind(this)
        this.afterLoading = this.afterLoading.bind(this)
        this.authenticate = this.authenticate.bind(this)
   }

   componentDidMount(props) {
      if (this.props.checkKey) {
          this.authenticate()
      }
        return;
   }
   // Global state 'recording' is passed as a prop. componentDidUpdate is invoked
   // when props change, therefore also when 'recording' changes.
   componentDidUpdate(prevProps, prevState) {
      if (this.props.checkKey != prevProps.checkKey) {
        if (this.props.checkKey) {
          this.authenticate()
        }
      }
      return;
   }

   authenticate() {
     this.checkIframeLoaded()
   }

   checkIframeLoaded() {
    var iframe = document.getElementById('StreamTextDemo');
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    if (  iframeDoc.readyState  == 'complete' ) {
        this.afterLoading();
        return;
    }
    window.setTimeout(this.checkIframeLoaded, 100);
}

afterLoading(){
    swal({
      title: "Success!",
      text: "Connected StreamText Server!",
      icon: "success",
      timer: 2000,
    })
    store.streamTextStatus = 2;
}



   render() {
        // out holds all past lines. curr holds the current line.


   }
}

export default StreamTest
