const db = require('./db')

const Veiculo = db.sequelize.define('tabela_veiculo',{
    marca:{
        type: db.Sequelize.STRING
    },
    modelo:{
        type: db.Sequelize.STRING
    },
    placa:{
        type: db.Sequelize.STRING
    },
    pintura:{
        type: db.Sequelize.STRING
    },
    proprietario:{
        type: db.Sequelize.STRING
    }
})

//Veiculo.sync({force:true})

module.exports = Veiculo
