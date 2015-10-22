/**
 * Created by Costas Zarifis on 11/6/14.
 */

Array.prototype.max = function () {
    return Math.max.apply(null, this);
};

Array.prototype.min = function () {
    return Math.min.apply(null, this);
};
angular.module('phonecatFilters', []).filter('checkmark', function () {
    return function (input, scope) {

        rangeListMax = [];
        rangeListMin = [];
        for (var k = 0; k < scope.ranges.length; k++) {
            if (scope.ranges[k].checked) {
                rangeListMax.push(scope.ranges[k].max);
                rangeListMin.push(scope.ranges[k].min);
            }
            console.log('max:', Math.max.apply(null, rangeListMax));
            console.log('min:', Math.min.apply(null, rangeListMin));
        }
        return input;

    };
});