import express from 'express';
import fs from 'fs';
import cors from 'cors';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const filePath = path.join(process.cwd(), 'clientes.csv');

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, 'Nombre,Edad,Email,Ubicacion,PH,Fecha\n');
}

app.post('/api/save-client', (req, res) => {
  const { name, age, email, location, ph } = req.body;
  const fecha = new Date().toISOString();
  const linea = `"${name}",${age},"${email}","${location}",${ph},"${fecha}"\n`;

  fs.appendFile(filePath, linea, (err) => {
    if (err) {
      console.error('❌ Error al guardar:', err);
      return res.status(500).json({ error: 'Error al guardar datos' });
    }
    res.status(200).json({ message: '✅ Datos guardados correctamente' });
  });
});

app.get('/', (req, res) => {
  res.send('Servidor activo 🚀');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});
