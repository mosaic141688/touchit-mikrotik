const express = require('express')
const app = express()
const cors = require('cors')
const {listWifi} = require('./debug_file')
app.use(cors())
//import { RouterOSAPI } from 'node-routeros';
const {get_installations} = require('./lib/installations')
const bodyParser = require('body-parser')
const {runCommand} = require('./lib/mikroik')
const {getCustomers} = require('./lib/splynx')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('mikrotik-ui/dist'))

app.post('/ssid',async (req,res)=>{
    const {host,user,password} = req.body;
    console.log(req.body)
    const result = await listWifi({host,user,password})
    console.log('Result',result)
    res.send(result)
})

app.post('/reboot', async (req, res) => {
    const {host,user,password} = req.body
    const result = await runCommand({host,user,password},'/system/reboot',[])
    res.send(result)
})

app.get('/routers',async (req,res)=>{
    const customers = await getCustomers()
    res.send(customers)
})

app.get('/installations',get_installations)

app.get('/routers',getRouters)

app.post('/firewall/filter', async (req,res) => {
    const {host,user,password} = req.body
    const result  = await runCommand({host,user,password},'')
})

app.post('/firewall/nat',async (req,resp) => {
    const {host,user,password} = req.body
    const result = await runCommand({host,user,password},'')

})

app.post('/dhcp',async (req,res)=> {
    const {host,user,password} = req.body
    const result = await runCommand({ host, user, password },
        '/ip/dhcp-server/add'
        , ['=address-pool=dhcp', '=disabled=no', '=interface=lan', '=name=dhcp1'])
    res.send(result)
})

app.post('/wifi-name',async (req,res) => {
    const {host,user,password} = req.body
    const result = runCommand({host,user,password},'',[])
})

app.post('/change-password',async  (req,res) => {
    const {host,user,password} = req.body
    const result = runCommand({host,user,password})
})

app.post('/speed', async (req,res) => {
    const {host,user,password} = req.body
    const result = runCommand({host,user,password},'/tool speed-test address=192.168.88.1')
 })

 app.get('/online-cutomers',(req,res)=>{
     res.send([])
 })

 app.post('/add_firewall/:ip',(req,res)=>{

 })

 app.post('/',(req,res)=> {
     console.log('hello World')
     res.send("Hello World")
 })

 app.post('/test',async (req,res)=>{
     const {user,host,password} = req.body
    res.send(await listLanIp({user,host,password}))
 })


app.listen(3000, console.log)

function getRouters(){

}

async function setMasquradeRule(host,user,password){
   return await runCommand({host,user,password},'/ip/firewall/nat/add',['=chain=srcnat','=action=masquerade'])
}

const listLanIp = async ({user,host,password}) => {
    console.log(user,host,password)
    try{
       console.log('starting')
        const result = await runCommand({ host, user, password }, '/interface/print', ['print'])
        console.log(result)
        return result
    }
    catch(e){

        console.log(e)
        return e.toString()
    }
  
}
