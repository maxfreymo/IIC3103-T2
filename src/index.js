// index.js -> Inicializa el servidor
// El uso de import & export son de Babel, de lo contrario debemos usanr require()
import './database';
import app from './app';

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}...`);
});
