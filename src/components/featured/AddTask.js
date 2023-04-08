import { Box, InputBase, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect, useState } from 'react';
import { AddItem } from '../../app/commonSlice';
import { useDispatch, useSelector } from 'react-redux';
import { config } from '../../config';
import useFetch from '../../functions/useFetch';
import Backdrop from '../common/atom/Backdrop';

export default function AddTask() {

    const isEdit = useSelector(state => state.common.isEdit);
    const idEdit = useSelector(state => state.common.idEdit);
    const isAdd = useSelector(state => state.common.isAdd);
    const isDeleted = useSelector(state => state.common.isDeleted);
    const isDone = useSelector(state=> state.common.isDone);

    const gettaskDetailUrl = config.API_BASE_URL_DEV + '/api/todo/details/' + idEdit;
    const { data: editTask, isLoading, error } = useFetch(gettaskDetailUrl, [isEdit]);

    useEffect(() => {
        editTask && setTask(editTask.task);
    }, [editTask])

    const [task, setTask] = useState('');
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        const payload = { task };

        fetch(!isEdit ? config.API_BASE_URL_DEV + "/api/todo/add" : config.API_BASE_URL_DEV + '/api/todo/edit/' + idEdit, {
            method: !isEdit ? 'POST' : 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).then(() => {
            dispatch(AddItem(true));
            dispatch(isEdit(false));
            dispatch(idEdit(null));
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setTask('');
        })
    }

    const handleChange = (e) => {
        setTask(e.target.value);
    }

    return (
        <>
            <Backdrop load={isLoading} add={isAdd} deleted={isDeleted} done={isDone} edit={isEdit}  />
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', background: '#F1F3F5' }}>
                <InputBase
                    sx={{ flex: 1 }}
                    placeholder="Add new task"
                    onChange={(e) => handleChange(e)}
                    value={task}
                    type='text'
                />

                <IconButton type="button" aria-label="search" onClick={(e) => handleClick(e)}>
                    <AddCircleIcon fontSize='large' />
                </IconButton>
            </Box>
        </>
    );
}