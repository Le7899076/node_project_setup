// src/lib/twilio.ts
import { Twilio } from 'twilio';

import dotenv from 'dotenv';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;

export default new Twilio(accountSid, authToken);
