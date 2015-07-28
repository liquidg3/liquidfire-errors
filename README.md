# liquidfire:Errors
Setup basic error reporting through the use of adapters. Configure in your `modules.json`.

```json
{
    "liquidfire:Errors": {
        "selectedAdapters": [
            {
                "path": "adapters/Email",
                "options": {
                    "on": ["warn", "err", "log"],
                    "frequency": "hourly",
                    "transport": {
                        "service": "gmail",
                        "auth": {
                            "user": "gmail.user@gmail.com",
                            "pass": "userpass"
                        }
                    },
                    "mailOptions": {
                        "from": "Me <me@taylorrome.ro>"
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
            }
        
        ]
    }

}
```
## Available Adapters
We only have 2 so far, one that wraps [nodemailer](https://www.npmjs.com/package/nodemailer) and one that wraps [Twilio](http://twilio.github.io/twilio-node/).

To configure `adapters/Email` take a look at the docs for 'nodemailer'.