import { Typography, Grid, Paper } from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import useFetch from '../../../functions/useFetch';
import putTask from "../../../functions/putTask";
import { useDispatch, useSelector } from 'react-redux';
import { config } from '../../../config';
import { DeleteItem, DoneItem, EditItem } from '../../../app/commonSlice';
import Backdrop from '../atom/Backdrop';


const ListStyle = (props) => {
    const { url } = props;
    const todoListUrl = config.API_BASE_URL_DEV + '/api/todo/active-task';
    const deleteListUrl = config.API_BASE_URL_DEV + '/api/todo/deleted-task';
    const doneListUrl = config.API_BASE_URL_DEV + '/api/todo/done-task';

    const dispatch = useDispatch();

    const isAdd = useSelector(state => state.common.isAdd)
    const isDeleted = useSelector(state => state.common.isDeleted)
    const isDone = useSelector(state => state.common.isDone)

    const { data, isLoading, error } = useFetch(url, [isDeleted, isAdd, isDone]);

    const handleEdit = (id) => {
        const payload = {
            id: id,
            isEdit: true
        }
        dispatch(EditItem(payload));
    }
    const handleDone = (id) => {
        putTask(config.API_BASE_URL_DEV + '/api/todo/done/' + id);
        dispatch(DoneItem(true));
    }
    const handleDelete = (id) => {

        putTask(config.API_BASE_URL_DEV + "/api/todo/delete/" + id);
        dispatch(DeleteItem(true));
    }



    return (
        <>
            <Backdrop load={isLoading} />
            {error && <Grid>{error}</Grid>}
            {data && (
                data?.map((item, index) => {
                    return (
                        <Paper elevation={2} key={item.id} className='my-10'>
                            <Grid container>
                                <Grid item textAlign='left' lg={10} md={9} sm={12} xs={12}>
                                    <Typography className='task-text-style'>{item.task}</Typography>
                                </Grid>
                                {url === todoListUrl &&
                                    <Grid item textAlign='right' lg={2} md={3} sm={12} xs={12}>
                                        <EditOutlinedIcon className="icon-btn-style" onClick={() => handleEdit(item.id)} />
                                        <TaskAltOutlinedIcon className="icon-btn-style" onClick={() => handleDone(item.id)} />
                                        <DeleteOutlinedIcon className="icon-btn-style" onClick={() => handleDelete(item.id)} />
                                    </Grid>
                                }
                            </Grid>
                        </Paper>
                    )
                })
            )}
        </>
    );
}

export default ListStyle;