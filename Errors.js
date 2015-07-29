/**
 * A way to report errors that happen in your system
 *
 * @author:     Taylor Romero
 * @license:    MIT
 * @vendor:     liquidfire
 * @module:     Errors
 * @nexus:      this.nexus("liquidfire:Errors")
 *
 */

define(['altair/facades/declare',
        'altair/modules/adapters/mixins/_HasAdaptersMixin',
        'lodash'
], function (declare,
             _HasAdaptersMixin,
             _) {

    function ucfirst(str) {
        //  discuss at: http://phpjs.org/functions/ucfirst/
        // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // bugfixed by: Onno Marsman
        // improved by: Brett Zamir (http://brett-zamir.me)
        //   example 1: ucfirst('kevin van zonneveld');
        //   returns 1: 'Kevin van zonneveld'

        str += '';
        var f = str.charAt(0)
            .toUpperCase();
        return f + str.substr(1);
    }

    return declare([_HasAdaptersMixin], {


        startup: function (options) {

            this.on('Altair::did-warn', this.hitch('didLog'))
            this.on('Altair::did-err', this.hitch('didLog'))
            this.on('Altair::did-log', this.hitch('didLog'))

            return this.inherited(arguments);

        },


        didLog: function (e) {

            var args        = e.get('arguments'),
                parent      = e.get('parent'),
                date        = e.get('date'),
                level       = e.get('level');


            args = _.cloneDeep(args);
            args.unshift(parent);
            args.unshift(date);

            //loop through adapters
            _.each(this.adapters(), function (adapter) {

                if (adapter.options && adapter.options.on && adapter.options.on.indexOf(level) > -1) {
                    adapter['did' + ucfirst(level)].apply(adapter, args);
                }

            });


        }


    });
});