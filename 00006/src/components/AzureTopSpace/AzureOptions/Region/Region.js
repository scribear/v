import React, { useState } from 'react';
import onClickOutside from 'react-onclickoutside';
import Select from 'react-select';
import store from '../../../../store';
import './Region.css'

const optionsNA = [
  { value: 'brazilsouth', label: 'Southern Brazil' },
  { value: 'canadacentral', label: 'Central Canada' },
  { value: 'centralus', label: 'Central US' },
  { value: 'northcentralus', label: 'Northern Central US' },
  { value: 'westcentralus', label: 'westcentralus' },
  { value: 'southcentralus', label: 'Southern Central US' },
  { value: 'eastus', label: 'Eastern US' },
  { value: 'eastus2', label: 'Eastern US 2' },
  { value: 'westus', label: 'westus' },
  { value: 'westus2', label: 'Western US 2' },

]

const optionsAS = [
  { value: 'australiaeast', label: 'Eastern Australia' },
  { value: 'eastasia', label: 'Eastern Asia' },
  { value: 'southeastasia', label: 'Southeast Asia' },
  { value: 'centralindia', label: 'Central India' },
  { value: 'japaneast', label: 'Eastern Japan' },
  { value: 'japanwest', label: 'Western Japan' },
  { value: 'koreacentral', label: 'Central Korea' },

]

const optionsEU = [
  { value: 'northeurope', label: 'Northern Europe' },
  { value: 'westeurope', label: 'Western Europe' },
  { value: 'francecentral', label: 'Central France' },
  { value: 'uksouth', label: 'Southern UK' },
]

const all = [
  {
    label: "Americas",
    options: optionsNA
  },
  {
    label: "Asia Pacific",
    options: optionsAS
  },
  {
    label: "Europe",
    options: optionsEU
  },
]
class RegionOptions extends React.Component {
  constructor() {
    super();
    store.azureRegionOptionsReducer = localStorage.getItem('azure_region');

    this.state = {
      label: null
    }
    this.handleChange = this.handleChange.bind(this);

  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    store.azureRegionOptionsReducer = selectedOption.label;
    localStorage.setItem('azure_region', selectedOption.label);
  }
  render() {
    const currVal = { value: null, label: store.azureRegionOptionsReducer }
    const { selectedOption } = this.state;
    return (
      <div>
        <Select id="region" value={currVal} onChange={this.handleChange} options={all} />
      </div>
    );
  }
}
export default RegionOptions;
