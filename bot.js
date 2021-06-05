const { Client, MessageEmbed, Channel, Message } = require('discord.js');
const client = new Client;
global.config = require("./config.json")
const query = require("samp-query");
let Samp_IP = "18.141.24.112";
let Samp_Port = 13210;
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
            var time = new Date();
            Date.prototype.timeNow = function () {
                return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes();
            }
            var wtime = time.timeNow();

            status = `${response['online']} Players | World Time: ${wtime}`;
            client.user.setActivity(status, {type: 'PLAYING'});
            /*if(response.online == 0)
            {
                client.user.setActivity(`Server Online`, {type: 'WATCHING'});
            }
            else{
                var time = new Date();

                status = `#DEWATARP: ${response['online']}/${response['maxplayers']} | ${time}`;
                client.user.setActivity(status, {type: 'WATCHING'});
            }*/
        }
        else if(error)
        {
            client.user.setActivity("Server Offline", {type: 'WATCHING'});
        }
    })
}

client.login(config.token);