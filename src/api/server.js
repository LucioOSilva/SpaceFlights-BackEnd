const app = require('./app');

const PORTFIXED = 3333;
const PORT = process.env.PORT || PORTFIXED;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
