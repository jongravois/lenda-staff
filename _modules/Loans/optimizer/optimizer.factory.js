(function(){
    'use strict';
    angular
        .module('ARM')
        .factory('OptimizerFactory', OptimizerFactory);

    OptimizerFactory.$inject = ['$q'];

    /* @ngInject */
    function OptimizerFactory($q) {
        var publicAPI = {
            calcAPHCrop: calcAPHCrop,
            calcArmCommit: calcArmCommit,
            calcCashFlowCrop: calcCashFlowCrop,
            calcCropCF: calcCropCF,
            calcDiscCollateral: calcDiscCollateral,
            calcDiscCollateralCrop: calcDiscCollateralCrop,
            calcDiscFSA: calcDiscFSA,
            calcDiscFSACrop: calcDiscFSACrop,
            calcDiscIns: calcDiscIns,
            calcDiscInsCrop: calcDiscInsCrop,
            calcDiscInsOverCrop: calcDiscInsOverCrop,
            calcDiscProdRev: calcDiscProdRev,
            calcDiscProdRevCrop: calcDiscProdRevCrop,
            calcDiscProdRevAdj: calcDiscProdRevAdj,
            calcDiscProdRevAdjCrop: calcDiscProdRevAdjCrop,
            calcDiscSCO: calcDiscSCO,
            calcDiscSCOCrop: calcDiscSCOCrop,
            calcDistCommit: calcDistCommit,
            calcDistFee: calcDistFee,
            calcExposure: calcExposure,
            calcExposureCrop: calcExposureCrop,
            calcExpRev: calcExpRev,
            calcFarmAcres: calcFarmAcres,
            calcFee: calcFee,
            calcInsGuarantee: calcInsGuarantee,
            calcInsLevelCrop: calcInsLevelCrop,
            calcInsPriceCrop: calcInsPriceCrop,
            calcInsShareCrop: calcInsShareCrop,
            calcInsValue: calcInsValue,
            calcInsValueCrop: calcInsValueCrop,
            calcInterestARM: calcInterestARM,
            calcInterestDist: calcInterestDist,
            calcMPCI: calcMPCI,
            calcProdRev: calcProdRev,
            calcProdRevCrop: calcProdRevCrop,
            calcProdRevAdj: calcProdRevAdj,
            calcProdRevAdjCrop: calcProdRevAdjCrop,
            calcProdShareCrop: calcProdShareCrop,
            calcProdYieldCrop: calcProdYieldCrop,
            calcSupMax: calcSupMax,
            calcSupMaxCrop: calcSupMaxCrop,
            getOptimizedLoan: getOptimizedLoan,
            getTotalCashRent: getTotalCashRent,
            getTotalRentOvr: getTotalRentOvr,
            getTotalWaived: getTotalWaived
        };
        return publicAPI;

        //////////
        function getOptimizedLoan(loan) {
            var deferred = $q.defer();
            var splitFarms = splitFarmsByPractice(loan);
            loan.optimized = splitFarms;
            console.log('Optimized Loan', loan.optimized);
            deferred.resolve(loan);
            return deferred.promise;
        }
        function calcAPHCrop(cropname, loan) {
            //TODO: FIX
            var collection = [];
            _.each(loan.farmunits, function(fu){
                _.each(fu.crops, function(fuc){
                    if(fuc[cropname]) {
                        collection.push(fuc);
                    }
                });
            });
            return _.weighted(collection, 'aph', 'acres');
        }
        function calcArmCommit(cropname, loan) {
            return Number(loan.fins.arm_crop_commit[cropname]) + Number(calcFee(cropname, loan));
        }
        function calcCashFlowCrop(cropname, loan) {
            //TODO: FIX
            var collection = [];
            _.each(loan.farmunits, function(fu){
                _.each(fu.crops, function(fuc){
                    if(fuc[cropname]) {
                        collection.push(fuc);
                    }
                });
            });
            return _.weighted(collection, 'cash_flow', 'acres');
        }
        function calcCropCF(crop, unit, loan) {
            var positives = (Number(unit.fsa_acre) + Number(calcProdRev(crop)) + Number(calcProdRevAdj(crop)));
            var negatives = (Number(calcArmCommit(crop.crop, loan)) + Number(calcDistCommit(crop.crop, loan)) + Number(loan.fins.other_crop_commit[crop.crop]) + Number(calcInterestARM(crop, loan)) + Number(calcInterestDist(crop, loan)));

            return Number(positives) - Number(negatives);
        }
        function calcDiscCollateral(crop, unit, loan) {
            return Number(calcDiscProdRev(crop, loan)) + Number(calcDiscProdRevAdj(crop, loan)) + Number(calcDiscInsOverCrop(crop, loan)) + Number(calcDiscIns(crop, loan)) + Number(calcDiscSCO(crop, loan)) + Number(calcDiscFSA(crop, unit, loan));
        }
        function calcDiscCollateralCrop(crop, loan) {
            var val = Number(calcInsValue(crop)) - Number(calcDiscProdRev(crop, loan));

            if( val > 0) {
                return val;
            } else {
                return 0;
            }
        }
        function calcDiscFSA(crop, unit, loan) {
            return Number(unit.fsa_acre) * ((100 - Number(loan.fins.discounts.percent_fsa))/100);
        }
        function calcDiscFSACrop(crop, loan) {
            var val = Number(calcInsValue(crop)) - Number(calcDiscProdRev(crop, loan));

            if( val > 0) {
                return val;
            } else {
                return 0;
            }
        }
        function calcDiscIns(crop, loan) {
            return Number(calcDiscInsOverCrop(crop, loan)) * ((100 - loan.fins.discounts.percent_ins)/100);
        }
        function calcDiscInsCrop(crop, loan) {
            var val = Number(calcInsValue(crop)) - Number(calcDiscProdRev(crop, loan));

            if( val > 0) {
                return val;
            } else {
                return 0;
            }
        }
        function calcDiscInsOverCrop(crop, loan) {
            var val = Number(calcInsValue(crop)) - Number(calcDiscProdRev(crop, loan));

            if( val > 0) {
                return val;
            } else {
                return 0;
            }
        }
        function calcDiscProdRev(crop, loan) {
            return Number(calcProdRev(crop)) * ((100 - Number(loan.fins.discounts.percent_crop))/100);
        }
        function calcDiscProdRevCrop(crop, loan) {
            var val = Number(calcInsValue(crop)) - Number(calcDiscProdRev(crop, loan));

            if( val > 0) {
                return val;
            } else {
                return 0;
            }
        }
        function calcDiscProdRevAdj(crop, loan) {
            return Number(calcProdRevAdj(crop)) * ((100 - Number(loan.fins.discounts.percent_crop))/100);
        }
        function calcDiscProdRevAdjCrop(crop, loan) {
            var val = Number(calcInsValue(crop)) - Number(calcDiscProdRev(crop, loan));

            if( val > 0) {
                return val;
            } else {
                return 0;
            }
        }
        function calcDiscSCO(crop, loan) {
            return Number(calcSupMax(crop)) * ((100 - Number(loan.fins.discounts.percent_suppins))/100);
        }
        function calcDiscSCOCrop(crop, loan) {
            var val = Number(calcInsValue(crop)) - Number(calcDiscProdRev(crop, loan));

            if( val > 0) {
                return val;
            } else {
                return 0;
            }
        }
        function calcDistCommit(cropname, loan) {
            return Number(loan.fins.dist_crop_commit[cropname]) + Number(calcDistFee(cropname, loan));
        }
        function calcDistFee(cropname, loan) {
            return 0;
        }
        function calcExposure(crop, unit, loan) {
            return Number(calcDiscCollateral(crop, unit, loan)) - Number(calcArmCommit(crop.crop, loan)) - Number(calcDistCommit(crop.crop, loan)) - Number(calcInterestARM(crop, loan)) - Number(calcInterestDist(crop, loan));
        }
        function calcExposureCrop(crop, loan) {
            var val = Number(calcInsValue(crop)) - Number(calcDiscProdRev(crop, loan));

            if( val > 0) {
                return val;
            } else {
                return 0;
            }
        }
        function calcExpRev(crop) {
            return Number(crop.exp_yield) * Number(crop.ins_price);
        }
        function calcFarmAcres(farm) {
            //console.log('calcFarmAcres', farm);
            var practices = farm.practices;
            var irr = 0;
            var ni = 0;
            var percent_irrigated = 0;

            _.each(practices, function (practice) {
                if (practice.irrigated === '1') {
                    irr += Number(practice.acres);
                } else {
                    ni += Number(practice.acres);
                }
            });

            return {
                irr: irr,
                ni: ni,
                percent_irrigated: Number(irr) / (Number(irr) + Number(ni))
            };
        }
        function calcFee(cropname, loan) {
            var arm_exp = Number(loan.fins.arm_crop_commit[cropname]);
            var dist_exp = Number(loan.fins.dist_crop_commit[cropname]);
            var feeOnTotal = loan.financials.fee_onTotal;
            var proc_int = Number(loan.financials.fee_processing)/100;
            var srvc_int = Number(loan.financials.fee_service)/100;

            if(feeOnTotal) {
                return (arm_exp + dist_exp) * (proc_int + srvc_int);
            } else {
                return arm_exp * (proc_int + srvc_int);
            }
        }
        function calcInsGuarantee(crop) {
            //console.log('Guar Crop', crop);
            return Number(crop.c_aph) * Number(crop.c_ins_price) * (Number(crop.c_ins_level)/100);
        }
        function calcInsLevelCrop(cropname, loan) {
            //TODO: FIX
            var collection = [];
            _.each(loan.farmunits, function(fu){
                _.each(fu.crops, function(fuc){
                    if(fuc[cropname]) {
                        collection.push(fuc);
                    }
                });
            });
            return _.weighted(collection, 'ins_level', 'acres');
        }
        function calcInsPriceCrop(cropname, loan) {
            //TODO: FIX
            var collection = [];
            _.each(loan.farmunits, function(fu){
                _.each(fu.crops, function(fuc){
                    if(fuc[cropname]) {
                        collection.push(fuc);
                    }
                });
            });
            return _.weighted(collection, 'ins_price', 'acres');
        }
        function calcInsShareCrop(cropname, loan) {
            //TODO: FIX
            var collection = [];
            _.each(loan.farmunits, function(fu){
                _.each(fu.crops, function(fuc){
                    if(fuc[cropname]) {
                        collection.push(fuc);
                    }
                });
            });
            return _.weighted(collection, 'ins_share', 'acres');
        }
        function calcInsValue(crop) {
            var mpci = calcMPCI(crop),
                premium = Number(crop.ins_premium),
                share = (crop.ins_share ? Number(crop.ins_share)/100 : 1);

            return (mpci + premium) / share;
        }
        function calcInsValueCrop(cropname, loan) {
            //TODO: FIX
            var collection = [];
            _.each(loan.farmunits, function(fu){
                _.each(fu.crops, function(fuc){
                    if(fuc[cropname]) {
                        collection.push(fuc);
                    }
                });
            });
            return _.weighted(collection, 'ins_value', 'acres');
        }
        function calcInterestARM(crop, loan) {
            return Number(calcArmCommit(crop.crop, loan)) * (Number(loan.financials.int_percent_arm)/100);
        }
        function calcInterestDist(crop, loan) {
            //TODO: Fix this
            return Number(calcDistCommit(crop.crop, loan)) * (Number(loan.financials.int_percent_dist)/100);
        }
        function calcMPCI(crop) {
            return Number(crop.aph) * Number(crop.ins_price) * (Number(crop.ins_level)/100);
        }
        function calcProdRev(crop) {
            return Number(crop.prod_yield) * Number(crop.prod_price) * (Number(crop.prod_share)/100);
        }
        function calcProdRevAdjCrop(cropname, loan) {
            //TODO: FIX
            var collection = [];
            _.each(loan.farmunits, function(fu){
                _.each(fu.crops, function(fuc){
                    if(fuc[cropname]) {
                        collection.push(fuc);
                    }
                });
            });
            return _.weighted(collection, 'prod_rev_adj', 'acres');
        }
        function calcProdRevAdj(crop) {
            return Number(crop.prod_yield) * (Number(crop.prod_share)/100) * (Number(crop.var_harvst) + Number(crop.rebate));
        }
        function calcProdRevCrop(cropname, loan) {
            //TODO: FIX
            var collection = [];
            _.each(loan.farmunits, function(fu){
                _.each(fu.crops, function(fuc){
                    if(fuc[cropname]) {
                        collection.push(fuc);
                    }
                });
            });
            return _.weighted(collection, 'prod_rev', 'acres');
        }
        function calcProdShareCrop(cropname, loan) {
            //TODO: FIX
            var collection = [];
            _.each(loan.farmunits, function(fu){
                _.each(fu.crops, function(fuc){
                    if(fuc[cropname]) {
                        collection.push(fuc);
                    }
                });
            });
            return _.weighted(collection, 'prod_share', 'acres');
        }
        function calcProdYieldCrop(cropname, loan) {
            //TODO: FIX
            var collection = [];
            _.each(loan.farmunits, function(fu){
                _.each(fu.crops, function(fuc){
                    if(fuc[cropname]) {
                        collection.push(fuc);
                    }
                });
            });
            return _.weighted(collection, 'prod_yield', 'acres');
        }
        function calcSupMax(crop) {
            var max = (Number(crop.cov_range)/100) * (Number(crop.prot_factor)/100) * Number(calcExpRev(crop));
            return max;
        }
        function calcSupMaxCrop(cropname, loan) {
            //TODO: FIX
            var collection = [];
            _.each(loan.farmunits, function(fu){
                _.each(fu.crops, function(fuc){
                    if(fuc[cropname]) {
                        collection.push(fuc);
                    }
                });
            });
            return _.weighted(collection, 'sup_max', 'acres');
        }
        function getTotalCashRent(practices) {
            return _.sumCollection(practices, 'cash_rent');
        }
        function getTotalRentOvr(cropname, loan) {
            //TODO: FIX
            var collection = [];
            _.each(loan.farmunits, function(fu){
                _.each(fu.crops, function(fuc){
                    if(fuc[cropname]) {
                        collection.push(fuc);
                    }
                });
            });
            return _.weighted(collection, 'aph', 'acres');
        }
        function getTotalWaived(practices) {
            return _.sumCollection(practices, 'waived');
        }
        function makeFarmPractice(obj, crop, loan) {
            console.log('MFP', obj);
            var xps = {
                arm: loan.fins.arm_crop_commit[obj.crop],
                dist: loan.fins.dist_crop_commit[obj.crop],
                other: loan.fins.other_crop_commit[obj.crop]
            };

            var retro = {
                expenses: xps,
                c_crop_disc: Number(loan.fins.discounts.percent_crop),
                c_fsa_disc: Number(loan.fins.discounts.percent_fsa),
                c_cropins_disc: Number(loan.fins.discounts.percent_ins),
                c_nonrp_disc: Number(loan.fins.discounts.percent_nonrp),
                c_sco_disc: Number(loan.fins.discounts.percent_suppins),
                c_acres: Number(obj.acres),
                c_share_rent: Number(obj.share_rent),
                c_aph: Number(obj.aph),
                c_ins_type: obj.ins_type,
                c_ins_level: Number(obj.ins_level),
                c_ins_share: Number(obj.ins_share),
                c_ins_price: Number(obj.ins_price),
                c_ins_premium: Number(obj.ins_premium),
                c_supp_coverage: 'STAX',
                c_loss_trigger: 'Loss',
                c_cov_range: 'Cov',
                c_prot_factor: 'Prot',
                c_exp_yield: 'XYld',
                c_exp_revenue: 'XRev',
                c_prod_yield: Number(obj.prod_yield),
                c_prod_share: Number(obj.prod_share),
                c_prod_price: Number(obj.prod_price),
                c_var_harv: Number(obj.harvest),
                c_rebate: Number(obj.rebates)
            };
            console.log('RETRO', retro);
            return retro;
        }
        function makePractice(crop_id) {
            return {
                expenses: {
                    arm: 0,
                    dist: 0,
                    other: 0
                },
                c_crop_id: crop_id,
                c_acres: 0,
                c_aph: 0,
                c_arm_fee: 0,
                c_budget_arm: 0,
                c_budget_dist: 0,
                c_budget_other: 0,
                c_cf: 0,
                c_commit_arm: 0,
                c_commit_dist: 0,
                c_crop_disc: 0,
                c_cropins_disc: 0,
                c_disc_collateral: 0,
                c_disc_crop: 0,
                c_disc_fsa: 0,
                c_disc_ins: 0,
                c_disc_sco: 0,
                c_fsa_disc: 0,
                c_ins_disc_crop: 0,
                c_ins_guarantee: 0,
                c_ins_level: 0,
                c_ins_premium: 0,
                c_ins_price: 0,
                c_ins_share: 0,
                c_ins_type: "RP",
                c_ins_value: 0,
                c_interest_arm: 0,
                c_interest_dist: 0,
                c_nonrp_disc: 0,
                c_prod_price: 0,
                c_prod_rev: 0,
                c_prod_rev_adj: 0,
                c_prod_share: 0,
                c_prod_yield: 0,
                c_rebate: 0,
                c_rm: 0,
                c_sco_disc: 0,
                c_sco_max: 0,
                c_share_rent: 0,
                c_var_harv: 0
            };
        }
        function processFarmCrops(pracs, IR_NI, loan) {
            //console.log('CPS', pracs);
            //TODO: Get allcrops from Database
            var allcrops = [
                {
                    id: 1,
                    crop: "corn",
                    name: "Corn",
                    sort_order: 1,
                    tea: 750,
                    arm_default_price: 5.11,
                    arm_default_ins_price: 4.92,
                    measurement: "bu",
                    rebate_measurement: "bu"
                },
                {
                    id: 2,
                    crop: "soybeans",
                    name: "Soybeans",
                    sort_order: 2,
                    tea: 450,
                    arm_default_price: 11,
                    arm_default_ins_price: 9.7,
                    measurement: "bu",
                    rebate_measurement: "bu"
                },
                {
                    id: 3,
                    crop: "beansFAC",
                    name: "Soybeans FAC",
                    sort_order: 3,
                    tea: 450,
                    arm_default_price: 11,
                    arm_default_ins_price: 9.7,
                    measurement: "bu",
                    rebate_measurement: "bu"
                },
                {
                    id: 4,
                    crop: "sorghum",
                    name: "Sorghum",
                    sort_order: 4,
                    tea: 375,
                    arm_default_price: 4.21,
                    arm_default_ins_price: 4,
                    measurement: "bu",
                    rebate_measurement: "bu"
                },
                {
                    id: 5,
                    crop: "wheat",
                    name: "Wheat",
                    sort_order: 9,
                    tea: 360,
                    arm_default_price: 6.64,
                    arm_default_ins_price: 5.75,
                    measurement: "bu",
                    rebate_measurement: "bu"
                },
                {
                    id: 6,
                    crop: "cotton",
                    name: "Cotton",
                    sort_order: 5,
                    tea: 540,
                    arm_default_price: 93,
                    arm_default_ins_price: 90,
                    measurement: "lb",
                    rebate_measurement: "lb"
                },
                {
                    id: 7,
                    crop: "rice",
                    name: "Rice",
                    sort_order: 6,
                    tea: 750,
                    arm_default_price: 0.135,
                    arm_default_ins_price: 0.14,
                    measurement: "lb",
                    rebate_measurement: "bu"
                },
                {
                    id: 8,
                    crop: "peanuts",
                    name: "Peanuts",
                    sort_order: 7,
                    tea: 750,
                    arm_default_price: 2.3,
                    arm_default_ins_price: 2.8,
                    measurement: "bu",
                    rebate_measurement: "bu"
                },
                {
                    id: 9,
                    crop: "sugarcane",
                    name: "Sugar Cane",
                    sort_order: 8,
                    tea: 750,
                    arm_default_price: 0.28,
                    arm_default_ins_price: 0.16,
                    measurement: "ton",
                    rebate_measurement: "ton"
                },
                {
                    id: 10,
                    crop: "sunflowers",
                    name: "Sunflowers",
                    sort_order: 10,
                    tea: 0,
                    arm_default_price: 217.4,
                    arm_default_ins_price: 124.22,
                    measurement: "lb",
                    rebate_measurement: "lb"
                }
            ];
            var units = [];

            _.each(allcrops, function(c){
                _.each(pracs, function(p){
                    var foundIt = false;
                    if(Number(p.crop_id) === Number(c.id) && p.practice === IR_NI) {
                        p.crop = c.crop;
                        p.crop_name = c.name;
                        units.push(makeFarmPractice(p, c, loan));
                        foundIt = true;
                    }
                    if(!foundIt) {
                        units.push(makePractice(c.id));
                    }
                });
            })

            return units;
        }
        function splitFarmsByPractice(loan) {
            var practiced = [], withZero = [], optimized = [], totAcres, fsaPayIR, fsaPayNI;
            var farms = loan.farms;

            //splitting (ex. 4 farms -> 8)
            _.each(farms, function (item) {
                //if farm has acres, calculate Total Acres, and FSA By Acre
                if(Number(item.IR) + Number(item.NI) > 0) {
                    totAcres = Number(item.IR) + Number(item.NI);
                    fsaPayIR = item.fsa_paid * item.IR / totAcres;
                    fsaPayNI = item.fsa_paid - fsaPayIR;
                } else {
                    totAcres = 0;
                    fsaPayIR = 0;
                    fsaPayNI = 0;
                }

                var splitIR = {
                    id: item.id,
                    county: item.county.county,
                    state: item.county.state.abr,
                    fsn: item.fsn,
                    owner: item.owner,
                    acres: Number(item.IR),
                    practice: 'IR',
                    cash_rent: Number(item.cash_rent),
                    dist_rent: Number(item.dist_rent),
                    waived: Number(item.waived),
                    share_rent: Number(item.share_rent),
                    perm_to_insure: item.perm_to_insure,
                    when_due: item.when_due,
                    fsa_paid: fsaPayIR,
                    cash_rent_acre_ARM: (Number(item.IR) !== 0 ? (Number(item.cash_rent) - Number(item.waived)) / Number(item.IR) : 0),
                    cash_rent_acre_dist: (Number(item.IR) !== 0 ? Number(item.dist_rent) / Number(item.IR) : 0),
                    cash_rent_acre_other: 0,
                    fsa_acre: (Number(item.IR) !== 0 ? fsaPayIR / Number(item.IR) : 0),
                    crops: item.units
                };
                var splitNI = {
                    id: item.id,
                    county: item.county.county,
                    state: item.county.state.abr,
                    fsn: item.fsn,
                    owner: item.owner,
                    acres: Number(item.NI),
                    practice: 'NI',
                    cash_rent: Number(item.cash_rent),
                    waived: Number(item.waived),
                    share_rent: Number(item.share_rent),
                    perm_to_insure: item.perm_to_insure,
                    when_due: item.when_due,
                    fsa_paid: fsaPayNI,
                    cash_rent_acre_ARM: (Number(item.NI) !== 0 ? (Number(item.cash_rent) - Number(item.waived)) / Number(item.NI) : 0),
                    cash_rent_acre_dist: (Number(item.NI) !== 0 ? Number(item.dist_rent) / Number(item.NI) : 0),
                    cash_rent_acre_other: 0,
                    fsa_acre: (Number(item.NI) !== 0 ? fsaPayIR / Number(item.NI) : 0),
                    crops: item.units
                };
                
                if (item.practice === 'IR') {
                    splitIR.push(item);
                } else if (item.practice === 'NI') {
                    splitNI.push(item);
                }

                practiced.push(splitNI);
                practiced.push(splitIR);
            });

            //filling in missing crops
            //console.log('PRACTICED', practiced);
            _.each(practiced, function (item) {
                // Adding variables necessary for Optimizer
                var processed = {
                    id: item.id,
                    state: item.state,
                    county: item.county,
                    fsn: item.fsn,
                    practice: item.practice,
                    owner: item.owner,
                    acres: item.acres,
                    share_rent: item.share_rent,
                    perm_to_insure: (item.perm_to_insure ? 'Y' : 'N'),
                    cash_rent: Number(item.cash_rent),
                    waived: Number(item.waived),
                    when_due: item.when_due,
                    fsa_paid: item.fsa_paid,
                    cash_rent_acre_ARM: item.cash_rent_acre_ARM,
                    cash_rent_acre_dist: item.cash_rent_acre_dist,
                    cash_rent_acre_other: item.cash_rent_acre_other,
                    fsa_acre: item.fsa_acre,
                    crops: processFarmCrops(item.crops, item.practice, loan)
                };
                withZero.push(processed);
            });

            //remove farms without acres
            _.each(withZero, function (item) {
                if (item.acres > 0) {
                    optimized.push(item);
                } else {
                    // handle "potential" farms (acres = 0)
                }
            });
            return optimized;
        }
    } // end factory
})();