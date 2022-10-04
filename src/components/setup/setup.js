import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Assignees from './assigneeSetup'
import TicketLists from './ticketListsSetup'
import Options from './optionsSetup'
import { Scrollbars } from 'react-custom-scrollbars';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Setup() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const refresh = (newValue) => {
      setValue(newValue);
    };
  
  
    return (
      
        <Scrollbars style={{ height: 800, backgroundColor: '#f0e9e4'}}>
          <div style={{width: '798px'}}>
            <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange}>
                <Tab label="Assignees" {...a11yProps(0)} />
                <Tab label="Ticket Lists" {...a11yProps(1)} />
                <Tab label="Options" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Assignees refresh={refresh}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TicketLists/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Options/>
            </TabPanel>
            </Box>
          </div>
        </Scrollbars>
    );
}

