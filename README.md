# liquidfire:Errors
Setup basic error reporting through the use of adapters. It makes getting updates about errors, warnings, and longs easy.
To get started, you can use this `modules.json` as a starting point..

```json
{
    "liquidfire:Errors": {
        "selectedAdapters": [
            {
                "path": "adapters/Email",
                "options": {
                    "on": ["warn", "err", "log"],
                    "frequency": "0 * * * *",
                    "transport": {
                        "service": "gmail",
                        "auth": {
                            "user": "gmail.user@gmail.com",
                            "pass": "userpass"
                        }
                    },
                    "mailOptions": {
                        "to": "Me <me@taylorrome.ro>",
                        "from": "no-replay <me@taylorrome.ro>",
                        "subject": "Bug Report"
                    }
                }
            },
            
            {
                "path": "adapters/Twilio",
                "options": {
                    "on": ["warn", "err", "log"],
                    "accountSid": "aoeu",
                    "authToken": "token",
                    "from": "233-234-2343"
                }
            },
            
            {
                "path": "adapters/Slack",
                "description": "All options pass through to slack-node",
                "options": {
                    "on": ["warn", "err", "log"],
                    "url": "https://hooks.slack.com/services/****/***/****",
                    "icon_emoji": ":ghost:",
                    "username": "altairbot",
                    "channel": "my-channel",
                    "log": {
                        "icon_emoji": ":grey_exclamation:",
                        "channel": "#logs"
                    },
                    "warn": {
                        "icon_emoji": ":warning:",
                        "channel": "#warnings"
                    },
                    "err": {
                        "icon_emoji": ":fire:",
                        "channel": "#errors"
                    }
                }
            }
        
        ]
    }

}
```
## Available Adapters
We only have 2 so far, one that wraps [nodemailer](https://www.npmjs.com/package/nodemailer) and one that wraps [Twilio](http://twilio.github.io/twilio-node/).

To configure `adapters/Email` take a look at the docs for 'nodemailer'. 