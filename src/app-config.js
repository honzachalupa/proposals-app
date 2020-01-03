const firebaseCredentials = require('./firebase-credentials');

module.exports = {
    name: 'ProposApp',
    nameShort: 'ProposApp',
    description: 'Make communication easy.',
    accentColor: '#30e292',
    developerName: 'Jan Chalupa',
    developerUrl: 'https://www.honzachalupa.cz/',
    caching: true,
    firebase: firebaseCredentials
};
