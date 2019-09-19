const { runCommand } = require('./lib/mikroik')


const host = '10.190.1.3'
const user = 'administrator'
const password = 'P@ssw0rd!2012'

const run = async function () {
    const result = await runCommand({ host, user, password }, '/ip/firewall/nat/print', [`print`])
    console.log(result)
}

const addRule = async () => {
    const result = await runCommand({ host, user, password }, '/ip/firewall/nat/add', ['=chain=srcnat', '=action=masquerade'])
    console.log(result)
}

const listInterfaces = async ({host,user,password}) => {
    const result = await runCommand({ host, user, password }, '/interface/print', [`print`])
    console.log(result)
}



//addRule()
//run()
//listInterfaces();
/*
[9:08 PM, 7/5/2019] Vector: Add firewall rules both to filter and NAT
*/

const addFirewallRules = async ({host,user,password}) => {
    try {
        const result1 = await runCommand({ host, user, password }, '/ip/firewall/filter/add', ['=action=accept', '=chain=forward'])
        const result2 = await runCommand({ host, user, password }, '/ip/firewall/filter/add', ['=action=accept', '=chain=input'])
        const result3 = await runCommand({ host, user, password }, '/ip/firewall/filter/add', ['=action=accept', '=chain=output'])
        const result4 = await runCommand({ host, user, password }, '/ip/firewall/nat/add', ['=action=masquerade', '=chain=srcnat'])
        console.log(result1, result2, result3, result4)
    } catch (e) {
        console.log(e)
    }

}

//addFirewallRules()

/*
[9:08 PM, 7/5/2019] Vector: Add and remove LAN ip
*/
const addLanIp = async ({user,host,password}) => {
    const result = await runCommand({ host, user, password }, '/ip/address/add', ['=address=192.168.1.1/24', '=interface=lan', '=network=192.168.1.0'])
    return result
}

const listLanIp = async ({user,host,password}) => {
    const result = await runCommand({ host, user, password }, '/ip/address/print', [])
    return result
}
/*
[9:09 PM, 7/5/2019] Vector: Add and remove dhcp server
*/
const addDhcp = async ({user,host,password}) => {
    const result = await runCommand({ host, user, password },
        '/ip/dhcp-server/add'
        , ['=address-pool=dhcp', '=disabled=no', '=interface=lan', '=name=dhcp1'])
    return result;
}

const removeDhcp = async ({host,user,password}) => {
    const result = await runCommand({ host, user, password },
        '/ip/dhcp-server/remove',
        []
    )
    return result
}

const listDhcp = async ({host,user,password}) => {
    const result = await runCommand(
        { host, user, password },
        '/ip/dhcp-server/print',
        []
    )
    return result
}
/*
[9:09 PM, 7/5/2019] Vector: Add and remove wifi name
*/
const listWifi = async ({user,password,host}) => {
    const result = await runCommand(
        { host, user, password },
        '/interface/wireless/set',
        ['=numbers=wlan1',
            '=band=2ghz-b/g/n',
            '=channel-width=20/40mhz-Ce',
            '=disabled=no',
            '=distance=indoors',
            '=frequency=auto',
            '=mode=ap-bridge',
            '=security-profile=profile1',
            '=ssid=MyFy',
            '=wireless-protocol=802.11'
        ])
    return result
}

const addWifi = async ({host,user,password,ssid}) => {

    const result = await runCommand(
        { host, user, password }, '/interface/wireless/set',
        ['=numbers=wlan1',
            '=band=2ghz-b/g/n',
            '=channel-width=20/40mhz-Ce',
            '=disabled=no',
            '=distance=indoors',
            '=frequency=auto',
            '=mode=ap-bridge',
            '=security-profile=profile1',
            `=ssid=${ssid}`,
            '=wireless-protocol=802.11'
        ])

    return result
}

const removeWifi = async () => {
    const result = await runCommand({ host, user, password }, '/interface/wireless/remove')
    return result
}

/*
[9:09 PM, 7/5/2019] Vector: Add and remove wifi password
*/
const changePassword = async ({user,password,host,wifiPassword}) => {

    const result1 = await runCommand(
        {user,password,host},
        '/interface/wireless/security-profilesset', 
        [ '=numbers=default', 'supplicant-identity=MikroTik'])

    const options = [
        `=numbers=default`
        `management-protection=allowed`,
        `mode=dynamic-keys`,
        `name=profile1`,
        `wpa-pre-shared-key=${wifiPassword}`,
        `wpa2-pre-shared-key=${wifiPassword}`
    ]
    const result = await runCommand(
        { user, password, host },
        '/interface/wireless/add',
        options
    )
    return result;
}
/*
[9:13 PM, 7/5/2019] Vector: Pull current user speed
*/
const getUserSpeed = () => {

}

module.exports = {addWifi, listWifi}