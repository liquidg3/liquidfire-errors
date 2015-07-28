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
        'altair/modules/adapters/mixins/_HasAdaptersMixin'
], function (declare,
             _HasAdaptersMixin) {

    return declare([_HasAdaptersMixin], {


        startup: function (options) {



            return this.inherited(arguments);

        }


    });
});