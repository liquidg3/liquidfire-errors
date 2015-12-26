define(['altair/facades/declare',
        'altair/Lifecycle',
        'altair/mixins/_AssertMixin',
        'altair/plugins/node!slack-node',
        'altair/facades/__',
        'altair/facades/mixin',
        'lodash'
], function (declare,
             Lifecycle,
             _AssertMixin,
             Slack,
             __,
             mixin,
             _) {

    return declare([Lifecycle, _AssertMixin], {

        slack: null,

        startup: function (options) {

            this.assert(options && options.url, 'liquidfire:Errors/adapters/Slack needs a URL.');

            this.slack = new Slack();
            this.slack.setWebhook(options.url);

            return this.inherited(arguments);
        },

        didWarn: function () {
            this.sendMessage('warn', arguments);
        },

        didLog: function () {
            this.sendMessage('log', arguments);
        },

        didErr: function () {
            this.sendMessage('err', arguments);
        },

        sendMessage: function (type, args) {

            var item        = this.stringify(Array.prototype.slice.call(args)),
                options     = _.clone(this.options),
                typeOptions = options[type] || {};

            options = mixin(options, typeOptions);

            options.text = item;

            delete options.err;
            delete options.warn;
            delete options.log;
            delete options.on;
            delete options.url;

            this.slack.webhook(options, function (err, response) {

                 if (err) {
                     console.err(err);
                 }

            });

        },

        stringify: function (args) {

            var date    = args.shift(),
                parent  = args.shift();


            return (parent.name || parent.toString()) + ': ' +  _.map(args, function (arg) {
                    return arg.stack || arg.message || arg;
                }).join(' ');

        }


    });

});