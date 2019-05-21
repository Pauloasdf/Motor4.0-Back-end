const express = require('express')
// const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 2000

function getMaquinas(){
    return Maquina.findAll({
      attributes : ['id', 'energiaIdeal', 'producaoIdeal', 'rpmIdeal', 'energiaAtual', 'producaoAtual','rpmAtual','arrayEnergia','arrayRPM','arrayProducao'],
    })
    .then(data => data.map( c => c.dataValues)).then( console.log("Funcionou"));
   
}

app.get('/graficos',function(req, res, next){ 
    getMaquinas()
      .then((d) => res.send(d))
})

app.post('/inserir',function(req, res, next){ 
    const {energia,producao,rpm} = req.body;
    sequelize.query("INSERT INTO maquina (energiaAtual,producaoAtual,rpmAtual) VALUES ('" + energia + "','" + producao + "','" + rpm + "')",function(err){})
  })


const Sequelize = require('sequelize')
const sequelize = new Sequelize('hackathon','root','',{
  host:'localhost',
  dialect: 'mysql',
  operatorAliases:false,

  pool:{
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
})

sequelize
    .authenticate()
    .then(() => {
      console.log('Conectado.')
    })
    .catch(err => {
      console.error('NÃO FUNCIONOU.')
    })


const Maquina = sequelize.define('maquina', {
  id:{
    type : Sequelize.INTEGER,
    primaryKey :true
  },
  energiaIdeal:{
    type : Sequelize.DOUBLE
  },
  producaoIdeal:{
    type : Sequelize.INTEGER
  },
  rpmIdeal:{
    type : Sequelize.INTEGER
  },
  energiaAtual:{
    type : Sequelize.DOUBLE
  },
  producaoAtual:{
    type : Sequelize.INTEGER
  },
  rpmAtual:{
    type : Sequelize.INTEGER
  },
  arrayEnergia:{
    type : Sequelize.STRING
  },
  arrayRPM:{
    type : Sequelize.STRING
  },
  arrayProducao:{
    type : Sequelize.STRING
  },
  createdAt:{
    type : Sequelize.DATE,
  },
  updatedAt:{
    type : Sequelize.DATE,
  }
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
