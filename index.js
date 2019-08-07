const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
//import { RouterOSAPI } from 'node-routeros';
const {get_installations} = require('./lib/installations')
const bodyParser = require('body-parser')
const {runCommand} = require('./lib/mikroik')
const {getCustomers} = require('./lib/splynx')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('mikrotik-ui/dist'))

app.post('/reboot', async (req, res) => {
    const {host,user,password} = req.body
    const result = await runCommand({host,user,password},'/system/reboot',[])
    res.send(result)
})

app.get('/routers',async (req,res)=>{
    res.send(await getCustomers())
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
    const result = await runCommand({host,user,password},
        '/ip/firewall/nat/remove',
        ['=action=masquarade'])
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


app.listen(3001, console.log)

function getRouters(){

}

async function setMasquradeRule(host,user,password){
   return await runCommand({host,user,password},'/ip/firewall/nat/add',['=chain=srcnat','=action=masquerade'])
}
