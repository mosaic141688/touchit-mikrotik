const RosApi = require('node-routeros').RouterOSAPI;
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
                    .then(data =>{
                        conn.close()
                        resolve(data)
                    })
                    .catch(reject);

            })
            .catch(reject);
    })
}

exports.runCommand = runCommand;