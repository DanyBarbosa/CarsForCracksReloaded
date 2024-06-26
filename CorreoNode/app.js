const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { senderName, senderEmail, subject, comment } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'danboyperuanoxd@gmail.com',
            pass: 'plru ztyq zoge gjdk'
        }, 
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: 'danboyperuanoxd@gmail.com',
        to: 'danielcarsforcracks@gmail.com',
        subject: subject,
        text: `Nombre: ${senderName}\nCorreo: ${senderEmail}\nMensaje: ${comment}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error al enviar el correo: ', error);
            res.status(500).send('Error al enviar el correo');
        } else {
            console.log('Correo enviado: ' + info.response);
            res.status(200).send('Correo enviado correctamente');
            console.log(email);
            console.log(subject);
            console.log(message);
        }
    });
});

app.post('/registro', (req, res) => {
    const { email, datosCliente } = req.body;
    const mensaje = `
    Reserva Exitosa!
    
    Información del Usuario:
    Nombre: ${datosCliente.usuario.nombre}
    Teléfono: ${datosCliente.usuario.tel}
    Correo: ${datosCliente.usuario.correo}
    
    Información del Automóvil:
    Nombre: ${datosCliente.auto.nombre}
    Descripción: ${datosCliente.auto.descrip}
    Año: ${datosCliente.auto.anio}
    Marca: ${datosCliente.auto.marca}
    Costo: ${datosCliente.auto.costo}
    
    Información de la Renta:
    Fecha de Inicio: ${datosCliente.fechaInicio}
    Fecha de Fin: ${datosCliente.fechaFin}
    Días: ${datosCliente.dias}
    `;

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'danboyperuanoxd@gmail.com',
            pass: 'plru ztyq zoge gjdk'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: 'danboyperuanoxd@gmail.com',
        to: datosCliente.usuario.correo,
        subject: 'Detalles de la Reserva',
        text: mensaje
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error al enviar el correo: ', error);
            res.status(500).send('Error al enviar el correo');
        } else {
            console.log('Correo enviado: ' + info.response);
            res.status(200).send('Correo enviado correctamente');
        }
    });
});

app.get('/random-number', (req, res) => {
    const randomNumber = Math.floor(Math.random() * 12) + 1;
    res.json({ number: randomNumber });
});
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
