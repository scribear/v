import React, { Component } from 'react';
import { useSelector } from 'react-redux'


class AudioVisualiser extends Component {

  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }
  draw() {
      const { audioData } = this.props;
      const canvas = this.canvas.current;
      const height = canvas.height;
      const width = canvas.width;
      const context = canvas.getContext('2d');

      if (this.props.mic == 1){
         let x = 0;
         const sliceWidth = (width * 1.0) / audioData.length;
         context.lineWidth = 2;
         context.clearRect(0, 0, width, height);
         context.beginPath();
         context.moveTo(0, height / 2);
         for (const item of audioData) {
            const y = (item / 255.0) * height;
            context.lineTo(x, y);
            x += sliceWidth;
         }
         context.lineTo(x, height / 2);
         context.strokeStyle = this.props.iscolor ? '#000000' : '#F8F8FF';
         context.stroke();
      }
      else if (this.props.mic == 2){
          const barWidth = (width / audioData.length) * 2.5;
          let barHeight;
          let x = 0;
          context.clearRect(0,0, width, height);
          for(const item of audioData) {
            barHeight = item/2;
            //context.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
            context.fillStyle = this.props.iscolor ? '#000000' : '#F8F8FF';
            context.fillRect(x,height-barHeight/2,barWidth,barHeight);
        x += barWidth + 1;
          }
      }
}

componentDidUpdate() {
    this.draw();
  }

  render() {
    return <canvas width="1700vw" height="300vh" ref={this.canvas} />;
  }

}

export default AudioVisualiser;
