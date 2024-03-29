define([],function(){
	var mappings = {
		"Id" : "Id",
		"accountNumber" : "accountNumber",
		"accountType" : "accountType",
		"bankName" : "bankName",
		"beneficiaryName" : "beneficiaryName",
		"countryName" : "countryName",
		"createdOn" : "createdOn",
		"errmsg" : "errmsg",
		"firstName" : "firstName",
		"isInternationalAccount" : "isInternationalAccount",
		"isSameBankAccount" : "isSameBankAccount",
		"isVerified" : "isVerified",
		"lastName" : "lastName",
		"limit" : "limit",
		"nickName" : "nickName",
		"notes" : "notes",
		"offset" : "offset",
		"order" : "order",
		"routingNumber" : "routingNumber",
		"searchString" : "searchString",
		"sortBy" : "sortBy",
		"success" : "success",
		"swiftCode" : "swiftCode",
		"identifier" : "identifier",
		"code" : "code",
		"bankBranch" : "bankBranch",
		"countryCode" : "countryCode",
		"countrySpecificCode" : "countrySpecificCode",
		"returnText" : "returnText",
		"responseCode" : "responseCode",
		"responseMessage" : "responseMessage",
		"beneficiaryType" : "beneficiaryType",
		"beneficiaryAccountCurrency" : "beneficiaryAccountCurrency",
		"cifId" : "cifId",
		"bankId" : "bankId",
		"cityName" : "cityName",
	};
	Object.freeze(mappings);
	
	var typings = {
		"Id" : "string",
		"accountNumber" : "string",
		"accountType" : "string",
		"bankName" : "string",
		"beneficiaryName" : "string",
		"countryName" : "string",
		"createdOn" : "string",
		"errmsg" : "string",
		"firstName" : "string",
		"isInternationalAccount" : "string",
		"isSameBankAccount" : "string",
		"isVerified" : "string",
		"lastName" : "string",
		"limit" : "string",
		"nickName" : "string",
		"notes" : "string",
		"offset" : "string",
		"order" : "string",
		"routingNumber" : "string",
		"searchString" : "string",
		"sortBy" : "string",
		"success" : "string",
		"swiftCode" : "string",
		"identifier" : "string",
		"code" : "string",
		"bankBranch" : "string",
		"countryCode" : "string",
		"countrySpecificCode" : "string",
		"returnText" : "string",
		"responseCode" : "string",
		"responseMessage" : "string",
		"beneficiaryType" : "string",
		"beneficiaryAccountCurrency" : "string",
		"cifId" : "string",
		"bankId" : "string",
		"cityName" : "string",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
					"accountNumber",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "RBObjects",
		tableName : "ExternalAccounts"
	};
	Object.freeze(config);
	
	return config;
})
