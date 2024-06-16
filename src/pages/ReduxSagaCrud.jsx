import React, { useEffect, useState } from 'react'
import { Box, Container, Fab, Typography, useMediaQuery, useTheme, Paper, IconButton, Stack, TextField } from '@mui/material'
import InfoModel from '../model/InfoModel';
import { useSelector, useDispatch } from 'react-redux';
import { dataFetch } from '../redux-saga/actions';

import { IoMdAdd } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { IoSearch } from "react-icons/io5";


const ReduxSagaCrud = () => {

    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

    const dispatch = useDispatch()

    const data = useSelector(state => state.value)

    // console.log('data', data);

    const [open, setOpen] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const [updateData, setUpdateData] = useState(null);

    const [search, setSearch] = useState();
    const [filterData, setFilterData] = useState([]);

    // console.log('filterData',filterData);


    useEffect(() => {

        let filterInfoData = [...data]

        if (search) {
            filterInfoData = filterInfoData.filter((data) => data.title.toLowerCase().includes(search) || data.description.toLowerCase().includes(search))
        }

        setFilterData(filterInfoData)

        // console.log('filterInfoData',filterInfoData);

    }, [search,data])

    const editData = (index) => {

        setOpen(true)
        setUpdateId(index)

        let copyData = [...data]

        setUpdateData(copyData[index])
    }

    const deleteData = (index) => {

        let copyData = [...data]

        copyData.splice(index, 1)

        dispatch(dataFetch(copyData))
    }

    return (
        <Box className='secondary-bgcolor' sx={{ height: '100vh' }}>
            <Container maxWidth='md' sx={{ height: '100%' }}>
                <Typography variant="h1" sx={{ fontSize: sm ? '38px' : '45px', marginBottom: '35px', position: 'sticky', top: 0 }} className='primary-color' textAlign={'center'} >
                    CRUD
                </Typography>


                <InfoModel open={open} setOpen={setOpen} updateData={updateData} setUpdateData={setUpdateData} updateId={updateId} setUpdateId={setUpdateId} />

                <Box sx={{position : 'sticky', top : 0, marginX: sm ? '10px' : '50px', marginBottom: '20px'}}>
                    <Stack className='searchBox' direction={'row'} alignItems={'center'} sx={{ position: 'relative', backgroundColor: 'rgba(126, 173, 156, 0.15)', borderRadius: '25px' }} >
                        <Box sx={{ position: 'absolute', left: 14, top: 10 }}><IoSearch color='#009c62' /></Box>
                        <TextField className='search' type='search' onChange={(e) => setSearch(e.target.value.toLowerCase())} placeholder='Search…' fullWidth size='small' sx={{ paddingLeft: '30px' }} />
                    </Stack>
                </Box>


                <Stack spacing={3} sx={{ paddingX: sm ? '15px' : '80px', height: '350px', overflowY: 'auto' }}>
                    {
                        filterData.map((infoData, index) => (
                            <Paper key={index} elevation={2} sx={{ padding: '20px' }}>
                                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ marginBottom: '10px' }}>
                                    <Typography variant="h6" fontWeight='bold'>
                                        {infoData.title}
                                    </Typography>
                                    <Stack direction={'row'} >
                                        <IconButton aria-label="edit" onClick={() => editData(index)}>
                                            <FiEdit size={'19'} />
                                        </IconButton>
                                        <IconButton aria-label="delete" onClick={() => deleteData(index)}>
                                            <MdDelete />
                                        </IconButton>
                                    </Stack>
                                </Stack>
                                <Typography variant="body1" color={'#7d7c7c'} gutterBottom>
                                    {infoData.description}
                                </Typography>
                            </Paper>
                        ))
                    }

                    <Box sx={{height : '50px'}}>
                    </Box>
                </Stack>

                {
                    !open ? (
                        <Box className='secondary-bgcolor' sx={{ position: 'fixed', bottom: 0, right: 0, left: 0, display: 'flex', justifyContent: 'center', paddingY: '14px', zIndex: '999' }}>
                            <Fab size="medium" onClick={() => setOpen(true)} className='primary-bgcolor' sx={{ color: '#fff' }} aria-label="add">
                                <IoMdAdd size='22' />
                            </Fab>
                        </Box>) : null
                }

            </Container>
        </Box>
    )
}

export default ReduxSagaCrud