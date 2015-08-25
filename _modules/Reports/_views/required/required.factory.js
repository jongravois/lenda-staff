(function () {
    'use strict';
    angular
        .module('ARM')
        .factory('RequiredFactory', RequiredFactory);

    RequiredFactory.$inject = [];

    /* @ngInject */
    function RequiredFactory() {
        var publicAPI = {
            getData: getData
        };
        return publicAPI;

        function getData(loans, trackers) {
            //console.log('RequiredFactory.loans', loans);
            //console.log('RequiredFactory.trackers', trackers);

            var reduced = [];
            _.each(trackers.data.data, function (i) {
                try {
                    var j = {};
                    j.app = i.user.app;
                    j.cnt_alerted = i.cnt_alerted;
                    j.cnt_warned = i.cnt_warned;
                    j.days_to_alert = i.report.days_to_alert;
                    j.days_to_warn = i.report.days_to_warn;
                    j.is_active = i.user.is_active;
                    j.is_admin = i.user.is_admin;
                    j.is_approver = i.user.is_approver;
                    j.is_manager = i.user.is_manager;
                    j.is_required = i.report.is_required;
                    j.last_acknowledged = i.last_acknowledged;
                    j.made_required = i.made_required;
                    j.name = i.user.name;
                    j.nick = i.user.nick;
                    j.report = i.report.report;
                    j.updated_at = i.report.updated_at;

                    // Get region and location
                    j.loc_id = i.user.loc_id;
                    _.each(loans, function (k) {
                        if (i.user.loc_id == k.location.id) {
                            j.loc_abr = k.location.loc_abr;
                            j.location = k.location.location;
                            j.region = k.location.regions.region;
                        }
                    });

                    // Calculate total days since posted
                    var a = moment(i.made_required, "YYYY-MM-DD");
                    var now = moment();
                    var b = moment(now, "YYYY-MM-DD");
                    var d = b.diff(a, 'days');
                    j.total_days = b.diff(a, 'days');

                    // Get days since last acknowledged
                    var a = moment(i.last_acknowledged, "YYYY-MM-DD");
                    var now = moment();
                    var b = moment(now, "YYYY-MM-DD");
                    var d = b.diff(a, 'days');
                    j.days_since_last_acknowledged = b.diff(a, 'days');

                    // Mean response time in days (set to days_since_last_acknowledged until calculated)
                    j.mean_response = j.days_since_last_acknowledged;

                    // Create horizontal graph of user acknowledgment history
                    var fontColor;
                    var bar = '';
                    for (var ii = 0; ii < 30; ii++) {
                        if (ii < j.days_to_warn) {
                            fontColor = "gray";
                            if (j.days_since_last_acknowledged > ii) {
                                fontColor = "darkgreen";
                            }
                        } else if (ii >= j.days_to_alert) {
                            if (j.days_since_last_acknowledged > ii) {
                                fontColor = "red";
                            }
                        } else if (ii >= j.days_to_warn) {
                            if (j.days_since_last_acknowledged > ii) {
                                fontColor = "orange";
                            }
                        } else if (ii >= j.days_to_alert) {
                            if (j.days_since_last_acknowledged > ii) {
                                fontColor = "red";
                            }
                        }
                        bar += '<span class="glyphicons glyphicons-stop" style="color:' + fontColor + '"></span>';
                        fontColor = "gray";
                    }
                    j.plot_days = bar;

                    // Create horizontal graph of mean
                    var fontColor;
                    var bar = '';
                    for (var ii = 0; ii < 30; ii++) {
                        if (ii < j.days_to_warn) {
                            fontColor = "gray";
                            if (j.mean_response > ii) {
                                fontColor = "darkgreen";
                            }
                        } else if (ii >= j.days_to_alert) {
                            if (j.mean_response > ii) {
                                fontColor = "red";
                            }
                        } else if (ii >= j.days_to_warn) {
                            if (j.mean_response > ii) {
                                fontColor = "orange";
                            }
                        } else if (ii >= j.days_to_alert) {
                            if (j.mean_response > ii) {
                                fontColor = "red";
                            }
                        }
                        bar += '<span class="glyphicons glyphicons-stop" style="color:' + fontColor + '"></span>';
                        fontColor = "gray";
                    }
                    j.plot_mean_response = bar;

                    // Plot horizontal graph of warning count
                    var fontColor;
                    var bar = '';
                    for (var ii = 0; ii < 30; ii++) {
                        if (j.cnt_warned > ii) {
                            fontColor = "orange";
                        }
                        bar += '<span class="glyphicons glyphicons-stop" style="color:' + fontColor + '"></span>';
                        fontColor = "gray";
                    }
                    j.plot_cnt_warned = bar;

                    // Plot horizontal graph of alarm count
                    var fontColor;
                    var bar = '';
                    for (var ii = 0; ii < 30; ii++) {
                        if (j.cnt_alerted > ii) {
                            fontColor = "red";
                        }
                        bar += '<span class="glyphicons glyphicons-stop" style="color:' + fontColor + '"></span>';
                        fontColor = "gray";
                    }
                    j.plot_cnt_alerted = bar;

                    // Push new record
                    reduced.push(j);
                } catch (err) {
                    console.error('CATCH ERROR', err.name + ': "' + err.message);
                }
            });
            return reduced;
        } // end getData
    } // end factory
})();