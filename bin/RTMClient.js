var RtmClient = require('@slack/client').RtmClient;
var token = process.env.OPENSHIFT_ENV_VAR; // The token is on the dedicated server
var MemoryDataStore = require('@slack/client').MemoryDataStore;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var rsi = require("rss-slack-integration");
var request = require("request");
var fs = require('fs');
var info = require('slack/methods/users.info');
var IncomingWebhooks = require('@slack/client').IncomingWebhook;
var wh = new IncomingWebhooks('https://hooks.slack.com/services/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');
var rtm = new RtmClient(token, {
    // Sets the level of logging we require
    logLevel: "error",
    // Initialise a data store for our client, this will load additional helper functions for the storing and retrieval of data
    dataStore: new MemoryDataStore()
});

//Authentication - DO NOT DELETE
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
    console.log("Logged in as " + rtmStartData.self.name + " of team " + rtmStartData.team.name + " , but not yet connected to a channel");
});
// INITIALIZATION - DO NOT DELETE
rtm.start();

rtm.on(RTM_EVENTS.MESSAGE, function (message) {
    // Listens to all `message` events from the team
});

rtm.on(rsi.start({ //Need to test if we can add multiple feeds
    //Facebook - Ynov Nantes
    feed: "https://twitrss.me/twitter_user_to_rss/?user=Ynov_Nantes",
    interval: 3600,
    slackHook: "https://hooks.slack.com/services/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",
    slackIcon: "http://s1.narvii.com/image/tqhm2jdefu4cxmczyg4mknnjata2s4pk_128.jpg",
    slackBotUser: "Awesome Bot"
}));

