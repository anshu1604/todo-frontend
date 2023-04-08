import PropTypes from 'prop-types';
import { Typography, Tab, Tabs, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';
import ListStyle from '../common/molecule/ListStyle';
import { config } from '../../config';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Grid
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
        </Grid>
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

export default function BasicTabs() {
    const [value, setValue] = useState(0);

    //API URL start
    const todoListUrl = config.API_BASE_URL_DEV + '/api/todo/active-task';
    const deleteListUrl = config.API_BASE_URL_DEV + '/api/todo/deleted-task';
    const doneListUrl = config.API_BASE_URL_DEV + '/api/todo/done-task';
    //API URL end

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Todo" {...a11yProps(0)} />
                    <Tab label="Done" {...a11yProps(1)} />
                    <Tab label="Deleted" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <ListStyle url={todoListUrl} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ListStyle url={doneListUrl} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ListStyle url={deleteListUrl} />
            </TabPanel>
        </Box>
    );
}

