import React from 'react'
import Fade from '@material-ui/core/Fade';
import store from '../../../store';
import './Azure.css'
import { Avatar, Button, Tooltip } from "@material-ui/core"
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import mytheme from './../theme'
import StreamTextKey from './StreamTextKey'
import CheckCircleIcon from '@material-ui/icons/CheckCircleTwoTone';
import RemoveCircleIcon from '@material-ui/icons/ErrorTwoTone';
import HelpTwoToneIcon from '@material-ui/icons/HelpTwoTone';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { ThemeProvider } from "@material-ui/core/styles";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Key from './Key/Key'
import "./../Drawer.css"

const Azure = (props) => {
  const yo = CheckCircleIcon;
  var colorr = "green"
  const { dropDown, handleDropClose, handleDrop, handleSwitchToWebspeech, useStyles, SuccessSwitch, AzureImage, StreamTextImage, handleSwitchToAzure, handleSwitchToStreamText,} = props;
  var source = 'https://avatars.githubusercontent.com/u/7565578?s=280&v=4.png'
  if (props.currentAPI == 1) {
    source = 'https://dz2cdn1.dzone.com/storage/temp/12165862-azurelogo-1.png'
  } else if (props.currentAPI == 2) {
    source = 'https://streamtext.net/wp-content/uploads/2017/12/srtream-x.png'
  }

  return (
    <>
    <SuccessSwitch/>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        variant="contained"
        variant="text"
        color="inherit"
        onClick={handleDrop}
        startIcon={<Avatar
          src={source}
          variant='square'
        />} />
      <Menu
        id="simple-menu"
        anchorEl={dropDown}
        keepMounted
        open={Boolean(dropDown)}
        onClose={handleDropClose}
      >
        <Tooltip TransitionComponent={Fade} title="Item1" arrow>
          <MenuItem>
            <CheckCircleIcon className="MuiSvgIcon-root-17" >
            </CheckCircleIcon>
            <Button onClick={handleSwitchToWebspeech}>Webspeech</Button>
          </MenuItem>
        </Tooltip>
        <Tooltip TransitionComponent={Fade} title="Item2" arrow>
          <MenuItem>
            <AzureImage/>
            <Button onClick={handleSwitchToAzure}>Microsoft Azure</Button>

          </MenuItem>
        </Tooltip>
        <Tooltip TransitionComponent={Fade} title="Item3" arrow>
          <MenuItem>
            <StreamTextImage/>
            <Button onClick={handleSwitchToStreamText}>StreamText</Button>

          </MenuItem>
        </Tooltip>
      </Menu>

    </>
  )
};

export default Azure;
