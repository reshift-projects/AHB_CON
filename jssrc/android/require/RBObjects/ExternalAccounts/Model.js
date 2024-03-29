define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var setterFunctions = {
        Id: function(val, state) {
            state['Id'] = val;
        },
        accountNumber: function(val, state) {
            state['accountNumber'] = val;
        },
        accountType: function(val, state) {
            state['accountType'] = val;
        },
        bankName: function(val, state) {
            state['bankName'] = val;
        },
        beneficiaryName: function(val, state) {
            state['beneficiaryName'] = val;
        },
        countryName: function(val, state) {
            state['countryName'] = val;
        },
        createdOn: function(val, state) {
            state['createdOn'] = val;
        },
        errmsg: function(val, state) {
            state['errmsg'] = val;
        },
        firstName: function(val, state) {
            state['firstName'] = val;
        },
        isInternationalAccount: function(val, state) {
            state['isInternationalAccount'] = val;
        },
        isSameBankAccount: function(val, state) {
            state['isSameBankAccount'] = val;
        },
        isVerified: function(val, state) {
            state['isVerified'] = val;
        },
        lastName: function(val, state) {
            state['lastName'] = val;
        },
        limit: function(val, state) {
            state['limit'] = val;
        },
        nickName: function(val, state) {
            state['nickName'] = val;
        },
        notes: function(val, state) {
            state['notes'] = val;
        },
        offset: function(val, state) {
            state['offset'] = val;
        },
        order: function(val, state) {
            state['order'] = val;
        },
        routingNumber: function(val, state) {
            state['routingNumber'] = val;
        },
        searchString: function(val, state) {
            state['searchString'] = val;
        },
        sortBy: function(val, state) {
            state['sortBy'] = val;
        },
        success: function(val, state) {
            state['success'] = val;
        },
        swiftCode: function(val, state) {
            state['swiftCode'] = val;
        },
    };
    //Create the Model Class
    function ExternalAccounts(defaultValues) {
        var privateState = {};
        privateState.Id = defaultValues ? (defaultValues["Id"] ? defaultValues["Id"] : null) : null;
        privateState.accountNumber = defaultValues ? (defaultValues["accountNumber"] ? defaultValues["accountNumber"] : null) : null;
        privateState.accountType = defaultValues ? (defaultValues["accountType"] ? defaultValues["accountType"] : null) : null;
        privateState.bankName = defaultValues ? (defaultValues["bankName"] ? defaultValues["bankName"] : null) : null;
        privateState.beneficiaryName = defaultValues ? (defaultValues["beneficiaryName"] ? defaultValues["beneficiaryName"] : null) : null;
        privateState.countryName = defaultValues ? (defaultValues["countryName"] ? defaultValues["countryName"] : null) : null;
        privateState.createdOn = defaultValues ? (defaultValues["createdOn"] ? defaultValues["createdOn"] : null) : null;
        privateState.errmsg = defaultValues ? (defaultValues["errmsg"] ? defaultValues["errmsg"] : null) : null;
        privateState.firstName = defaultValues ? (defaultValues["firstName"] ? defaultValues["firstName"] : null) : null;
        privateState.isInternationalAccount = defaultValues ? (defaultValues["isInternationalAccount"] ? defaultValues["isInternationalAccount"] : null) : null;
        privateState.isSameBankAccount = defaultValues ? (defaultValues["isSameBankAccount"] ? defaultValues["isSameBankAccount"] : null) : null;
        privateState.isVerified = defaultValues ? (defaultValues["isVerified"] ? defaultValues["isVerified"] : null) : null;
        privateState.lastName = defaultValues ? (defaultValues["lastName"] ? defaultValues["lastName"] : null) : null;
        privateState.limit = defaultValues ? (defaultValues["limit"] ? defaultValues["limit"] : null) : null;
        privateState.nickName = defaultValues ? (defaultValues["nickName"] ? defaultValues["nickName"] : null) : null;
        privateState.notes = defaultValues ? (defaultValues["notes"] ? defaultValues["notes"] : null) : null;
        privateState.offset = defaultValues ? (defaultValues["offset"] ? defaultValues["offset"] : null) : null;
        privateState.order = defaultValues ? (defaultValues["order"] ? defaultValues["order"] : null) : null;
        privateState.routingNumber = defaultValues ? (defaultValues["routingNumber"] ? defaultValues["routingNumber"] : null) : null;
        privateState.searchString = defaultValues ? (defaultValues["searchString"] ? defaultValues["searchString"] : null) : null;
        privateState.sortBy = defaultValues ? (defaultValues["sortBy"] ? defaultValues["sortBy"] : null) : null;
        privateState.success = defaultValues ? (defaultValues["success"] ? defaultValues["success"] : null) : null;
        privateState.swiftCode = defaultValues ? (defaultValues["swiftCode"] ? defaultValues["swiftCode"] : null) : null;
        //Using parent contructor to create other properties req. to kony sdk	
        BaseModel.call(this);
        //Defining Getter/Setters
        Object.defineProperties(this, {
            "Id": {
                get: function() {
                    return privateState.Id
                },
                set: function(val) {
                    setterFunctions['Id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accountNumber": {
                get: function() {
                    return privateState.accountNumber
                },
                set: function(val) {
                    throw Error("accountNumber cannot be changed.");
                },
                enumerable: true,
            },
            "accountType": {
                get: function() {
                    return privateState.accountType
                },
                set: function(val) {
                    setterFunctions['accountType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bankName": {
                get: function() {
                    return privateState.bankName
                },
                set: function(val) {
                    setterFunctions['bankName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "beneficiaryName": {
                get: function() {
                    return privateState.beneficiaryName
                },
                set: function(val) {
                    setterFunctions['beneficiaryName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "countryName": {
                get: function() {
                    return privateState.countryName
                },
                set: function(val) {
                    setterFunctions['countryName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "createdOn": {
                get: function() {
                    return privateState.createdOn
                },
                set: function(val) {
                    setterFunctions['createdOn'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "errmsg": {
                get: function() {
                    return privateState.errmsg
                },
                set: function(val) {
                    setterFunctions['errmsg'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "firstName": {
                get: function() {
                    return privateState.firstName
                },
                set: function(val) {
                    setterFunctions['firstName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isInternationalAccount": {
                get: function() {
                    return privateState.isInternationalAccount
                },
                set: function(val) {
                    setterFunctions['isInternationalAccount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isSameBankAccount": {
                get: function() {
                    return privateState.isSameBankAccount
                },
                set: function(val) {
                    setterFunctions['isSameBankAccount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isVerified": {
                get: function() {
                    return privateState.isVerified
                },
                set: function(val) {
                    setterFunctions['isVerified'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastName": {
                get: function() {
                    return privateState.lastName
                },
                set: function(val) {
                    setterFunctions['lastName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "limit": {
                get: function() {
                    return privateState.limit
                },
                set: function(val) {
                    setterFunctions['limit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "nickName": {
                get: function() {
                    return privateState.nickName
                },
                set: function(val) {
                    setterFunctions['nickName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "notes": {
                get: function() {
                    return privateState.notes
                },
                set: function(val) {
                    setterFunctions['notes'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "offset": {
                get: function() {
                    return privateState.offset
                },
                set: function(val) {
                    setterFunctions['offset'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "order": {
                get: function() {
                    return privateState.order
                },
                set: function(val) {
                    setterFunctions['order'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "routingNumber": {
                get: function() {
                    return privateState.routingNumber
                },
                set: function(val) {
                    setterFunctions['routingNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "searchString": {
                get: function() {
                    return privateState.searchString
                },
                set: function(val) {
                    setterFunctions['searchString'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "sortBy": {
                get: function() {
                    return privateState.sortBy
                },
                set: function(val) {
                    setterFunctions['sortBy'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "success": {
                get: function() {
                    return privateState.success
                },
                set: function(val) {
                    setterFunctions['success'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "swiftCode": {
                get: function() {
                    return privateState.swiftCode
                },
                set: function(val) {
                    setterFunctions['swiftCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
        });
    }
    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(ExternalAccounts);
    //Create new class level validator object
    BaseModel.Validator.call(ExternalAccounts);
    var registerValidatorBackup = ExternalAccounts.registerValidator;
    ExternalAccounts.registerValidator = function() {
            var propName = arguments[0];
            if (!setterFunctions[propName].changed) {
                var setterBackup = setterFunctions[propName];
                setterFunctions[arguments[0]] = function() {
                    if (ExternalAccounts.isValid(this, propName, val)) {
                        return setterBackup.apply(null, arguments);
                    } else {
                        throw Error("Validation failed for " + propName + " : " + val);
                    }
                }
                setterFunctions[arguments[0]].changed = true;
            }
            return registerValidatorBackup.apply(null, arguments);
        }
        //Extending Model for custom operations
        //For Operation 'editExternalAccount' with service id 'editExternalAccount4139'
    ExternalAccounts.editExternalAccount = function(params, onCompletion) {
        return ExternalAccounts.customVerb('editExternalAccount', params, onCompletion);
    };
    //For Operation 'getOtherBankAccount' with service id 'getOtherBankAccount9167'
    ExternalAccounts.getOtherBankAccount = function(params, onCompletion) {
        return ExternalAccounts.customVerb('getOtherBankAccount', params, onCompletion);
    };
    //For Operation 'getAllInternationalExternalAccounts' with service id 'getInternationalExternalAccounts8295'
    ExternalAccounts.getAllInternationalExternalAccounts = function(params, onCompletion) {
        return ExternalAccounts.customVerb('getAllInternationalExternalAccounts', params, onCompletion);
    };
    //For Operation 'getSameBankAccount' with service id 'getSameBankAccount4901'
    ExternalAccounts.getSameBankAccount = function(params, onCompletion) {
        return ExternalAccounts.customVerb('getSameBankAccount', params, onCompletion);
    };
    //For Operation 'getAllExternalAccountsWithPagination' with service id 'getAllExternalAccountsWithPagination8423'
    ExternalAccounts.getAllExternalAccountsWithPagination = function(params, onCompletion) {
        return ExternalAccounts.customVerb('getAllExternalAccountsWithPagination', params, onCompletion);
    };
    //For Operation 'getFrequentSameBankAccount' with service id 'getSameBankAccount1266'
    ExternalAccounts.getFrequentSameBankAccount = function(params, onCompletion) {
        return ExternalAccounts.customVerb('getFrequentSameBankAccount', params, onCompletion);
    };
    //For Operation 'getFrequentOtherBankAccount' with service id 'getOtherBankAccount3173'
    ExternalAccounts.getFrequentOtherBankAccount = function(params, onCompletion) {
        return ExternalAccounts.customVerb('getFrequentOtherBankAccount', params, onCompletion);
    };
    //For Operation 'getUnverifiedExternalAccounts' with service id 'getUnverifiedExternalAccounts9007'
    ExternalAccounts.getUnverifiedExternalAccounts = function(params, onCompletion) {
        return ExternalAccounts.customVerb('getUnverifiedExternalAccounts', params, onCompletion);
    };
    //For Operation 'deleteExternalAccount' with service id 'deleteExternalAccount8173'
    ExternalAccounts.deleteExternalAccount = function(params, onCompletion) {
        return ExternalAccounts.customVerb('deleteExternalAccount', params, onCompletion);
    };
    //For Operation 'getFrequentInternationalExternalAccounts' with service id 'getExternalAccounts2444'
    ExternalAccounts.getFrequentInternationalExternalAccounts = function(params, onCompletion) {
        return ExternalAccounts.customVerb('getFrequentInternationalExternalAccounts', params, onCompletion);
    };
    var relations = [];
    ExternalAccounts.relations = relations;
    ExternalAccounts.prototype.isValid = function() {
        return ExternalAccounts.isValid(this);
    };
    ExternalAccounts.prototype.objModelName = "ExternalAccounts";
    return ExternalAccounts;
});