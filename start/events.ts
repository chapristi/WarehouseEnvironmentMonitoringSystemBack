/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Event from '@ioc:Adonis/Core/Event'
import Twilio from 'twilio';

interface MessageInformations{
    body : string 
    clientPhoneNUmber : string
};
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = Twilio(accountSid, authToken);

Event.on('new:notifyUser', async (data: MessageInformations) => {
    //send the message to the client when quota is over
    const {body,clientPhoneNUmber} = data;
    console.log(body,clientPhoneNUmber);
    try {
        const message = await client.messages.create({
          body: body,
          to: clientPhoneNUmber,
          from: '+16206789497',
        });
        console.log(message);
      } catch (error) {
        console.error(error);
      }
})
  