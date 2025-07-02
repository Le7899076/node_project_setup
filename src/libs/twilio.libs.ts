import { Twilio } from 'twilio';

import config from '@config/services.config';

const accountSid = config.twilio.account_sid;
const authToken = config.twilio.auth_token;

const client = new Twilio(accountSid, authToken);

export default client;
