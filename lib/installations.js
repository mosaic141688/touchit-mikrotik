// Include splynx-nodejs-api library
const SplynxApi = require('splynx-nodejs-api');

let customers = []

// With protocol and port if needed
const SPLYNX_HOST = 'https://billing.touchitnetworks.com';

// Need get api key info from this page: https://SPLYNX_HOST/admin/administration/api-keys
const API_KEY = '8f233267b64f1132f44851a13ff6c5ca';
const API_SECRET = '67567244275200d8c600e08004724f57';

// Create new api object
const api = new SplynxApi(SPLYNX_HOST, API_KEY, API_SECRET);
/*
api.get('/admin/customers/customer/888')
.then(console.log)
.catch(console.log)*/
const get_installations = async (req,res)=>{
    api.get('/admin/support/tickets')
    .then(_res => {
        const { response } = _res
        const new_installation_tickets = response
            .filter(t => t.subject === "Installation")
            .filter(t => t.closed === '0')
        res.send(new_installation_tickets)
    })
    .catch(er => res.status(500).send(er))
}

exports.get_installations = get_installations

