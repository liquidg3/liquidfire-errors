define([
    'altair/facades/declare',
    './_Base',
    'altair/mixins/_AssertMixin',
    'altair/plugins/node!twilio',
    'altair/facades/__'
], function (declare,
             Base,
             twilio,
             __) {

    return declare([Base], {

        twilio: null,
        startup: function (options) {

            var _options = options || this.options || {};

            this.twilio = twilio(_options.accountSid, _options.authToken);

            return this.inherited(arguments);

        },

        didWarn: function () {
            this.sendMessage(arguments);
        },

        didLog: function () {
            this.sendMessage(arguments);
        },

        didErr: function () {
            this.sendMessage(arguments);
        },

        sendMessage: function (args) {

            var data = Array.prototype.slice.call(args),
                debug = data.shift(),
                date = data.shift(),
                parent = data.shift(),
                body = (parent.name || parent.toString()) + ': ';


            data = _.map(data, function (d) {
                return d.stack || d.toString()
            })

            body += __(data);

            this.twilio.sendMessage({
                to: this.options.to,
                from: this.options.from,
                body: body.substr(0, 1599)
            }, function (err, status) {

                //console.log(err, status);

            });


        }


    });

});