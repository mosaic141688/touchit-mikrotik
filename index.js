const app = require('express')()
//import { RouterOSAPI } from 'node-routeros';

const RosApi = require('node-routeros').RouterOSAPI;
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/reboot', async (req, res) => {
    const {host,user,password} = req.body
    const result = await runCommand({host,user,password},'/system/reboot',[])
    res.send(result)
})




app.listen(3000, console.log)


function runCommand({ host, user, password }, command, arguments) {
    return new Promise((resolve, reject) => {
        const conn = new RosApi({
            host,
            user,
            password,
        });
        conn.connect()
            .then(() => {
                conn.write(command, arguments)
                    .then(resolve)
                    .catch(reject);

            })
            .catch(reject);
    })
}