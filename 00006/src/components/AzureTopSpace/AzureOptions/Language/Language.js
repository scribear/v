import React, { useState } from 'react';
import onClickOutside from 'react-onclickoutside';
import Select from 'react-select';
import store from '../../../../store';
import './Language.css'

const options = [
  {value: 'ar-EG', label: 'Arabic - EG'},
  {value: 'ca-ES', label: 'Catalan - ES'},
  {value: 'da-DK', label: 'Danish - DK'},
  {value: 'da-DK', label: 'Danish - DK'},
  {value: 'de-DE', label: 'German - DE'},
  {value: 'en-AU', label: 'English - AU'},
  {value: 'en-CA', label: 'English - CA'},
  {value: 'en-GB', label: 'English - GB'},
  {value: 'en-IN', label: 'English - IN'},
  {value: 'en-NZ', label: 'English - NZ'},
  {value: 'en-US', label: 'English - US'},
  {value: 'es-ES', label: 'Spanish - ES'},
  {value: 'es-MX', label: 'Spanish - MX'},
  {value: 'fi-FI', label: 'Finnish - FI'},
  {value: 'fr-CA', label: 'French - CA'},
  {value: 'fr-FR', label: 'French - FR'},
  {value: 'hi-IN', label: 'Hindi - IN'},
  {value: 'it-IT', label: 'Italian - IT'},
  {value: 'ja-JP', label: 'Japanese - JP'},
  {value: 'ko-KR', label: 'Korean - KR'},
  {value: 'nb-NO', label: 'Norwegian - NO'},
  {value: 'nl-NL', label: 'Dutch - NL'},
  {value: 'pl-PL', label: 'Polish - PL'},
  {value: 'pt-BR', label: 'Portuguese - BR'},
  {value: 'pt-PT', label: 'Portuguese - PT'},
  {value: 'ru-RU', label: 'Russian - RU'},
  {value: 'sv-SE', label: 'Swedish - SE'},
  {value: 'zh-CN', label: 'Chinese - CN'},
  {value: 'zh-HK', label: 'Chinese - HK'},
  {value: 'zh-TW', label: 'Chinese - TW'},
]

class LanguageOptions extends React.Component {
  constructor() {
    super();
    store.currentLanguage = localStorage.getItem('azure_language');
    store.currentLanguageFull = localStorage.getItem('azure_language_full');

    this.state = {
      label: "en",
    }
    this.handleChange = this.handleChange.bind(this);

  }
  handleChange = (selectedOption) => {
      this.setState({selectedOption});
      store.currentLanguage= selectedOption.value;
      store.currentLanguageFull = selectedOption.label
      localStorage.setItem('azure_language', selectedOption.value);
      localStorage.setItem('azure_language_full', selectedOption.label);


  }
  render(){
    const currVal = {value: null, label: store.currentLanguageFull}
    const { selectedOption } = this.state;
    return (
      <div>
        <Select id="targetLang" value ={currVal} onChange={this.handleChange} options = {options}/>
      </div>
    );
  }
}

export default LanguageOptions;
