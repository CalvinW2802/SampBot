const { DiscordAPIError, Channel, MessageEmbed, Message } = require("discord.js");
const query = require("samp-query")

let Samp_IP = "18.141.213.171";
let Samp_Port = 7777;
let status;

var count = 0;
var uptext;
var hours;
var minutes;
var second;

var options = {
    host: Samp_IP,
    port: Samp_Port
}

module.exports = {
    updateStatus: (client, seconds) => {
        query(options, function (error, response) {
            /*const interval = setInterval(function setStatus(){
                if(!error)
                {
                    let status = `${response['online']} players | ${response['mapname']}`;
                    client.user.setActivity(status, {type: 'WATCHING'});
                    console.log(status);
                }
                else
                {
                    clearInterval(interval);
                    let status = `Server Offline`;
                    client.user.setActivity(status, {type: 'WATCHING'});
                    console.log(status);
                }
                return setStatus;
            }(), seconds * 1000);*/
            if(error)
            {
                status = `Server Ofline`;
            }
            else
            {
                status = `${response['online']} players | ${response['mapname']}`;
            }
        })
        function UpTimer(){
            hours = parseInt(count / 3600 % 60);
            minutes = parseInt(count / 60 % 60);
            second = parseInt(count % 60);
            hours = hours < 10 ? `0` + hours:hours;
            minutes = minutes < 10 ? `0` + minutes:minutes;
            second = second < 10 ? `0` + second:second;
            count++;
            uptext = `${hours}j ${minutes}m`;
        }
        UpTimer();var upt = setInterval(UpTimer,1000);
        function update(){query(options, function (error, response) {if(error)
            {
                count = 0;
                status = `Server Offline`;
            }
            else
            {
                status = `#DRP: ${response['online']}/${response['maxplayers']} | Uptime: ${uptext}`;
            }});}
        update();setInterval(update,5000);
        const interval = setInterval(function setStatus() {
            client.user.setActivity(status, {type: 'WATCHING'});
            return setStatus;
        }, seconds * 1000);
    }
}