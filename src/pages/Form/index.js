import { Grid, TextField, Select, InputLabel, MenuItem, Button, InputAdornment, IconButton, FormHelperText, Stack, Snackbar, Alert } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, DesktopDatePicker, LocalizationProvider } from '@material-ui/lab';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/Warning';
import moment from 'moment';
import { getLabs, getProperties, postData } from '../../services'
import { Container, Header } from './styles';

export default function Form() {

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm();

    const [openSuccessSnack, setSuccessSnack] = useState(false);
    const [openErrorSnack, setErrorSnack] = useState(false);

    const handleClickSuccess = () => setSuccessSnack(true);
    const handleClickError = () => setErrorSnack(true);

    const [properties, setProperties] = useState([]);
    const [labs, setLabs] = useState([]);

    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        handleClickSuccess(false);
    };

    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        handleClickError(false);
    };

    const onSubmit = async data => {

        console.log('errors');
        console.log(errors);

        if (Object.keys(errors).length !== 0) {
            return handleClickError();
        }

        const convertDate = (value) => moment(value).format(`yyyy-MM-DDTHH:mm:ss.Z`);

        const result = {
            nome: data.nome,
            dataInicial: convertDate(data.dataInicial),
            dataFinal: convertDate(data.dataFinal),
            infosPropriedade: {
                id: data.propriedades.id,
                nome: data.propriedades.name,
            },
            cnpj: data.propriedades.cnpj,
            laboratorio: {
                id: data.laboratorio.id,
                nome: data.laboratorio.name,
            },
            observacoes: data.observacoes,
        }

        await postData(result);
        handleClickSuccess();
        // reset()
    }

    const _getLabs = async () => {
        const labs = await getLabs();
        setLabs(labs);
    }

    const _getProperties = async () => {
        const properties = await getProperties();
        setProperties(properties);
    }

    useEffect(() => {
        _getLabs();
        _getProperties();
    }, []);

    return (
        <Container>
            <Header>
                <h1 style={{ color: 'white', fontSize: 18 }}>Teste front-end</h1>
                <Button onClick={handleSubmit(onSubmit)} style={{ color: 'white', fontSize: 14, textTransform: 'uppercase' }} variant="text">SALVAR</Button>
            </Header>

            <div style={{ padding: 20 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid xs={6} container item justifyContent="flex-end" >
                            <Controller
                                name={"nome"}
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <TextField
                                            color='primary'
                                            fullWidth
                                            id="name"
                                            label="Nome *"
                                            variant="standard"
                                            error={!!errors.nome}
                                            helperText={errors.nome && `Erro`}
                                            {...register("nome", { required: true, maxLength: 40 })}
                                        />
                                        {!!errors.nome || <FormHelperText>{value.length}/40</FormHelperText>}
                                    </>
                                )}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <Controller
                                name={"dataInicial"}
                                control={control}
                                rules={{ required: true }}
                                defaultValue={null}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DesktopDatePicker
                                                label="Data Inicial *"
                                                inputFormat="dd/MM/yyyy"
                                                value={value}
                                                defaultValue={null}
                                                onChange={(date) => onChange(date)}
                                                renderInput={(params) =>
                                                    <TextField
                                                        variant="standard"
                                                        {...params}
                                                    />
                                                }
                                            />
                                        </LocalizationProvider>
                                        {errors.dataInicial && <FormHelperText style={{ color: 'red' }}>{`Erro`}</FormHelperText>}
                                    </>
                                )}
                            />
                        </Grid>

                        <Grid item xs={3} container justifyContent="flex-end">
                            <Controller
                                name={"dataFinal"}
                                control={control}
                                rules={{ required: true }}
                                defaultValue={null}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                label="Data Final *"
                                                inputFormat="dd/MM/yyyy"
                                                value={value}
                                                defaultValue={null}
                                                onChange={(date) => onChange(date)}
                                                renderInput={(params) =>
                                                    <TextField
                                                        variant="standard"
                                                        {...params}
                                                    />
                                                }
                                            />
                                        </LocalizationProvider>
                                        {
                                            errors.dataFinal
                                                ?
                                                <FormHelperText style={{ color: 'red' }}>{`Erro`}</FormHelperText>
                                                :
                                                <FormHelperText>Info</FormHelperText>
                                        }
                                    </>
                                )}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <InputLabel id="properties">Propriedades *</InputLabel>
                            <Controller
                                name={"propriedades"}
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <Select
                                            fullWidth
                                            labelId="propriedades"
                                            id="propriedades"
                                            value={value}
                                            onChange={onChange}
                                            label="Propriedades *"
                                            variant="standard"
                                            error={!!errors.propriedades}
                                            renderValue={({ name }) => <span>{name}</span>}
                                            {...register("propriedades", { required: true })}
                                            endAdornment={
                                                <>
                                                    {value && <InputAdornment
                                                        position="end"
                                                        style={{ marginRight: 20 }}
                                                    >
                                                        <IconButton onClick={() => onChange('')}>
                                                            <CloseIcon />
                                                        </IconButton>
                                                    </InputAdornment>}
                                                </>
                                            }
                                        >
                                            {properties.map((property) => (
                                                <MenuItem
                                                    key={property.cnpj}
                                                    value={property}
                                                    style={{ display: 'block' }}
                                                >
                                                    {property.name}
                                                    <FormHelperText>{property.cnpj}</FormHelperText>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {
                                            errors.propriedades
                                                ?
                                                <FormHelperText style={{ color: 'red' }}>{`Erro`}</FormHelperText>
                                                :
                                                <FormHelperText >{value.cnpj}</FormHelperText>
                                        }

                                    </>
                                )}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <InputLabel id="laboratory">Laboratório *</InputLabel>
                            <Controller
                                name={"laboratorio"}
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <Select
                                            fullWidth
                                            labelId="laboratorio"
                                            id="laboratorio"
                                            value={value}
                                            onChange={onChange}
                                            label="Laboratório *"
                                            variant="standard"
                                            error={!!errors.laboratorio}
                                            renderValue={({ name }) => <span>{name}</span>}
                                            {...register("laboratorio", { required: true })}
                                            endAdornment={
                                                <>
                                                    {value && <InputAdornment
                                                        position="end"
                                                        style={{ marginRight: 20 }}
                                                    >
                                                        <IconButton onClick={() => onChange('')}>
                                                            <CloseIcon />
                                                        </IconButton>
                                                    </InputAdornment>}
                                                </>
                                            }
                                        >
                                            {labs.map((lab) => (
                                                <MenuItem
                                                    key={lab.id}
                                                    value={lab}
                                                >
                                                    {lab.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {
                                            errors.laboratorio
                                            &&
                                            <FormHelperText style={{ color: 'red' }}>{`Erro`}</FormHelperText>
                                        }
                                    </>
                                )}
                            />
                        </Grid>

                        <Grid xs={12} item container justifyContent="flex-end" >
                            <Controller
                                name={"observacoes"}
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <TextField
                                            fullWidth
                                            id="observacoes"
                                            label="Observações"
                                            multiline
                                            rows={4}
                                            variant="standard"
                                            helperText={errors.observacoes && `Erro`}
                                            {...register("observacoes", { maxLength: 1000 })}
                                        />
                                        {errors.observacoes || <FormHelperText>{value.length}/1000</FormHelperText>}
                                    </>
                                )}
                            />
                        </Grid>

                    </Grid>
                </form>
            </div>

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar
                    open={openSuccessSnack}
                    autoHideDuration={6000}
                    onClose={handleCloseSuccess}
                    anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                    transitionDuration={1000}
                >
                    <Alert
                        icon={<CheckIcon fontSize="inherit" />}
                        onClose={handleCloseSuccess}
                        severity="success"
                        sx={{ width: '100%' }}
                        variant="filled"
                    >
                        Cadastro realizado com sucesso!
                    </Alert>
                </Snackbar>
            </Stack>

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar
                    open={openErrorSnack}
                    autoHideDuration={6000}
                    onClose={handleCloseError}
                    anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                    transitionDuration={1000}
                >
                    <Alert
                        icon={<WarningIcon fontSize="inherit" />}
                        onClose={handleCloseError}
                        severity="error"
                        sx={{ width: '100%' }}
                        variant="filled"
                    >
                        Preencha os campos obrigatórios!
                    </Alert>
                </Snackbar>
            </Stack>

        </Container>

    );

}


