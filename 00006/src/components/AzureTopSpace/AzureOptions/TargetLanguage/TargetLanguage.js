import React, { useState } from 'react';
import onClickOutside from 'react-onclickoutside';
import Select from 'react-select';
import store from '../../../../store';
import './TargetLanguage.css'

const options = [
  {value: 'ar', label: 'Arabic'},
  {value: 'ca', label: 'Catalan'},
  {value: 'da', label: 'Danish'},
  {value: 'de', label: 'German'},
  {value: 'en', label: 'English'},
  {value: 'es', label: 'Spanish'},
  {value: 'fi', label: 'Finnish'},
  {value: 'fr', label: 'French'},
  {value: 'hi', label: 'Hindi'},
  {value: 'it', label: 'Italian'},
  {value: 'ja', label: 'Japanese'},
  {value: 'ko', label: 'Korean'},
  {value: 'nb', label: 'Norwegian'},
  {value: 'nl', label: 'Dutch'},
  {value: 'pl', label: 'Polish'},
  {value: 'pt', label: 'Portuguese'},
  {value: 'ru', label: 'Russian'},
  {value: 'sv', label: 'Swedish'},
  {value: 'zh', label: 'Chinese'},
]

class TargetLanguage extends React.Component {
    constructor() {
      super();
      store.targetLanguage = localStorage.getItem('azure_target_language');
      store.targetLanguageFull = localStorage.getItem('azure_target_language_full');
      this.state = {
        value: "en",
        label: "English"
      }
      this.handleChange = this.handleChange.bind(this);

    }
    handleChange = (selectedOption) => {
        this.setState({value: selectedOption.value});
        this.setState({label: selectedOption.label});
        store.targetLanguage = selectedOption.value;
        store.targetLanguageFull = selectedOption.label
        localStorage.setItem('azure_target_language', selectedOption.value);
        localStorage.setItem('azure_target_language_full', selectedOption.label);

    }
    render(){
      const currVal = {value: null, label: store.targetLanguageFull}
      const { selectedOption } = this.state;
      return (
        <div>
          <Select id="targetLang" value ={currVal} onChange={this.handleChange} options = {options}/>
        </div>
      );
    }
  }

export default TargetLanguage;
