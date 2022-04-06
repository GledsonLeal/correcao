const express = require("express")
const app = express()
const port = 8081
const moment = require("moment")
//const Aluno = require('./models/Veiculo')

//--> Motor de template : DATA
const handlebars = require ("express-handlebars")
const Veiculo = require("./models/Veiculo")
app.engine("handlebars", handlebars.engine({
    defaultLayout: 'main', //--> Define como layot principal a main
    helpers:{
        formateDate: (date)=>{
            return moment(date).format("[DD]/[MM]/[YYYY]")
        }
    }
}))

//--> Template que exibirá todos os carros registrados no estacionamento
app.set('view engine',"handlebars")

app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.get('/',(req,res)=>{
    Veiculo.findAll().then((veiculos)=>{
        res.render('home',{veiculos: veiculos})
    })
})
//--> Registro do Veículo
app.get("/registro",(req,res)=>{ //-->Requisita o formuláro do registro
    res.render('registroVeiculo')
})
app.post("/criar_registro",(req,res)=>{
  //-->Validação dos dados recebidos
  const {marca,modelo,placa,pintura,proprietario} = req.body
  if(!marca || !modelo || !pintura || !placa || !proprietario){
      console.log ("Preencha todos o campos!")
  }else if (inputPlaca<7) {
      console.log("Numeração de placa inválido")
  }
    //-->Constrói um objeto veículo
    const veiculo = {
        marca,
        modelo,
        placa,
        pintura,
        proprietario
    }
    //-->Cria um novo veículo e redireciona para a homepage

    Veiculo.create(veiculo).then(()=>{
        res.redirect('/')
    }).catch((erro)=>{
        console.log(`Ocorreu um erro ao registrar o veículo: ${erro}`)
        res.redirect('/')
    })
})

//-->Remover um Veículo
app.get('/deletar/:id', (req, res)=>{
    Veiculo.destroy({
        where:{'id': req.params.id}
    }).then(()=>{
        res.redirect('/')
        console.log('Veículo Removido!')
    }).catch((erro)=>{
        console.log(`Erro ao remover o veiculo: ${erro}`)
    })
})
//--> Registro do Veículo
app.get("/editar/:id",(req,res)=>{ //-->Requisita o formuláro do registro
    id=req.params.id
    res.render('editar')
})
//-->Atualizar Dados de um Veículo
app.post('/editar', (req, res)=>{
    Veiculo.update({
        marca: req.body.marca,
        modelo: req.body.modelo,
        placa: req.body.placa,
        pintura: req.body.pintura,
        proprietario: req.body.proprietario
    },{
        where: {id: id},
    }).then(()=>{
        console.log("atualizado com sucesso!")
        res.redirect('/')
    }).catch((erro)=>{
        console.log(`Ocorreu um erro: ${erro}`)
        res.redirect('/')
    })
})

app.listen(port, ()=>{
    console.log(`servidor iniciado na url http://localhost:${port}`)
})