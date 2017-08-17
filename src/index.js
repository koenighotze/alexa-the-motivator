/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;

const languageStrings = {
    'de-DE': {
        translation: {
            SKILL_NAME: 'Der Motivationsboss',
            HELP_MESSAGE: 'Ich kann dich Schwächling motivieren und dich endlich dazu bringen zu Performen. Du kannst zum Beispiel sagen "Motivationsboss, gib mir meine tägliche Dosis Motivation"',
            LAUNCH_MESSAGE: 'Willkommen, du Warmduscher! Ich bin der Motivationsboss',
            HELP_REPROMPT: 'Hier gibts keine Geschenke! Was willst du?',
            STOP_MESSAGE: 'Aufgeben zählt nicht! So wird das nichts mit den Ergebnissen!'
        },
    }
};

const handlers = {
    'LaunchRequest': function () {
        const speechOutput = this.t('LAUNCH_MESSAGE');
        this.emit(':ask', speechOutput, speechOutput);
    },
    'Motivationsboss': function () {
        const self = this;
        const messages = [
            "Keine Resultate in der Komfortzone",
            "Aufgeben gibt es nicht",
            "QQQ die Qualtität bist du",
            "Machen größer Reden",
            "Machen ist wie Reden, nur krasser",
            "Menschen sind wie Kohle. Nur mit viel Druck werden sie zu wertvoller Kohle",
            "Resultate werden nicht verschenkt, die werden erarbeitet",
            "Auf der Überholspur ist wenig Verkehr",
            "Auf der Überholspur gibt es keine Geisterfahrer",
            "Hart drüberfahren hilft",
            "Schwarzes Schnitzel bestellt, schwarzes Schnitzel bekommen",
            "Wenn man mal nicht weiter weis, macht man einen Arbeitskreis",
            "Einfach eskalieren und weiter arbeiten",
            "Heute schon die Extrameile gegangen?",
            "Durchschnitt kann jeder!",
            "Resultate gibt es nicht auf dem Sofa!",
            "Es geht hier nicht um 'Sinnvoll'",
            "Wenn es einfach wäre, könnte es jeder",
            "Schweiss ist Ergebnis",
            "Arbeit ist wie Jazz - nur ohne Musik",
            "Das Stolpern lernt der Mensch von Fall zu Fall",
            "Der Regenwurm wird sehr vermisst, weil er heute beim Angeln ist",
            "In der Wohlfühl-Abteilung gibts keine Beschwerden",
            "Wer lacht hat Reserven",
            "Ausruhem kann man nach dem Tod",
            "Der Tag hat 24 Stunden und dann die ganze Nacht",
            "Einfach mal schneller rudern",
            "Es ist einer der größten Irrglauben, dass Kritik immer konstruktiv sein muss."
        ];

        const factIndex = Math.floor(Math.random() * messages.length);
        const speechOutput = messages[factIndex]; // TODO Choose from random
        self.emit(':tell', speechOutput, self.t('SKILL_NAME'), speechOutput);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_REPROMPT');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit('AMAZON.StopIntent');
    }
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
