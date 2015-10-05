(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('OptimizerController', OptimizerController);

    OptimizerController.$inject = ['$scope', '$state', '$stateParams', 'ModalService', 'AppFactory', 'LoansFactory', 'OptimizerFactory'];

    function OptimizerController($scope, $state, $stateParams, ModalService, AppFactory, LoansFactory, OptimizerFactory) {
        $scope.newapplications = $state.current.data.newapplications;
        $scope.AppFactory = AppFactory;
        $scope.OptimizerFactory = OptimizerFactory;
        //console.log('units', $scope.loan.farmunits);

        $scope.getTableWidth = function() {
            //TODO: 250 and factor in crops
            var retro = 3000;
            if($scope.tggl.showOvr) { retro += 50; }
            if($scope.tggl.showPerm) { retro += 40; }
            if($scope.tggl.showCRent) { retro += 80; }
            if($scope.tggl.showDue) { retro += 100; }
            if($scope.tggl.showWvd) { retro += 80; }
            if($scope.tggl.showRnta) { retro += 80; }
            if($scope.tggl.showWvda) { retro += 80; }
            if($scope.tggl.showShr) { retro += 50 * $scope.loan.loancrops.length; }
            if($scope.tggl.showAcres) { retro += 80 * $scope.loan.loancrops.length; }
            if($scope.tggl.showAPH) { retro += 80 * $scope.loan.loancrops.length; }
            if($scope.tggl.showCF) { retro += 100 * $scope.loan.loancrops.length; }
            if($scope.tggl.showEX) { retro += 100 * $scope.loan.loancrops.length; }
            return retro;
        }
        //////////////////////////
        $scope.loan.crop_totals = [
            {crop: 'Corn', acres: $scope.loan.fins.crop_acres[0].acres},
            {crop: 'Soybeans', acres: $scope.loan.fins.crop_acres[1].acres},
            {crop: 'Soybeans FAC', acres: $scope.loan.fins.crop_acres[2].acres},
            {crop: 'Sorghum', acres: $scope.loan.fins.crop_acres[3].acres},
            {crop: 'Wheat', acres: $scope.loan.fins.crop_acres[4].acres},
            {crop: 'Cotton', acres: $scope.loan.fins.crop_acres[5].acres},
            {crop: 'Rice', acres: $scope.loan.fins.crop_acres[6].acres},
            {crop: 'Peanuts', acres: $scope.loan.fins.crop_acres[7].acres},
            {crop: 'Sugar Cane', acres: $scope.loan.fins.crop_acres[8].acres},
            {crop: 'Sunflowers', acres: $scope.loan.fins.crop_acres[9].acres},
        ];
        $scope.tggl = {
            showFarm: true,
            showLocale: false, //true
            showFSN: true,
            showPrac: false, //true,
            showOwner: false, //true,
            showShr: false, //true,
            showPerm: false, //true,true,
            showCRent: false, //true,true,
            showDue: false, //true,true,
            showWvd: false, //true,true,
            showRnta: false, //true,true,
            showWvda: false, //true,true,
            showOvr: true,
            showAcres: true,
            showAPH: true,
            showCF: true,
            showEX: true,
            showCorn: ($scope.loan.fins.crop_acres[0].acres > 0 ? true : false),
            showSoybeans: ($scope.loan.fins.crop_acres[1].acres > 0 ? true : false),
            showFAC: ($scope.loan.fins.crop_acres[2].acres > 0 ? true : false),
            showSorghum: ($scope.loan.fins.crop_acres[3].acres > 0 ? true : false),
            showWheat: ($scope.loan.fins.crop_acres[4].acres > 0 ? true : false),
            showCotton: ($scope.loan.fins.crop_acres[5].acres > 0 ? true : false),
            showRice: ($scope.loan.fins.crop_acres[6].acres > 0 ? true : false),
            showPeanuts: ($scope.loan.fins.crop_acres[7].acres > 0 ? true : false),
            showCane: ($scope.loan.fins.crop_acres[8].acres > 0 ? true : false),
            showSunflowers: ($scope.loan.fins.crop_acres[9].acres > 0 ? true : false),
            showRentRows: false,
            showOverRentRows: false,
            showInsRows: false,
            showCFRows: false,
            showEXRows: false,
            tcropCorn: $scope.loan.fins.crop_acres[0].acres > 0,
            tcropSoybeans: $scope.loan.fins.crop_acres[1].acres > 0,
            tcropBeansFAC: $scope.loan.fins.crop_acres[2].acres > 0,
            tcropSorghum: $scope.loan.fins.crop_acres[3].acres > 0,
            tcropWheat: $scope.loan.fins.crop_acres[4].acres > 0,
            tcropCotton: $scope.loan.fins.crop_acres[5].acres > 0,
            tcropRice: $scope.loan.fins.crop_acres[6].acres > 0,
            tcropPeanuts: $scope.loan.fins.crop_acres[7].acres > 0,
            tcropSugarcane: $scope.loan.fins.crop_acres[8].acres > 0,
            tcropSunflowers: $scope.loan.fins.crop_acres[9].acres > 0
        };
        $scope.spanner = {
            farm: getSpansFarm(),
            crops: getSpansCrop()
        };

        $scope.showFarmCols = function() {
            $scope.spanner.farm = 11;
            $scope.tggl.showFarm = true;
            $scope.tggl.showLocale = true;
            $scope.tggl.showFSN = true;
            $scope.tggl.showPrac = true;
            $scope.tggl.showOwner = true;
            $scope.tggl.showShr = true;
            $scope.tggl.showPerm = true;
            $scope.tggl.showCRent = true;
            $scope.tggl.showDue = true;
            $scope.tggl.showWvd = true;
            $scope.tggl.showRnta = true;
            $scope.tggl.showWvda = true;
        };
        $scope.hideFarmCols = function() {
            $scope.spanner.farm = 0;
            $scope.tggl.showFarm = false;
            $scope.tggl.showLocale = false;
            $scope.tggl.showFSN = false;
            $scope.tggl.showPrac = false;
            $scope.tggl.showOwner = false;
            $scope.tggl.showShr = false;
            $scope.tggl.showPerm = false;
            $scope.tggl.showCRent = false;
            $scope.tggl.showDue = false;
            $scope.tggl.showWvd = false;
            $scope.tggl.showRnta = false;
            $scope.tggl.showWvda = false;
        };
        $scope.showCropCols = function() {
            $scope.spanner.crops = 5;
            $scope.tggl.showCorn = true;
            $scope.tggl.showSoybeans = true;
            $scope.tggl.showSorghum = true;
            $scope.tggl.showWheat = true;
            $scope.tggl.showCotton = true;
            $scope.tggl.showRice = true;
            $scope.tggl.showPeanuts = true;
            $scope.tggl.showCane = true;
            $scope.tggl.showSunflowers = true;
            $scope.tggl.showAcres = true;
            $scope.tggl.showAph = true;
            $scope.tggl.showCF = true;
            $scope.tggl.showEX = true;
            $scope.tggl.showOvr = true;
        };
        $scope.hideCropCols = function() {
            $scope.spanner.crops = 0;
            $scope.tggl.showCorn = false;
            $scope.tggl.showSoybeans = false;
            $scope.tggl.showSorghum = false;
            $scope.tggl.showWheat = false;
            $scope.tggl.showCotton = false;
            $scope.tggl.showRice = false;
            $scope.tggl.showPeanuts = false;
            $scope.tggl.showCane = false;
            $scope.tggl.showSunflowers = false;
            $scope.tggl.showAcres = false;
            $scope.tggl.showAph = false;
            $scope.tggl.showCF = false;
            $scope.tggl.showEX = false;
            $scope.tggl.showOvr = false;
        };

        $scope.calcUnitCropCF = function(cropname, obj) {
            return 0;
            if(Number(obj.acres) === 0) { return 0; }

            var total_crop_acres = Number(obj.crops[0][cropname].acres);
            var prod_share = Number(obj.crops[0][cropname].prod_share)/100;
            var rent_acre = Number(obj.cash_rent_acre_ARM);
            var crop_budget_arm = Number($scope.loan.fins.arm_crop_commit[cropname]);
            var crop_budget_dist = Number($scope.loan.fins.dist_crop_commit[cropname]);
            var arm_budget_acre = crop_budget_arm/total_crop_acres;
            var points = Number(calcPoints(cropname, obj, $scope.loan));

            if(arm_budget_acre = 0) {return 0; }
            return (arm_budget_acre * prod_share) - ((total_crop_acres + rent_acre) * (1+points));
        }
        $scope.calcUnitCropEX = function(cropname, obj) {
            return 0;
            //console.log('CF', obj.crops[0][cropname]);
            var prod_yield = Number(obj.prod_yield);
            var prod_price = Number(obj.prod_price);
            var bkprice = Number(obj.bkprice);
            var bkqty = Number(obj.bkqty);
            var hvst = Number(obj.var_harvst);
            var rebateadj = 0;

            var total_crop_acres = Number(obj.crops[0][cropname].acres);
            var crop_income = ((prod_yield*prod_price) + (((bkprice-prod_price)*bkqty)+(total_crop_acres*prod_yield*hvst*-1)+rebateadj))/total_crop_acres
            var disc_crop = Number($scope.loan.fins.discounts.percent_crop)/100;
            var dMPCI = 47.76;
            var dStaxSCO = 9552;
            var rent_acre = Number(obj.cash_rent_acre_ARM);
            var waived_acre = Number(obj.waived_acre);
            var crop_budget_arm = Number($scope.loan.fins.arm_crop_commit[cropname]);
            var crop_budget_dist = Number($scope.loan.fins.dist_crop_commit[cropname]);
            var points = Number(calcPoints(cropname, obj, $scope.loan));
            return (((crop_income*(1-disc_crop))+dMPCI+dStaxSCO)-((crop_budget_arm+crop_budget_dist+rent_acre-waived_acre)*(1+points)));
        }

        $scope.toggleAlpine = function() {
            $scope.alpine = !$scope.alpine;
            var data = {
                title: 'Alpine Optimizer',
                message: 'This is an expermental design that will allow ARM analysts easy access to loan variables to adjust and optimize loans and provide better customer service.',
                buttons: ['ok', 'cancel']
            };
            ModalService.confirm(data)
                .then(function() {
                    // OK Button Clicked
                }, function() {
                    // Cancel Button Clicked
                });
        };
        $scope.addFarm = function() {
            alert('Adding a Farm.');
        };
        $scope.deleteFarm = function(id) {
            alert('Deleting the Farm Unit: ' + id);
        };

        $scope.getTableWidth = function() {
            var wdth = 460;
            if($scope.tggl.showLocale) { wdth += 200; }
            if($scope.tggl.showFSN) { wdth += 40; }
            if($scope.tggl.showPrac) { wdth += 40; }
            if($scope.tggl.showOwner) { wdth += 80; }
            if($scope.tggl.showShr) { wdth += 50; }
            if($scope.tggl.showPerm) { wdth += 40; }
            if($scope.tggl.showCRent) { wdth += 80; }
            if($scope.tggl.showDue) { wdth += 120; }
            if($scope.tggl.showWvd) { wdth += 80; }
            if($scope.tggl.showRnta) { wdth += 60; }
            if($scope.tggl.showWvda) { wdth += 60; }
            return wdth;
        };
        $scope.showCrop = function() {
            alert('Showing another crop.');
        };
        //console.log('FARM UNITS', $scope.loan.farmunits);
        //////////
        function calcPoints(cropname, obj, loan) {
            var proc_fee_arm = Number(loan.fins.proc_fee);
            var svc_fee_arm = Number(loan.fins.srvc_fee);
            var int_arm = Number(loan.fins.int_arm);
            var int_dist = Number(loan.fins.int_dist);
            var crop_budget_arm = Number(loan.fins.arm_crop_commit[cropname]);
            var crop_budget_dist = Number(loan.fins.dist_crop_commit[cropname]);

            return (proc_fee_arm+svc_fee_arm+int_arm+int_dist)/(crop_budget_arm+crop_budget_dist);
        }
        function getSpansFarm() {
            var cnt = 0;
            if($scope.tggl.showLocale) { cnt += 1; }
            if($scope.tggl.showFSN) { cnt += 1; }
            if($scope.tggl.showPrac) { cnt += 1; }
            if($scope.tggl.showOwner) { cnt += 1; }
            if($scope.tggl.showShr) { cnt += 1; }
            if($scope.tggl.showPerm) { cnt += 1; }
            if($scope.tggl.showCRent) { cnt += 1; }
            if($scope.tggl.showDue) { cnt += 1; }
            if($scope.tggl.showWvd) { cnt += 1; }
            if($scope.tggl.showRnta) { cnt += 1; }
            if($scope.tggl.showWvda) { cnt += 1; }
            return cnt;
        }
        function getSpansCrop() {
            var cnt = 1;
            if($scope.tggl.showAPH) { cnt += 1; }
            if($scope.tggl.showCF) { cnt += 1; }
            if($scope.tggl.showEX) { cnt += 1; }
            if($scope.tggl.showOvr) { cnt += 1; }
            return cnt;
        }

    } // end function
})();
