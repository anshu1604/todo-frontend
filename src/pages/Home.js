import { Grid } from '@mui/material';
import AddTask from "../components/featured/AddTask.js";
import TabList from '../components/featured/TabList.js';
import Copyright from "../components/common/atom/Copyright.js";

const Home = () => {

    return (
        <Grid>
            <Grid>
                <AddTask />
                <TabList />
            </Grid>
            <Grid className='copyright'>
                <Copyright />
            </Grid>
        </Grid>
    );
}

export default Home;