const RouterClient = require('@mhycy/routeros-client');
 
const USER = "administrator";
const PASSWD = "P@ssw0rd!2012"
 
// connect options
const connectOptions = {
  host: '10.190.1.3',
  // port: 8728,
  // encoding: 'gbk',
  debug: true
};
 
// create client instance
const client = RouterClient.createClient(connectOptions);
 
// async request
(async function() {
    try{
        const log = await client.login(USER, PASSWD);
        console.log('Login ', log, client)
        const cli =  await client.command("/interface/print")
        .equal("type", "pppoe-out")
        .send();

client.close();

        console.log('cli', cli)
    }
    catch(e){
        console.log(e)
    }
  // login helper function

 
  // login use command builder

  
  // get interfaces that 'type' attribute equal 'pppoe-out'

})();