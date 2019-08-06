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


const customer_id = `953`


api.get(`/admin/customers/customer/${customer_id}`)
.then(_res => {
    const { response } = _res
    const usename = ''
    const config = `# jul/08/2019 17:53:33 by RouterOS 6.42.10
    # software id = P60P-T82V
    #
    # model = RB941-2nD
    # serial number = 9D740A7AE746
    /interface bridge
    add name=LAN
    /interface pppoe-client
    add add-default-route=yes disabled=no interface=ether1 name=pppoe-out1 \
        password=${response.password} use-peer-dns=yes user=${response.login}
    /interface wireless security-profiles
    set [ find default=yes ] supplicant-identity=MikroTik
    add authentication-types=wpa-psk,wpa2-psk eap-methods="" \
        management-protection=allowed mode=dynamic-keys name=profile1 \
        supplicant-identity="" wpa-pre-shared-key=1MBLESSED! wpa2-pre-shared-key=\
        1MBLESSED!
    /interface wireless
    set [ find default-name=wlan1 ] disabled=no mode=ap-bridge security-profile=\
        profile1 ssid=Cece wireless-protocol=802.11
    /ip pool
    add name=dhcp_pool0 ranges=0.0.0.2-255.255.255.254
    add name=dhcp_pool1 ranges=192.168.88.2-192.168.88.254
    /ip dhcp-server
    add address-pool=dhcp_pool1 disabled=no interface=LAN name=dhcp1
    /interface bridge port
    add bridge=LAN interface=ether2
    add bridge=LAN interface=ether3
    add bridge=LAN interface=ether4
    add bridge=LAN interface=wlan1
    /ip address
    add address=192.168.88.1/24 interface=LAN network=192.168.88.0
    /ip dhcp-server network
    add gateway=0.0.0.1
    add address=192.168.88.0/24 gateway=192.168.88.1
    /ip firewall filter
    add action=accept chain=forward
    add action=accept chain=input
    add action=accept chain=output
    /ip firewall nat
    add action=masquerade chain=srcnat
    /system clock
    set time-zone-name=Africa/Mbabane
    /system identity
    set name=${response.login}
    /system routerboard settings
    set silent-boot=no`
    res.send(config)
})
.catch(er => res.status(500).send(er))