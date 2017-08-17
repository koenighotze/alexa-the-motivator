/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';

const Alexa = require('alexa-sdk');
const request = require('request')

const APP_ID = undefined;

const languageStrings = {
    'de-DE': {
        translation: {
            SKILL_NAME: 'Der Motivator',
            HELP_MESSAGE: 'Ich kann dich Schwächling motivieren und dich endlich dazu bringen zu Performen. Du kannst zum Beispiel sagen "DerMotivator gib mir meine tägliche Dosis Motivation"',
            LAUNCH_MESSAGE: 'Willkommen, du Warmduscher! Ich bin der Motivator',
            HELP_REPROMPT: 'Hier gibts keine Geschenke! Was willst du?',
            STOP_MESSAGE: 'Aufgeben zählt nicht!'
        },
    }
};

const handlers = {
    'LaunchRequest': function () {
        const speechOutput = this.t('LAUNCH_MESSAGE');
        this.emit(':ask', speechOutput, speechOutput);
    },
    'MotivateMe': function () {
        this.emit('MotivateMe');
    },
    'MotivateMe': function () {
        const safe = function (string) {
           return string.replace(/&/g, "&amp;").replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/ Uhr /g, " ").replace(/0(\d)\./g, "$1.");
        }

        const speechOutput = ""; // TODO Choose from random
        self.emit(':tell', speechOutput, self.t('SKILL_NAME'), out);
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