// Wait for the client to connect - DO NOT DELETE
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function() {
    // Get the user's name
    var user = rtm.dataStore.getUserById(rtm.activeUserId);
    // Get the team's name
    var team = rtm.dataStore.getTeamById(rtm.activeTeamId);
    // Log the slack team name and the bot's name
    console.log('Connected to ' + team.name + ' as ' + user.name);
});

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message){
    console.log('Message : ' + message.text + ' from ' + message.user + ' in : ' + message.channel);

    if (message.text == "!Help") {
        wh.send(payload = {
            "channel": message.channel,
            "attachments": [
                {
                    "fallback": "Required plain-text summary of the attachment.",
                    "color": "#36a64f",
                    "pretext": "L'aide est disponible sur Github ! Contacte @killian.barreau pour plus d'informations !",
                    "title": "Awesome Bot Help Documentation",
                    "title_link": "https://github.com/KillianB/Awesome-Bot",
                    "fields": [
                        {
                            "title": "Awesome Bot",
                            "value": "Help",
                            "short": false
                        }
                    ],
                }
            ]
        })
    } else if (message.text == "!Extranet") {
        wh.send(payload = {
            "channel": message.channel,
            "attachments": [
                {
                    "fallback": "Required plain-text summary of the attachment.",
                    "color": "#36a64f",
                    "pretext": "L'extranet est disponible grâce à ce lien !",
                    "title": "Extranet",
                    "title_link": "https://extranet.ynov.com/",
                    "fields": [
                        {
                            "title": "Extranet Ynov",
                            "short": false
                        }
                    ],
                }
            ]
        })
    } else if (message.text == "!Mail") {
        wh.send(payload = {
            "channel": message.channel,
            "attachments": [
                {
                    "fallback": "Required plain-text summary of the attachment.",
                    "color": "#36a64f",
                    "pretext": "Hey ! Voilà l'adresse de ta messagerie Ynov !",
                    "title": "Mailbox Ynov",
                    "title_link": "https://outlook.office365.com/owa/?realm=ynov.com",
                    "fields": [
                        {
                            "title": "Outlook",
                            "short": false
                        }
                    ],
                }
            ]
        })
    } else if (message.text == "!Sp") {
        wh.send(payload = {
            "channel": message.channel,
            "attachments": [
                {
                    "fallback": "Required plain-text summary of the attachment.",
                    "color": "#36a64f",
                    "pretext": "Le sharepoint est disponible à cette adresse !",
                    "title": "Sharepoint Ynov",
                    "title_link": "https://auvencecom.sharepoint.com/sites/Nantes/default.aspx",
                    "fields": [
                        {
                            "title": "Microsoft Sharepoint",
                            "short": false
                        }
                    ],
                }
            ]
        })
    } else if (message.text == "!Hp") {
        wh.send(payload = {
            "channel": message.channel,
            "attachments": [
                {
                    "fallback": "Required plain-text summary of the attachment.",
                    "color": "#36a64f",
                    "pretext": "Voici ton planning pour la semaine <@" + message.user + "> !",
                    "title": "Hyperplanning Ynov",
                    "title_link": "https://scolarite.ynov.com/etudiant?identifiant=cbnQWV6TQcC9u4BT",
                    "fields": [
                        {
                            "title": "Extranet Ynov",
                            "short": false
                        }
                    ],
                }
            ]
        })
    } else if (message.text == "!Fb") {
        wh.send(payload = {
            "channel": message.channel,
            "attachments": [
                {
                    "fallback": "Required plain-text summary of the attachment.",
                    "color": "#36a64f",
                    "pretext": "Voila les différentes pages Facebook associées à Ynov Nantes !",
                    "title": "Page officielle",
                    "title_link": "https://www.facebook.com/nantes.ynov/?ref=page_internal",
                    "fields": [
                        {
                            "title": "Facebook",
                            "short": false
                        }
                    ],
                },

                {
                    "fallback": "Required plain-text summary of the attachment.",
                    "color": "#36a64f",
                    "title": "BDE Ynov Nantes",
                    "title_link": "https://www.facebook.com/groups/bde.ynov.nantes/",
                    "fields": [
                        {
                            "title": "Facebook",
                            "short": false
                        }
                    ],

                },

                {
                    "fallback": "Required plain-text summary of the attachment.",
                    "color": "#36a64f",
                    "title": "BDS Ynov Nantes",
                    "title_link": "https://www.facebook.com/groups/1218659048150191/?ref=bookmarks	",
                    "fields": [
                        {
                            "title": "Facebook",
                            "short": false
                        }
                    ],

                }
            ]
        })
    } else if (message.text == "!Twitter") {
        wh.send(payload = {
            "channel": message.channel,
            "attachments": [
                {
                    "fallback": "Required plain-text summary of the attachment.",
                    "color": "#36a64f",
                    "pretext": "Voila la page twitter de Ynov Nantes !",
                    "title": "Ynov Nantes",
                    "title_link": "https://twitter.com/Ynov_Nantes",
                    "fields": [
                        {
                            "title": "Twitter",
                            "short": false
                        }
                    ],
                }
            ]
        })
    } else if (message.text == "!Agenda") {
        wh.send(payload = {
            "channel": message.channel,
            "attachments": [
                {
                    "fallback": "Required plain-text summary of the attachment.",
                    "color": "#36a64f",
                    "pretext": "Hey, voilà l'agenda du mois ! N'hésite pas à profiter des différents évènements !",
                    "title": "Agenda Commun Ynov",
                    "title_link": "https://calendar.google.com/calendar/embed?src=ynov-nantes.com_md68gq1ud5qc7830ud1jr2dfrg@group.calendar.google.com&ctz=Europe/Paris&pli=1",
                    "fields": [
                        {
                            "title": "Agenda",
                            "short": false
                        }
                    ],
                }
            ]
        })
    } else if (message.text == "!Vacances") {
        rtm.sendMessage("Voici les vacances pour chaque promotions (hors vacances d’été):\n\n              ---- INGESUP ----              " +
            "\n\nB1 : Du 13/02 au 24/02; Du 10/04 au 21/04.\nB2 : Plus de vacances.\nB3 : Plus de vacances.\nM1 : Plus de vacances.\nM2 : Plus de vacances.\n\n" +
            "            ---- LIM’ART ----             \n\nB1 : Du 13/02 au 24/02; Du 10/04 au 21/04.\nB2 : Du 13/02 au 24/02; Du 10/04 au 21/04.\n\n" +
            "              ---- ISEE ----              \n\nB1 : Du 13/02 au 24/02; Du 10/04 au 21/04. \nB2 : Du 13/02 au 24/02; Du 10/04 au 21/04 \nB3 : ?\nM1 : Plus de vacances.\nM2 : Plus de vacances.\n", message.channel);

    } else if (message.text == "!Info") {
        rtm.sendMessage("Cette commande n'est pas disponible !", message.channel);
        //Not available -> can't retrieve information from users.info method
    } else if (message.text == "!Dice") {
        var dice = Math.round(Math.random());
        if (dice == 1) {
            rtm.sendMessage("La pièce est tombée sur pile !", message.channel);
        } else {
            rtm.sendMessage("La pièce est tombée sur face !", message.channel);
        }
    } else if (message.text.substring(0,4) == "!Poll") {
        var parameters = [];
        var allCommand = message.text.substring(5);
        for (var i = 0; i < allCommand.length; i++) {
            parameters = allCommand.split(" ");
        }
        wh.send(payload = {
            "channel": message.channel,
            "text": "Voici votre sondage sur :" + parameters[0] + " !",
            "attachments": [
                {
                    "color": "#36a64f",
                    "title": parameters[0] + " . Répondez au sondage avec les réactions associés !",
                    "text": ":heart:,  " + parameters[1] + "\n" +
                    ":yellow_heart:, " + parameters[2] + "\n" +
                    ":green_heart:, " + parameters[3] + "\n" +
                    ":blue_heart:, " + parameters[4] + "\n" +
                    ":purple_heart:, " + parameters[5],
                }
            ]
        })
    }
});