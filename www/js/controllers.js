'use strict';
/**
 * Created by Costas Zarifis on 11/6/14.
 */
angular.module('controllers', []).controller('controllers', function ($scope) {

    var TRUCKS_NO = 100;
    var DELIVERIES_NO = 40;
    var PERCENTAGE = 1;

    // map attributes
    $scope.map = {
        center: {
            latitude: 45,
            longitude: -73
        },
        zoom: 2,
        bounds: {}
    };

    // The ranges that are being displayed next to the check boxes
    $scope.ranges = [
        {
            min: 0,
            max: 10,
            checked: true
        },
        {
            min: 11,
            max: 50,
            checked: true
        },
        {
            min: 51,
            max: 100,
            checked: false
        }
    ];

    // When the user clicks on a check box this watcher will get executed
    // and it will filter out the delivery trucks
    $scope.$watch('ranges', function (nv, ov) {
        if (ov !== nv) {
            var range_list_max = [];
            var range_list_min = [];
            for (var k = 0; k < nv.length; k++) {
                if ($scope.ranges[k].checked) {
                    range_list_max.push($scope.ranges[k].max);
                    range_list_min.push($scope.ranges[k].min);
                }
            }

            for (k = 0; k < $scope.deliver_trucks.length; k++) {
                if (($scope.deliver_trucks[k].pending_deliveries < Math.min.apply(null, range_list_min)) ||
                    ($scope.deliver_trucks[k].pending_deliveries > Math.max.apply(null, range_list_max)))
                    $scope.deliver_trucks[k].visible = false;
                else
                    $scope.deliver_trucks[k].visible = true;
            }
        }
    }, true);

    /**
     * This function will modify the position of a percentage of the delivery trucks
     */
    $scope.modifyMarkers = function () {

        for (var marki = 0; marki < $scope.deliver_trucks.length * PERCENTAGE; marki++) {
            console.log('modifying markers here');
//            console.log('about to get modified:',$scope.randomMarkersAboutToChange[marki]);
//            console.log('before $scope.deliver_trucks[marki].coords.latitude:',$scope.deliver_trucks[marki].coords.latitude);
            $scope.deliver_trucks[marki].coords.latitude = $scope.deliver_trucks[marki].coords.latitude + 5;
            $scope.deliver_trucks[marki].coords.longitude = $scope.deliver_trucks[marki].coords.longitude + 5;
//            console.log('after $scope.deliver_trucks[marki].coords.latitude:',$scope.deliver_trucks[marki].coords.latitude);

        }
    };


    // array with delivery trucks, each truck has a collection
    // of items that will soon be delivered
    $scope.deliver_trucks = [];


    /**
     * This function generates a delivery.
     *
     * @param j - The id of the generated delivery.
     * @returns {{delivery_id: *, recipient: string, scheduled_time: string, delivered_time: string, item_title: string, item_description: string}}
     */
    var createDeliveries = function (j) {

        var ret = {
            delivery_id: j,
            recipient: 'The White House',
            scheduled_time: '14:19',
            delivered_time: '14:19',
            item_title: 'item title' + j,
            item_description: 'blahBlahBlah'
        };
        return ret;
    };

    /**
     * This function generates a truck.
     * @param i - The key of the truck
     * @returns {{truck_key: *, coords: {latitude: number, longitude: number}, all_deliveries: Array, pending_deliveries: (Array.length|*), visible: boolean}}
     */
    var createRandomTruck = function (i) {
        var lat_min = -90,
            lat_range = 90 - lat_min,
            lng_min = -180,
            lng_range = 180 - lng_min;

        var truck_key = "id";
        // a truck has deliveries
        var deliveries = [];
        for (var k = 0; k < DELIVERIES_NO; k++) {
            var del = createDeliveries(k);
            deliveries.push(del);
        }

        // The current location of the truck
        var latitude = lat_min + (Math.random() * lat_range);
        var longitude = lng_min + (Math.random() * lng_range);

        // The truck object
        var ret = {
            truck_key: i,
            coords: {
                latitude: latitude,
                longitude: longitude
            },
            all_deliveries: deliveries,
            pending_deliveries: deliveries.length,
            visible: true


        };
        ret[truck_key] = i;
        return ret;
    };

    /**
     * This watcher is used to bootstrap the application. It executes on init to generate the trucks.
     */

    $scope.$watch(function () {
        return $scope.map;
    }, function (nv, ov) {

        if (ov === nv) {
            var trucks = [];
            for (var i = 0; i < TRUCKS_NO; i++) {

                $scope.mm = createRandomTruck(i);
                trucks.push($scope.mm);

            }
            $scope.deliver_trucks = trucks;
        }
    }, true);
});