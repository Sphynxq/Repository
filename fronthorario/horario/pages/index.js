import { Box, Container, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [carrera, setCarrera] = useState('');
  const [semestre, setSemestre] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleComenzar = () => {
    if (!carrera || !semestre) {
      setMensaje('Por favor selecciona una carrera y un semestre');
      return;
    }

    let mensajePersonalizado = '';
    
    switch(carrera) {
      case 'informatica':
        mensajePersonalizado = `Has seleccionado Informática, ${semestre}º semestre`;
        break;
      case 'sistemas':
        mensajePersonalizado = `Has seleccionado Sistemas, ${semestre}º semestre`;
        break;
      case 'industrial':
        mensajePersonalizado = `Has seleccionado Industrial, ${semestre}º semestre`;
        break;
    }
    
    setMensaje(mensajePersonalizado);
    // Opcional: Puedes mantener la navegación después de un tiempo
    // setTimeout(() => router.push('/horarios'), 2000);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: '#1A0F0F',
      color: '#fff'
    }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography 
          variant="h1" 
          component="h1" 
          sx={{
            color: '#FFE6E6',
            textAlign: 'center',
            mb: 4,
            fontSize: {xs: '2.5rem', md: '4rem'}
          }}
        >
          Bienvenidos
        </Typography>
        
        <Box sx={{
          backgroundColor: '#4A2626',
          borderRadius: 2,
          p: 4,
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
        }}>
          <Typography variant="body1" sx={{ color: '#FFE6E6', textAlign: 'center', mb: 4 }}>
            Este es un proyecto propio en el cual queremos ayudar a que las elecciones de horarios sean mas sencillas para ustedes
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel sx={{ color: '#FFE6E6' }}>Carrera</InputLabel>
              <Select
                value={carrera}
                label="Carrera"
                onChange={(e) => setCarrera(e.target.value)}
                sx={{ 
                  color: '#FFE6E6',
                  '.MuiOutlinedInput-notchedOutline': { borderColor: '#FFE6E6' }
                }}
              >
                <MenuItem value="informatica">Informática</MenuItem>
                <MenuItem value="sistemas">Sistemas</MenuItem>
                <MenuItem value="industrial">Industrial</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel sx={{ color: '#FFE6E6' }}>Semestre</InputLabel>
              <Select
                value={semestre}
                label="Semestre"
                onChange={(e) => setSemestre(e.target.value)}
                sx={{ 
                  color: '#FFE6E6',
                  '.MuiOutlinedInput-notchedOutline': { borderColor: '#FFE6E6' }
                }}
              >
                <MenuItem value={2}>Segundo Semestre</MenuItem>
                <MenuItem value={3}>Tercer Semestre</MenuItem>
                <MenuItem value={4}>Cuarto Semestre</MenuItem>
                <MenuItem value={5}>Quinto Semestre</MenuItem>
                <MenuItem value={6}>Sexto Semestre</MenuItem>
                <MenuItem value={7}>Séptimo Semestre</MenuItem>
                <MenuItem value={8}>Octavo Semestre</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {mensaje && (
          <Typography 
            sx={{ 
              textAlign: 'center', 
              mt: 2, 
              color: '#FFE6E6',
              mb: 2 
            }}
          >
            {mensaje}
          </Typography>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button 
            variant="contained"
            onClick={handleComenzar}
            sx={{
              backgroundColor: '#FFE6E6',
              color: '#1A0F0F',
              '&:hover': {
                backgroundColor: '#FFD6D6'
              }
            }}
          >
            Comenzar
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
