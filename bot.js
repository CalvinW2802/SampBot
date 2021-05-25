const { Client, MessageEmbed, Channel, Message } = require('discord.js');
const client = new Client;
global.config = require("./config.json")
const query = require("samp-query");
const prefix = "/";
let Samp_IP = "18.141.24.112";
let Samp_Port = 7777;
var channelid = '837571530904043601';

var options = {
    host: Samp_IP,
    port: Samp_Port
}
var weather;

client.on('ready', () => {
    console.log(`Bot ${client.user.tag} is going online!!`);
    UpdateStatus();setInterval(UpdateStatus,1000);
    query(options, function(error, response){
        if(error)
        {
            status = "Server Offline";
            client.user.setActivity(status, {type: 'WATCHING'});
        }
        else
        {
            client.user.setActivity("Server Online", {type: 'WATCHING'});
        }
    })
    const interval = setInterval(function(){
        UpdateStatus();
    }, 30000)
});

function UpdateStatus()
{
    query(options, function(error, response){
        if(!error)
        {
            if(response.online == 0)
            {
                client.user.setActivity(`Server Online`, {type: 'WATCHING'});
            }
            else{

                status = ` DEWATARP: ${response['online']}/${response['maxplayers']}`;
                client.user.setActivity(status, {type: 'WATCHING'});
            }
        }
        else if(error)
        {
            client.user.setActivity("Server Offline", {type: 'WATCHING'});
        }
    })
}

client.login(config.token);