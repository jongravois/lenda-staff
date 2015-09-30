(function () {
    angular.module('ARM')
        .filter('asDate', asDateFilter)
        .filter('booleanYN', booleanYNFilter)
        .filter('booleanYesNo', booleanYesNoFilter)
        .filter('dateFmt', dateFmtFilter)
        .filter('capitalize', capitalizeFilter)
        .filter('capitalizeFirst', capitalizeFirstFilter)
        .filter('displayname', displaynameFilter)
        .filter('displaynull', displaynullFilter)
        .filter('displaynNA', displayNAFilter)
        .filter('displaynullcurrency', displaynullcurrencyFilter)
        .filter('displaynullpercent', displaynullpercentFilter)
        .filter('displaynullsingle', displaynullsingleFilter)
        .filter('displaypercent', displaypercentFilter)
        .filter('boolean', booleanFilter)
        .filter('noCentsCurrency', noCentsCurrencyFilter)
        .filter('phone', phoneFilter)
        .filter('ssnum', ssnumFilter)
        .filter('stateabr', stateAbrFilter)
        .filter('justtext', justtextFilter)
        .filter('flexNumber', flexNumberFilter)
        .filter('flexZeroNumber', flexZeroNumberFilter)
        .filter('flexCurrency', flexCurrencyFilter)
        .filter('flexZeroCurrency', flexZeroCurrencyFilter)
        .filter('flexNACurrency', flexNACurrencyFilter)
        .filter('flexPercent', flexPercentFilter)
        .filter('flexZeroPercent', flexZeroPercentFilter)
        .filter('flexNAPercent', flexNAPercentFilter)
        .filter('orderObjectBy', orderObjectBy);

    function asDateFilter() {
        return function (input) {
            return new Date(input);
        };
    }

    function booleanYNFilter() {
        return function(input) {
            if(!_.isBoolean(input)) { return input; }
            if(input) {
                return 'Y';
            } else {
                return 'N';
            }
        };
    }

    function booleanYesNoFilter() {
        return function(input) {
            if(!_.isBoolean(input)) { return input; }
            if(input) {
                return 'Yes';
            } else {
                return 'No';
            }
        };
    }

    function dateFmtFilter($filter) {
        return function (input) {
            if (input === null) {
                return '';
            }

            return moment(input).format('MM/DD/YYYY h:mm A');
        };
    }

    function capitalizeFilter () {
        return function (input, format) {
            if (!input) {
                return input;
            }
            format = format || 'all';
            if (format === 'first') {
                // Capitalize the first letter of a sentence
                return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
            } else {
                var words = input.split(' ');
                var result = [];
                words.forEach(function(word) {
                    if (word.length === 2 && format === 'team') {
                        // Uppercase team abbreviations like FC, CD, SD
                        result.push(word.toUpperCase());
                    } else {
                        result.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
                    }
                });
                return result.join(' ');
            }
        };
    }

    function capitalizeFirstFilter() {
        return function (input) {
            return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1);
            }) : '';
        };
    }

    function displaynameFilter() {
        return function (input) {
            if (!input) {
                return '';
            }
            if (typeof input !== 'string')
            {
                return '';
            }
            if (input.indexOf(',') < 1) {
                return input;
            }
            return input.substring(input.indexOf(',') + 1) + ' ' + input.substring(0, input.indexOf(','));
        };
    }

    function displayNAFilter() {
        return function (input) {
            if (!input) {
                return 'N/A';
            }
            if (parseFloat(input) !== 0) {
                return input;
            }
            return ' - ';
        };
    }

    function displaynullFilter() {
        return function (input) {
            if (!input) {
                return ' - ';
            }
            if (parseFloat(input) !== 0) {
                return input;
            }
            return ' - ';
        };
    }

    function displaynullcurrencyFilter($filter) {
        return function (input) {
            if (!input) {
                return ' - ';
            }
            if (parseFloat(input) !== 0) {
                return $filter('currency')(input);
            }
            return ' - ';
        };
    }

    function displaynullpercentFilter($filter) {
        return function (input) {
            if (!input) {
                return ' - ';
            }
            if (parseFloat(input) !== 0) {
                return $filter('number')(input, 1) + '%';
            }
            return ' - ';
        };
    }

    function displaynullsingleFilter($filter) {
        return function (input) {
            if (!input) {
                return ' - ';
            }
            if (parseFloat(input) !== 0) {
                return $filter('number')(input, 1);
            }
            return ' - ';
        };
    }

    function displaypercentFilter($filter) {
        return function (input) {
            return $filter('number')(input, 0) + '%';
        };
    }

    function booleanFilter($filter) {
        return function (input) {
            if (input === 1 || input === true) {
                return 'Yes';
            }
            return 'No';
        };
    }

    function noCentsCurrencyFilter($filter, $locale) {
        var currencyFilter = $filter('currency');
        var formats = $locale.NUMBER_FORMATS;
        return function (amount, currencySymbol) {
            if (!amount) {
                return ' - ';
            }
            var value = currencyFilter(amount, currencySymbol);
            var sep = value.indexOf(formats.DECIMAL_SEP);
            //console.log(amount, value);
            if (amount >= 0) {
                return value.substring(0, sep);
            }
            return value.substring(0, sep) + ')';
        };

    }

    function phoneFilter() {
        return function (input) {
            if (!input) {
                return '';
            }
            if (input.length < 10) {
                return input;
            }
            return '(' + input.substr(0, 3) + ') ' + input.substr(3, 3) + '-' + input.substr(6, 4);
        };
    }

    function ssnumFilter() {
        return function (input) {
            if (!input) { return ''; }

            if (input.length !== 9) {
                return input;
            }
            var ssn = input.substr(0, 3) + '-' + input.substr(3, 2) + '-' + input.substr(5, 4);
            return ssn;
        };
    }

    function justtextFilter(input) {
        return function (input) {
            return input;
        };
    }

    function flexNumberFilter($filter) {
        return function (input, decPlaces) {
            decPlaces = decPlaces || 0;

            // Check for invalid inputs
            if (isNaN(input)) {
                return input;
            }
            if (input === '' || input === null || input === 0 || input === -0) {
                return ' - ';
            }
            var out = input;

            //Deal with the minus (negative numbers)
            var minus = input < 0;
            out = Math.abs(out);
            out = $filter('number')(out, decPlaces);

            // Add the minus and the symbol
            if (minus) {
                return '( ' + out + ')';
            } else {
                return out;
            }
        };
    }

    function flexZeroNumberFilter($filter) {
        return function (input, decPlaces) {
            decPlaces = decPlaces || 0;

            // Check for invalid inputs
            if (isNaN(input)) {
                return input;
            }
            if (input === '' || input === null) {
                return ' - ';
            }
            var out = input;

            //Deal with the minus (negative numbers)
            var minus = input < 0;
            out = Math.abs(out);
            out = $filter('number')(out, decPlaces);

            // Add the minus and the symbol
            if (minus) {
                return '( ' + out + ')';
            } else {
                return out;
            }
        };
    }

    function flexNACurrencyFilter($filter) {
        return function (input, decPlaces) {
            decPlaces = decPlaces || 0;

            // Check for invalid inputs
            if (isNaN(input)) {
                return input;
            }
            if (input === '' || input === null) {
                return 'N/A';
            } else if(input === 0 || input === -0) {
                return ' - ';
            }
            var out = input;

            //Deal with the minus (negative numbers)
            var minus = input < 0;
            out = Math.abs(out);
            out = $filter('number')(out, decPlaces);

            // Add the minus and the symbol
            if (minus) {
                return '( $' + out + ')';
            } else {
                return '$' + out;
            }
        };
    }

    function flexCurrencyFilter($filter) {
        return function (input, decPlaces) {
            decPlaces = decPlaces || 0;

            // Check for invalid inputs
            if (isNaN(input) || !input || Math.abs(input) === 0 || (Math.abs(input) > 0 && Math.abs(input) < 1)) {
                return '-';
            }
            var out = input;

            //Deal with the minus (negative numbers)
            var minus = out < 0;
            out = Math.abs(out);
            out = $filter('number')(out, decPlaces);

            // Add the minus and the symbol
            if (minus) {
                return '( $' + out + ')';
            } else {
                return '$' + out;
            }
        };
    }

    function flexZeroCurrencyFilter($filter) {
        return function (input, decPlaces) {
            decPlaces = decPlaces || 0;

            // Check for invalid inputs
            if (isNaN(input)) {
                return ' - ';
            }
            var out = input;

            //Deal with the minus (negative numbers)
            var minus = out < 0;
            out = Math.abs(out);
            out = $filter('number')(out, decPlaces);

            // Add the minus and the symbol
            if (minus) {
                return '( $' + out + ')';
            } else {
                return '$' + out;
            }
        };
    }

    function flexNAPercentFilter($filter) {
        return function (input, decPlaces) {
            decPlaces = decPlaces || 0;

            // Check for invalid inputs
            if (isNaN(input)) {
                return input;
            }
            if (input === '' || input === null) {
                return 'N/A';
            }
            var out = input;

            //Deal with the minus (negative numbers)
            var minus = input < 0;
            out = Math.abs(out);
            out = $filter('number')(out, decPlaces);

            // Add the minus and the symbol
            if (minus) {
                return '( ' + out + '%)';
            } else {
                return out + '%';
            }
        };
    }

    function stateAbrFilter() {
        var statesHash = {
            1: 'AL',
            2: 'AK',
            3: 'AZ',
            4: 'AR',
            5: 'CA',
            6: 'CO',
            7: 'CT',
            8: 'DE',
            9: 'DC',
            10: 'FL',
            11: 'GA',
            12: 'HI',
            13: 'ID',
            14: 'IL',
            15: 'IN',
            16: 'IA',
            17: 'KS',
            18: 'KY',
            19: 'LA',
            20: 'ME',
            21: 'MD',
            22: 'MA',
            23: 'MI',
            24: 'MN',
            25: 'MS',
            26: 'MO',
            27: 'MT',
            28: 'NE',
            29: 'NV',
            30: 'NH',
            31: 'NJ',
            32: 'NM',
            33: 'NY',
            34: 'NC',
            35: 'ND',
            36: 'OH',
            37: 'OK',
            38: 'OR',
            39: 'PA',
            40: 'RI',
            41: 'SC',
            42: 'SD',
            43: 'TN',
            44: 'TX',
            45: 'UT',
            46: 'VT',
            47: 'VA',
            48: 'WA',
            49: 'WV',
            50: 'WI',
            51: 'WY',
            52: 'USA'
        };

        return function(input) {
            if (!input) {
                return '';
            } else {
                return statesHash[input];
            }
        };
    }

    function flexPercentFilter($filter) {
        return function (input, decPlaces) {
            decPlaces = decPlaces || 0;

            // Check for invalid inputs
            if (isNaN(input)) {
                return input;
            }
            if (input === '' || input === null || input === 0 || input === -0) {
                return ' - ';
            }
            var out = input;

            //Deal with the minus (negative numbers)
            var minus = input < 0;
            out = Math.abs(out);
            out = $filter('number')(out, decPlaces);

            // Add the minus and the symbol
            if (minus) {
                return '( ' + out + '%)';
            } else {
                return out + '%';
            }
        };
    }

    function flexZeroPercentFilter($filter) {
        return function (input, decPlaces) {
            decPlaces = decPlaces || 0;

            // Check for invalid inputs
            if (isNaN(input)) {
                return input;
            }
            if (input === '' || input === null) {
                return ' - ';
            }
            var out = input;

            //Deal with the minus (negative numbers)
            var minus = input < 0;
            out = Math.abs(out);
            out = $filter('number')(out, decPlaces);

            // Add the minus and the symbol
            if (minus) {
                return '( ' + out + '%)';
            } else {
                return out + '%';
            }
        };
    }

    function orderObjectBy() {
        return function (items, field, reverse) {
            var filtered = [];
            angular.forEach(items, function (item) {
                filtered.push(item);
            });
            filtered.sort(function (a, b) {
                return (a[field] > b[field] ? 1 : -1);
            });
            if (reverse) {
                filtered.reverse();
            }

            return filtered;
        };
    }
}());
