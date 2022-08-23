import { Grid, TextField, Select, InputLabel, MenuItem, Button, InputAdornment, IconButton, FormHelperText } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, DesktopDatePicker, LocalizationProvider } from '@material-ui/lab';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import styled from 'styled-components';

export default function Form() {

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    const properties = [
        {
            id: 1,
            name: 'Agrotis 1',
            cnpj: '04.909.987/0001-89',
        }, {
            id: 2,
            name: 'Agrotis 2',
            cnpj: '04.909.987/0001-88',
        },
        {
            id: 3,
            name: 'Agrotis 3',
            cnpj: '04.909.987/0001-87',
        },
        {
            id: 4,
            name: 'Agrotis 4',
            cnpj: '04.909.987/0001-86',
        },
        {
            id: 5,
            name: 'Agrotis 5',
            cnpj: '04.909.987/0001-85',
        },
        {
            id: 6,
            name: 'Agrotis 6',
            cnpj: '04.909.987/0001-84',
        },
    ]

    const labs = [
        {
            id: 1,
            name: 'Agro Skynet',
        }, {
            id: 2,
            name: 'Umbrella Agro',
        }, {
            id: 3,
            name: 'Osborn Agro',
        }, {
            id: 4,
            name: 'Skyrim Agro',
        }, {
            id: 5,
            name: 'Agro Brasil',
        }, {
            id: 6,
            name: 'Agro',
        },
    ]

    return (
        <div style={{
            margin: '3%',
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            backgroundColor: 'white',
        }}>
            <div style={{
                border: '1px solid black',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                backgroundColor: '#00725c',
                padding: '0px 15px',
            }}>
                <h1 style={{ color: 'white', fontSize: 18 }}>Teste front-end</h1>
                <Button onClick={handleSubmit(console.log)} style={{ color: 'white', fontSize: 14, textTransform: 'uppercase' }} variant="text">SALVAR</Button>
            </div>

            <div style={{ padding: 20 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField fullWidth id="name" label="Nome *" variant="standard"  {...register("nome")} />
                        </Grid>

                        <Grid item xs={3}>
                            <Controller
                                name={"dataInicial"}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DesktopDatePicker
                                            label="Data Inicial *"
                                            inputFormat="dd/MM/yyyy"
                                            value={value}
                                            onChange={(date) => onChange(date)}
                                            renderInput={(params) => <TextField variant="standard" {...params} />}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <Controller
                                name={"dataFinal"}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="Data Final *"
                                            inputFormat="dd/MM/yyyy"
                                            selected={value}
                                            onChange={(date) => onChange(date)}
                                            renderInput={(params) => <TextField variant="standard" {...params} />}
                                        />
                                    </LocalizationProvider>
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
                                    <Select
                                        fullWidth
                                        labelId="propriedades"
                                        id="propriedades"
                                        value={value}
                                        onChange={onChange}
                                        label="Propriedades *"
                                        variant="standard"
                                        renderValue={value => <span>{value}</span>}
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
                                                value={property.name}
                                                style={{ display: 'block' }}
                                            >
                                                {property.name}
                                                <FormHelperText>{property.cnpj}</FormHelperText>
                                            </MenuItem>
                                        ))}

                                    </Select>
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
                                    <Select
                                        fullWidth
                                        labelId="laboratorio"
                                        id="laboratorio"
                                        value={value}
                                        onChange={onChange}
                                        label="Laboratório *"
                                        variant="standard"
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
                                                value={lab.name}
                                            >
                                                {lab.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="comments"
                                label="Observações"
                                multiline
                                rows={4}
                                defaultValue=""
                                variant="standard"
                                {...register("observacoes")}
                            />
                        </Grid>

                    </Grid>
                </form>
            </div>
        </div>
    );

}


