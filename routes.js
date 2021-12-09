const express = require('express');
const routes = express.Router();


// petición GET //

routes.get('/', (req,res)=>{

    req.getConnection((err, conn)=>{
        if(err) res.status(500).send('Error de servidor');
        conn.query('SELECT * FROM vigilantes', (err,rows)=>{

            if(err) res.send(404).send('Vigilante no encontrado')
            res.status(200);
            var result = Object.values(JSON.parse(JSON.stringify(rows)))
            res.json(result);
            console.log(result);
        });
        
    });
});

//Petición GET un solo usuario //
routes.get('/:idvigilante',(req,res)=>{
    req.getConnection((error, conn)=>{
        let gID = req.params.idvigilante;
        let qr = `select *from vigilantes where idvigilante = ${gID}`;
        conn.query(qr,(err,result)=>{
            if(err){console.log(err);}
                res.send({
                    message:'Mostrando un solo vigilante',
                    data:result
                });
        });
    });
});

//petición POST agregar un nuevo vigilante //
routes.post('/',(req,res)=>{
    console.log(req.body,'createdata');
    req.getConnection((err,conn)=>{
        let nombrevig = req.body.nombrevig;
        let apellido1 = req.body.apellido1;
        let apellido2 = req.body.apellido2;
        let edad = req.body.edad;
        let genero = req.body.genero;
        let telefono = req.body.telefono;
        let correo = req.body.correo;
        let pass = req.body.pass;
        let calle = req.body.calle;
        let ciudad = req.body.ciudad;
        let estadovig = req.body.estadovig;

        let qr = `INSERT INTO vigilantes(nombrevig,apellido1,apellido2,edad,genero,telefono,correo,pass,calle,ciudad,estadovig)
                    values('${nombrevig}','${apellido1}','${apellido2}','${edad}','${genero}','${telefono}','${correo}','${pass}','${calle}',
                    '${ciudad}','${estadovig}')`;
        
        console.log(qr,'qr')
            conn.query(qr,(err,result)=>{
                if(err){console.log(err);}
                    console.log(result,'result');
                    res.send({
                        message:'Vigilante registrado correctamente',
                    });
            });
    });
});

// Petición PUT //
routes.put('/:idvigilante',(req,res)=>{
    req.getConnection((err,conn)=>{
        console.log(req.body, 'updatedata');

        let gID = req.params.idvigilante;
        let nombrevig = req.body.nombrevig;
        let apellido1 = req.body.apellido1;
        let apellido2 = req.body.apellido2;
        let edad = req.body.edad;
        let genero = req.body.genero;
        let telefono = req.body.telefono;
        let correo = req.body.correo;
        let pass = req.body.pass;
        let calle = req.body.calle;
        let ciudad = req.body.ciudad;
        let estadovig = req.body.estadovig;
        
        let qr = `update vigilantes set nombrevig='${nombrevig}',apellido1='${apellido1}',apellido2='${apellido2}',
                    edad='${edad}',genero='${genero}',telefono='${telefono}',correo='${correo}',pass='${pass}',
                    calle='${calle}',ciudad='${ciudad}',estadovig='${estadovig}' where idvigilante=${gID}`;
        conn.query(qr,(err,result)=>{
            if(err){console.log(err);}
                res.send({
                    message: 'Vigilante modificado'
                });
        });
    });
});

//Peticion Delete//
routes.delete('/:idvigilante',(req,res)=>{

    req.getConnection((error, conn)=>{

        let qID = req.params.idvigilante;
        let qr = `delete from vigilantes where idvigilante='${qID}'`;
            conn.query(qr,(err,result)=>{

                if(err){res.status(404).send("Error las eliminar vigilante");}
                    res.send({
                        message: 'Vigilante Eliminado'
                    });
            });
    });
});




module.exports = routes;