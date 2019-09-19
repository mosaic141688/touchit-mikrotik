# aug/21/2019 18:33:46 by RouterOS 6.42.11
# software id = 0GEN-5I79
#
# model = 951Ui-2HnD
# serial number = 8A370A136621
/interface bridge
add name=lan
/interface pppoe-client
add add-default-route=yes disabled=no interface=ether1 name=pppoe-out1 \
    password=nontobeko use-peer-dns=yes user=nontobeko
/interface list
add comment=defconf name=WAN
add comment=defconf name=LAN
/interface wireless security-profiles
set [ find default=yes ] supplicant-identity=MikroTik
add authentication-types=wpa-psk,wpa2-psk eap-methods="" \
    management-protection=allowed mode=dynamic-keys name=profile1 \
    supplicant-identity="" wpa-pre-shared-key=Vilakati@2016 \
    wpa2-pre-shared-key=Vilakati@2016
/interface wireless
set [ find default-name=wlan1 ] band=2ghz-b/g/n channel-width=20/40mhz-Ce \
    disabled=no distance=indoors frequency=auto mode=ap-bridge \
    security-profile=profile1 ssid=MyFy wireless-protocol=802.11
/ip pool
add name=default-dhcp ranges=192.168.88.10-192.168.88.254
add name=dhcp_pool1 ranges=0.0.0.2-255.255.255.254
add name=dhcp_pool2 ranges=192.168.1.2-192.168.1.254
add name=dhcp_pool3 ranges=192.168.1.2-192.168.1.254
add name=dhcp ranges=192.168.1.2-192.168.1.254
/ip dhcp-server
add address-pool=dhcp disabled=no interface=lan name=dhcp1
/interface bridge port
add bridge=lan comment=defconf interface=ether2
add bridge=lan comment=defconf interface=ether3
add bridge=lan comment=defconf interface=ether4
add bridge=lan comment=defconf interface=ether5
add bridge=lan comment=defconf interface=wlan1
/ip neighbor discovery-settings
set discover-interface-list=LAN
/interface list member
add comment=defconf list=LAN
add comment=defconf interface=ether1 list=WAN
add interface=pppoe-out1 list=WAN
add interface=lan list=LAN
/ip address
add address=192.168.1.1/24 interface=lan network=192.168.1.0
/ip dhcp-client
add comment=defconf dhcp-options=hostname,clientid interface=ether1
/ip dhcp-server network
add gateway=0.0.0.1
add address=192.168.1.0/24 gateway=192.168.1.1
add address=192.168.88.0/24 comment=defconf gateway=192.168.88.1
/ip dns
set allow-remote-requests=yes
/ip dns static
add address=192.168.1.1 name=router.lan
/ip firewall filter
add action=accept chain=forward
add action=accept chain=input
add action=accept chain=output
/ip firewall nat
add action=masquerade chain=srcnat
/system clock
set time-zone-name=Africa/Mbabane
/tool mac-server
set allowed-interface-list=LAN
/tool mac-server mac-winbox
set allowed-interface-list=LAN
