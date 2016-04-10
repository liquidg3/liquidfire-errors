define(['altair/facades/declare',
        './_Base',
        'altair/plugins/node!cron',
        'altair/plugins/node!nodemailer',
        'altair/facades/mixin',
        'altair/facades/__',
        'lodash'
], function (declare,
             Base,
             cron,
             nodemailer,
             mixin,
             __,
             _) {

    return declare([Base], {

        _warnQueue: null,
        _logQueue:  null,
        _errQueue:  null,
        _cron:      null,
        _transport: null,
        startup: function (options) {

            var _options = options || this.options || {};

            this._logQueue  = [];
            this._errQueue  = [];
            this._warnQueue = [];

            if (_options.frequency) {
                this._cron = new cron.CronJob(_options.frequency, this.hitch('sendQueue'), null, true);
            }

            //setup mailer
            if (_options.transport) {
                var opts = _options.transport;
                this._transport = nodemailer.createTransport(opts);
            }

            return this.inherited(arguments);

        },

        didWarn: function () {
            this._warnQueue.push(Array.prototype.slice.call(arguments));
        },

        didLog: function () {
            this._logQueue.push(Array.prototype.slice.call(arguments));
        },

        didErr: function () {
            this._errQueue.push(Array.prototype.slice.call(arguments));
        },

        sendQueue: function () {

            //take everything in queue and send
            var body = '';

            if (this._errQueue.length > 0) {

                body += '<h1>Errors</h1>';
                _.each(this._errQueue, function (args) {
                    body += this.stringify(args) + '<br />';
                }, this);
                body += '<br /><br />';

            }

            if (this._warnQueue.length > 0) {

                body += '<h1>Warnings</h1>';
                _.each(this._warnQueue, function (args) {
                    body += this.stringify(args) + '<br />';
                }, this);
                body += '<br /><br />';

            }


            if (this._logQueue.length > 0) {

                body += '<h1>Logs</h1>';
                _.each(this._logQueue, function (args) {
                    body += this.stringify(args) + '<br />';
                }, this);
                body += '<br /><br />';

            }


            if ( body && this._transport ) {

                var options = mixin(this.options.mailOptions, {
                    html: body
                });

                this._transport.sendMail(options, function (err, info) {

                    if (err) {
                        console.log(err, info);

                    } else {

                        this._logQueue  = [];
                        this._errQueue  = [];
                        this._warnQueue = [];

                    }

                }.bind(this));

            }

        }

    });

});