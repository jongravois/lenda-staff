(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('SummaryController', SummaryController);

        SummaryController.$inject = ['$rootScope', '$scope', '$state', '$templateCache', 'AppFactory', 'pdfMake'];

        function SummaryController($rootScope, $scope, $state, $templateCache, AppFactory, pdfMake){
            $scope.newapplications = $state.current.data.newapplications;

            $scope.comments = AppFactory.parseComments($scope.loan.comments);
            var optimizer = AppFactory.optimized($scope.loan);

            $scope.getCropProdYield = function(obj) {
                return _.weighted(obj.practices, 'prod_yield', 'acres');
            };
            $scope.getCropProdPrice = function(obj) {
                return _.weighted(obj.practices, 'prod_price', 'acres');
            };
            $scope.getCropProdShare = function(obj) {
                return _.weighted(obj.practices, 'prod_share', 'acres');
            }
            $scope.getCropTotal = function(obj) {
                var crop_value = Number(obj.acres) * Number($scope.getCropProdYield(obj) * (Number($scope.getCropProdShare(obj)/100)));
                var bk_adj = (obj.bkprice - Number($scope.getCropProdPrice(obj))) * obj.bkqty;
                var harvest_adj = $scope.calcHarvestAdj(obj);
                var rebate_adj = $scope.calcRebateAdj(obj);

                return crop_value + bk_adj + harvest_adj + rebate_adj;
            }
            $scope.calcAgInput = function(loan) {
                var runner = 0;
                _.each(loan.loancrops, function(i){
                    var cl = $scope.getCropTotal(i);
                    runner += cl;
                });
                return runner;
            }
            $scope.calcHarvestAdj = function(obj) {
                //console.log('HARVEST', obj, obj.var_harvest);
                if(obj.var_harvest === 0) {return 0; }
                var acres = Number(obj.acres);
                var prod_yld = Number($scope.getCropProdYield(obj));
                var hvst = Number(obj.var_harvest);
                return acres * prod_yld * hvst * -1;
            }
            $scope.calcRebateAdj = function(obj) {
                //console.log('REBATES', obj, obj.rebates);
                if(obj.rebates === 0) {return 0; }
                var acres = Number(obj.acres);
                var prod_yld = Number($scope.getCropProdYield(obj));
                var rbt = Number(obj.rebates);
                var conv2 = 0.002;
                return acres * prod_yld * rbt * conv2;
            }
            $scope.calcTotalRevenue = function(loan) {
                return Number($scope.calcAgInput(loan)) + Number(loan.fins.total_fsa_pay) + Number(loan.fins.total_indirect);
            };
            $scope.calcCropHailValue = function(obj) {
                return 0;
            };
            $scope.calcCropHailTotalValue = function(obj) {
                //TOTAL ACRES OF PRACTICE IN COUNTY x AMOUNT
                return 0;
            };

            //TEMP
            $scope.loan.lien_letter_received = 0;

            $scope.makepdf = function() {
                var docDefinition = {
                    pageSize: 'legal',
                    pageOrientation: 'landscape',
                    content: [
                        {
                            columns: [
                                {
                                    width: '*',
                                    text: [
                                        { text: 'Applicant: ', style: 'label'},
                                        { text: $scope.loan.applicant.applicant, style: 'value'}
                                    ]
                                },
                                {
                                    width: '*',
                                    text: 'Applicant: ' + $scope.loan.applicant.applicant

                                },
                                {
                                    width: '*',
                                    text: 'Applicant: ' + $scope.loan.applicant.applicant

                                },
                                {
                                    width: '*',
                                    text: 'Applicant: ' + $scope.loan.applicant.applicant

                                }
                            ]
                        },
                        '\n',
                        {
                            table: {
                                headerRows: 1,
                                body: [
                                    [{text: 'Header 1', style: 'header'}, {
                                        text: 'Header 2',
                                        style: 'header'
                                    }, {text: 'Header 3', style: 'header'}],
                                    ['Sample value 1', 'Sample value 2', 'Sample value 3'],
                                    ['Sample value 1', 'Sample value 2', 'Sample value 3'],
                                    ['Sample value 1', 'Sample value 2', 'Sample value 3'],
                                    ['Sample value 1', 'Sample value 2', 'Sample value 3'],
                                    ['Sample value 1', 'Sample value 2', 'Sample value 3'],
                                ]
                            }
                        }
                    ],
                    styles: {
                        header: {
                            fontSize: 22,
                            bold: true
                        },
                        anotherStyle: {
                            italic: true,
                            alignment: 'right'
                        },
                        label: {
                            fontSize: 8,
                            bold: true
                        },
                        value: {
                            fontSize: 11,
                            bold: false
                        }
                    }
                };
                pdfMake.createPdf(docDefinition).open();
            }
            //console.log('LOAN', $scope.loan, 'LC', $scope.loan.loancrops);
        } // end controller
})();