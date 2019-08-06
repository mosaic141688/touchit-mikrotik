const {runCommand} = require('./lib/mikroik')

const host = '192.168.88.1'
const user = 'admin'
const password = ''

const run = async function(){
    const result = await runCommand({host,user,password},'/ip/firewall/nat/print',[`print`])
    console.log(result)
}

const addRule = async ()=>{
    const result = await runCommand({host,user,password},'/ip/firewall/nat/remove',['=action=masquarade'])
    console.log(result)
}

const listInterfaces = async () => {
    const result = await runCommand({host,user,password},'/interface/print',[`print`])
    console.log(result)
}

//addRule()
//run()
//listInterfaces();
