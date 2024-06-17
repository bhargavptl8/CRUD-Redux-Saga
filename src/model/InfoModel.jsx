import React, { useEffect, useState } from 'react'
import { Backdrop, Box, Modal, Fade, Typography, Stack, TextField, Grid, Button, useMediaQuery, useTheme } from '@mui/material'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { dataFetch } from '../redux-saga/actions';

import { RiCloseCircleLine } from "react-icons/ri";

import { toast } from 'react-toastify';

const ModelStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
    p: 4,
};

const InfoModel = ({ open, setOpen, updateData, setUpdateData, updateId, setUpdateId }) => {

    const theme = useTheme();
    const dispatch = useDispatch();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

    const data = useSelector(state => state.value)

    // console.log(data);

    const [initialValues, setInitialValues] = useState({
        title: '',
        description: ''
    })

    useEffect(() => {
        if (updateData) {
            setInitialValues({
                title: updateData.title,
                description: updateData.description
            });
            setUpdateData(null);
        }
    }, [updateData]);

    const infoModelSchema = Yup.object({
        title: Yup.string().min(3, 'Min 3 character').required('Please fill the title is required'),
        description: Yup.string().required('Please fill the description is required'),
    })


    const infoModelFormik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: infoModelSchema,
        onSubmit: (values, { resetForm }) => {

            let newData = { title: values.title.trim(), description: values.description.trim() }

            if (updateId >= 0 && updateId !== null) {

                let copyData = [...data]

                copyData.splice(updateId, 1, newData)

                dispatch(dataFetch(copyData))

                setUpdateId(null)

                toast.success('Info Update Successfully')
            }
            else {

                dispatch(dataFetch([...data, newData]))
                toast.success('Info Add Successfully')
            }

            resetForm()
            setInitialValues({
                title: '',
                description: ''
            })
            handleClose()
        }
    })

    const handleClose = () => {
        setOpen(false);
        infoModelFormik.resetForm();
        setInitialValues({
            title: '',
            description: ''
        });
        setUpdateId(null)
    }

    return (
        <Modal
            aria-labelledby="info-modal-title"
            aria-describedby="info-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open} >
                <Box sx={ModelStyle} width={sm ? 250 : 400}>
                    <Stack sx={{ position: 'relative' }} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography id="task-info-modal-title" variant="h5" fontWeight={'bold'} component="h2">
                            Task Info
                        </Typography>
                        <Box onClick={handleClose} sx={{ position: 'absolute', right: -11, top: -13, cursor: 'pointer', lineHeight: 0 }}>
                            <RiCloseCircleLine size={22} />
                        </Box>
                    </Stack>
                    <Box sx={{ marginTop: '24px' }}>

                        <form onSubmit={infoModelFormik.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Title" id='title' name='title' value={infoModelFormik.values.title} onChange={infoModelFormik.handleChange} onBlur={infoModelFormik.handleBlur} variant="outlined" size="small" />
                                    {infoModelFormik.touched.title && infoModelFormik.errors.title ? (
                                        <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                            {infoModelFormik.errors.title}
                                        </Typography>) : null}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="description"
                                        name='description'
                                        label="Description"
                                        value={infoModelFormik.values.description}
                                        onChange={infoModelFormik.handleChange}
                                        onBlur={infoModelFormik.handleBlur}
                                        multiline
                                        rows={3}
                                    />
                                    {infoModelFormik.touched.description && infoModelFormik.errors.description ? (
                                        <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                            {infoModelFormik.errors.description}
                                        </Typography>) : null}
                                </Grid>
                                <Grid item xs={12} textAlign={'center'}>
                                    <Button type='submit' variant="contained" className='primary-bgcolor' sx={{ textTransform: 'capitalize', borderRadius: '10px', marginTop: '10px', paddingX: '20px' }}>submit</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
}

export default InfoModel