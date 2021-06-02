import React from 'react'
import ReactDOM from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import store from '../../../../store/';
import swal from 'sweetalert';
class StreamTextKey extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState( {value: event.target.value});
  }

  handleSubmit(event) {
    store.streamText = this.state.value;
    swal({
      text: "Key Entered",
      icon: "success",
    })
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit = {this.handleSubmit}>
      <label>
        StreamText Event Key:
        <input type = "text" value = {this.state.value} onChange = {this.handleChange} />
      </label>
        <input type = "submit" value = "Submit" />
      </form>
    );
  }
}

export default StreamTextKey;
