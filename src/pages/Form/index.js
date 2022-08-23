import { Grid, TextField, Container, Select, InputLabel, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { Container } from './styles';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function Form() {

    // const { register, handleSubmit, watch, formState: { errors } } = useForm();
    // const onSubmit = data => console.log(data);

    const [age, setAge] = useState('');

    const [value, setValue] = useState(new Date('2014-08-18T21:11:54'));

    // const handleChange = (newValue) => {
    //   setValue(newValue);
    // };

    const handleChange = (event) => {
        setAge(event.target.value);
    };


    return (
        <div style={{
            margin: 30,
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        }}>
            <div style={{
                border: '1px solid black',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                backgroundColor: '#00725c',
                padding: '0px 20px',
            }}>
                <h1 style={{ color: 'white' }}>Teste front-end</h1>
                <p style={{ color: 'white', textTransform: 'uppercase' }}>SALVAR</p>
            </div>

            <div style={{ padding: 20 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField fullWidth id="standard-basic" label="Nome *" variant="standard" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField fullWidth id="standard-basic" label="Data Final *" variant="standard" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField fullWidth id="standard-basic" label="Data Final *" variant="standard" />
                    </Grid>

                    <Grid item xs={6}>
                        <InputLabel id="demo-simple-select-standard-label">Propriedades *</InputLabel>
                        <Select
                            fullWidth
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={age}
                            onChange={handleChange}
                            label="Propriedades *"
                            variant="standard"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </Grid>

                    <Grid item xs={6}>
                        <InputLabel id="demo-simple-select-standard-label">Laboratório *</InputLabel>
                        <Select
                            fullWidth
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={age}
                            onChange={handleChange}
                            label="Laboratório *"
                            variant="standard"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="standard-multiline-static"
                            label="Observações"
                            multiline
                            rows={4}
                            defaultValue=""
                            variant="standard"
                        />
                    </Grid>

                </Grid>
            </div>


        </div>
    );

}


