define([
    'altair/facades/declare',
    'altair/Lifecycle',
    'altair/mixins/_AssertMixin',
    'altair/plugins/node!debug',
    'altair/plugins/node!util',
], function (declare,
             Lifecycle,
             _AssertMixin,
             debugUtil,
             util) {

    return declare([Lifecycle, _AssertMixin], {

        stringify: function (args) {

            var debug = args.shift(),
                date = args.shift(),
                parent = args.shift(),
                newArgs = debugUtil.formatArgs.apply(debug, args),
                str = util.format.apply(debug, newArgs);

            return str;

        }

    });

});