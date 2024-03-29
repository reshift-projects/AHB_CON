define({
    init : function(){
      try {
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }      
    },
    /**
     * Description
     * @method pfmPreshow
     * @return 
     */
    pfmPreshow: function() {
      try {
      	if (kony.os.deviceInfo().name === "iPhone") {
            this.view.flxHeader.isVisible = false;
        } else {
            this.view.flxHeader.isVisible = true;
        }

          var MyMoney = applicationManager.getLoggerManager(); 
                MyMoney.setCustomMetrics(this, false, "MyMoney");
        this.chartColors = {
            "1": "#6753EC",
            "2": "#3645A7",
            "3": "#FDDB64",
            "4": "#8ED174",
            "5": "#E8A75E",
            "6": "#04B6DF",
            "7": "#E87C5E",
            "8": "#D6B9EA"
        };
        this.CATEGORY_COUNT = 9;
        this.MONTH_NAMES = ["None", "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
      	this.YEAR_NAMES = ["2016","2017","2018"];
      	this.currentYear = 2;
        this.isYear = false;
        this.setActions();
      	var date = new Date();
		this.currentMonthId = parseInt(date.getMonth()+1);
      	this.limitMonth = this.currentMonthId;
        var navManager = applicationManager.getNavigationManager();
        var frmData = navManager.getCustomInfo("frmPFMMyMoney");
		this.view.segBudget.isVisible = false;
        this.bar = frmData.bar;
        this.pie = frmData.pie;
        this.budget = frmData.budget;
   		var currentForm=navManager.getCurrentForm();
   		applicationManager.getPresentationFormUtility().logFormName(currentForm);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
      catch(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    /**
     * Description
     * @method pfmPostshow
     * @return 
     */
    pfmPostshow: function() {
        try {
          	applicationManager.getPresentationUtility().showLoadingScreen();
            var navManager = applicationManager.getNavigationManager();
            var selectedData = navManager.getCustomInfo("frmPFMSelectTimePeriod");
          	this.view.customHeader.flxBack.onClick = this.navigateBackToDashboard.bind(this);
            try {
                kony.timer.cancel("chartTimer");
            } catch (exception) {

            }
            if (kony.sdk.isNullOrUndefined(selectedData)) {
                kony.timer.schedule("chartTimer", this.setMonthChartData.bind(this, this.pie[this.MONTH_NAMES[this.currentMonthId]]), 2, false);
            } else {
                if (selectedData.currentSelected == "month") {
                    this.currentMonthId = selectedData.monthId;
                    kony.timer.schedule("chartTimer", this.setMonthChartData.bind(this, this.pie[this.MONTH_NAMES[selectedData.monthId]]), 2, false);
                } else if (selectedData.currentSelected === "year") {
                    kony.timer.schedule("chartTimer", this.onPieClick.bind(this), 2, false);
                }
            }
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method onPreviousMonthClick
     * @return 
     */
    onPreviousMonthClick: function() {
        try {
          	if(this.isYear){
              if(this.currentYear == 0){
                return;
              }
              this.currentYear--;
              this.view.lblDateRange.text = this.YEAR_NAMES[this.currentYear];
            }
          else{
            if (this.currentMonthId == 1) {
                return;
            }

            this.currentMonthId--;
            if (!this.setMonthChartData(this.pie[this.MONTH_NAMES[this.currentMonthId]])) {
                this.currentMonthId++;
            }
          }
        }
        catch(err) {
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method onNextMonthClick
     * @return 
     */
    onNextMonthClick: function() {
        try {
          	if(this.isYear){
              if(this.currentYear == 2){
                return;
              }
              this.currentYear++;
              this.view.lblDateRange.text = this.YEAR_NAMES[this.currentYear];
            }
          else{
            if (this.currentMonthId >= this.limitMonth) {
                return;
            }
            this.currentMonthId++;
            if (!this.setMonthChartData(this.pie[this.MONTH_NAMES[this.currentMonthId]])) {
                this.currentMonthId--;
            }
          }
        }
        catch(err) {
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method setMonthChartData
     * @param {} pieData
     * @return 
     */
    setMonthChartData: function(pieData) {
        try {
            if (kony.sdk.isNullOrUndefined(pieData) || !pieData.length) {
                return false;
            }
            var self = this;
          	this.view.lblDateRange.text = this.MONTH_NAMES[this.currentMonthId] + " " + this.YEAR_NAMES[this.currentYear];
          	if(this.view.segBudget.isVisible == true){
              return true;
            }
            // Extract Pie data and show it
            this.toggleWidgetVisibilities(true, false, true, false, true, true, "sknbtnbg046AF9noradius", "sknbtnfont046AF9noradius", true,false);
            this.isYear = false;
            this.view.flxDateLeft.setEnabled(true);
            this.view.flxDateRight.setEnabled(true);
            var formatUtility = applicationManager.getFormatUtilManager();
            this.view.flxToggle.isVisible = false;
            var chartData = [];
            var segSpendingData = [];
            var totalAmount = pieData.reduce(function(previous, record) {
                return previous + Number(record.cashSpent);
            }, 0);
            
            this.view.lblTotalSpendingValue.text = formatUtility.formatAmountandAppendCurrencySymbol(totalAmount);
            pieData.forEach(function(record) {
                chartData.push({
                    "label": record.categoryName,
                    "value": record.cashSpent,
                    "color": self.hexToRgbA(self.chartColors[record.cateforyId])
                });

                var percentageValue = Math.round((record.cashSpent * 100) / totalAmount);
                segSpendingData.push({
                    "categoryName": record.categoryName + " - " + percentageValue + "%",
                    "cashSpent": formatUtility.formatAmountandAppendCurrencySymbol(record.cashSpent),
                    "categoryColor": {
                        "skin": "sknFlxChart" + record.cateforyId
                    }
                });
            });

            var stringifiedData = "generateDoughnutChart(" + JSON.stringify(chartData) + ");";
            this.view.brwsrPie.evaluateJavaScript(stringifiedData);

            this.view.segSpending.widgetDataMap = {
                "lblSpending": "categoryName",
                "lblAmountSpent": "cashSpent",
                "flxColor": "categoryColor"
            };

            this.view.segSpending.setData(segSpendingData);
            applicationManager.getPresentationUtility().dismissLoadingScreen();

            return true;
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method setYearChartData
     * @param {} chartType
     * @return 
     */
    setYearChartData: function(chartType) {
        try {
            var formatUtility = applicationManager.getFormatUtilManager();

            var stringifiedData = "";
            var totalAmount = 0;

            var isChartCreated = false;
            if (chartType === "pie") {

                this.isYear = true;
                //this.view.flxDateLeft.setEnabled(false);
                //this.view.flxDateRight.setEnabled(false);
                this.view.flxToggle.isVisible = true;
                // Extract yearly data and show it

                this.view.segSpending.isVisible = true;

                var chartData = [];
                var tempData = {};
                var categories = {};
                for (var month in this.pie) {
                    var monthData = this.pie[month];
                    for (var i = 0; i < monthData.length; i++) {
                        if (!tempData[monthData[i].categoryName]) {
                            tempData[monthData[i].categoryName] = 0;
                        }
                        totalAmount += parseFloat(monthData[i].cashSpent);
                        tempData[monthData[i].categoryName] += parseFloat(monthData[i].cashSpent);

                        categories[monthData[i].categoryName] = monthData[i].cateforyId;
                    }
                }

                var segmentData = [];
                for (var category in tempData) {

                    var percentageValue = Math.round((tempData[category] * 100) / totalAmount);

                    chartData.push({
                        "label": category,
                        "value": tempData[category],
                        "color": this.chartColors[categories[category]]

                    });
                    segmentData.push({
                        "categoryName": category + " - " + percentageValue + "%",
                        "cashSpent": formatUtility.formatAmountandAppendCurrencySymbol(tempData[category]),
                        "categoryColor": {
                            "skin": "sknFlxChart" + categories[category]
                        }
                    });

                }


                this.view.segSpending.widgetDataMap = {
                    "lblSpending": "categoryName",
                    "lblAmountSpent": "cashSpent",
                    "flxColor": "categoryColor"
                };

                stringifiedData = "generateDoughnutChart(" + JSON.stringify(chartData) + ");";
                isChartCreated = this.view.brwsrPie.evaluateJavaScript(stringifiedData);
                this.view.segSpending.setData(segmentData);
                this.view.segSpending.isVisible = true;
            } else if (chartType === "bar") {

                this.view.segSpending.isVisible = false;
                var barData = [];
                this.bar.forEach(function(record) {
                    barData.push({
                        "value": parseFloat(record.totalCashFlow),
                        "month": record.monthName.toUpperCase().substr(0, 3),
                        "color": "#ffcc00"
                    });
                    totalAmount += parseFloat(record.totalCashFlow);

                });

                stringifiedData = "generateBarGraph(" + JSON.stringify(barData) + ");";
                isChartCreated = this.view.brwsrPie.evaluateJavaScript(stringifiedData);
            }
            this.view.lblDateRange.text = "2018";
            this.view.lblTotalSpendingValue.text = formatUtility.formatAmountandAppendCurrencySymbol(totalAmount);
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method setActions
     * @return 
     */
    setActions: function() {
        try {
          	var self = this;
            this.view.btnSpending.onClick = this.onSpendingClick.bind(this);
            this.view.btnBudget.onClick = this.onBudgetClick.bind(this);
            this.view.flxCalIcon.onClick = this.onCalendarIconClick.bind(this);
            this.view.flxDateLeft.onClick = this.onPreviousMonthClick.bind(this);
            this.view.flxDateRight.onClick = this.onNextMonthClick.bind(this);
            this.view.flxPie.onClick = this.onPieClick.bind(this);
            this.view.flxBar.onClick = this.onBarClick.bind(this);
          	this.view.btnViewTransactions.onClick = function () {
              self.viewTransactionsOnClick();
        		};
        }
        catch(err) {
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },

    /**
     * Description
     * @method setBarAndPieIcons
     * @param {} pie
     * @param {} bar
     * @return 
     */
    setBarAndPieIcons: function(pie, bar) {
        try {
            this.view.imgPie.src = pie;
            this.view.imgBar.src = bar;
        }
        catch(err) {
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method onPieClick
     * @return 
     */
    onPieClick: function() {
        try {
            //Toggle icons
            this.toggleWidgetVisibilities(true, false, true, false, true, true, "sknbtnbg046AF9noradius", "sknbtnfont046AF9noradius", true, false);
            this.setBarAndPieIcons("piechartactive.png", "barchartinactive.png");
            this.setYearChartData("pie");
        }
        catch(err) {
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method onBarClick
     * @return 
     */
    onBarClick: function() {
        try {
            //Toggle icons
          	this.view.flxDummy.isVisible = true;
            this.setBarAndPieIcons("piechartinactive.png", "barchartactive.png");
            this.setYearChartData("bar");
        }
        catch(err) {
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method onCalendarIconClick
     * @return 
     */
    onCalendarIconClick: function() {
        try {
            var navManager = applicationManager.getNavigationManager();
            var selectedData = navManager.getCustomInfo("frmPFMSelectTimePeriod");
            if (kony.sdk.isNullOrUndefined(selectedData)) {
                selectedData = {
                    "currentSelected": "month",
                };
            }
            if (this.isYear) {
                selectedData.chart = "pie";
            } else {
                selectedData.monthId = this.currentMonthId;
            }
            navManager.setCustomInfo("frmPFMSelectTimePeriod", selectedData);
            applicationManager.getPresentationUtility().showLoadingScreen();
            var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
      	    accountModule.presentationController.commonFunctionForNavigation("frmPFMSelectTimePeriod");
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },

    /**
     * Description
     * @method toggleWidgetVisibilities
     * @param {} flxPieChart
     * @param {} flxBudgetSegment
     * @param {} flxCharts
     * @param {} flxBarChart
     * @param {} flxDummy
     * @param {} segSpending
     * @param {} spendingSkin
     * @param {} budgetSkin
     * @param {} btnTransactions
     * @param {} segBudget
     * @return 
     */
    toggleWidgetVisibilities: function(flxPieChart, flxBudgetSegment, flxCharts, flxBarChart, flxDummy, segSpending, spendingSkin, budgetSkin, btnTransactions, segBudget) {
        try {
            this.view.flxPieChart.isVisible = flxPieChart;
            this.view.flxBudgetSegment.isVisible = flxBudgetSegment;
            this.view.flxBarChart.isVisible = flxBarChart;
            this.view.flxCharts.isVisible = flxCharts;
            this.view.flxDummy.isVisible = flxDummy;
            this.view.segSpending.isVisible = segSpending;
            this.view.segBudget.isVisible = segBudget;
            this.view.btnSpending.skin = spendingSkin;
            this.view.btnBudget.skin = budgetSkin;
            this.view.btnViewTransactions.isVisible = btnTransactions;
        }
        catch(err) {
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method onSpendingClick
     * @return 
     */
    onSpendingClick: function() {
        try {
            this.toggleWidgetVisibilities(true, false, true, false, true, true, "sknbtnbg046AF9noradius", "sknbtnfont046AF9noradius", true, false);
            var navManager = applicationManager.getNavigationManager();
            var selectedData = navManager.getCustomInfo("frmPFMSelectTimePeriod");
            if (!kony.sdk.isNullOrUndefined(selectedData)) {
                if (selectedData.currentSelected === "year") {
                    this.onPieClick("pie");
                } else if (selectedData.currentSelected === "month") {
                    this.currentMonthId = selectedData.monthId;
                    this.setMonthChartData(this.pie[this.MONTH_NAMES[this.currentMonthId]]);
                }
            } else {
                if (this.isYear) {
                    //Year Logic
                    this.view.flxToggle.isVisible = true;
                } else {
                    this.setMonthChartData(this.pie[this.MONTH_NAMES[this.currentMonthId]]);
                }
            }
        }
        catch(err) {
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method onBudgetClick
     * @return 
     */
    onBudgetClick: function() {
        try {
            this.toggleWidgetVisibilities(false, true, false, false, false, false, "sknbtnfont046AF9noradius", "sknbtnbg046AF9noradius", false, true);

            this.view.flxToggle.isVisible = false;

			this.isYear = false;
            this.view.lblDateRange.text = this.MONTH_NAMES[this.currentMonthId] + " " + this.YEAR_NAMES[this.currentYear];
            var formatUtility = applicationManager.getFormatUtilManager();

            var maxAllocatedAmount = this.budget.reduce(function(previousMax, record) {
                return (previousMax > parseFloat(record.allocatedAmount) ? previousMax : record.allocatedAmount);
            });

            var lineGraphData = [];
            var totalAmountSpent = 0;
            var categories = {
                "1": "rent.png",
                "2": "homeneeds.png",
                "3": "miscellaneous.png",
                "4": "education.png"
            };
            this.budget.forEach(function(record) {

                lineGraphData.push({
                    "flxTarget": {
                        "width": (parseFloat(record.allocatedAmount) * 100) / maxAllocatedAmount + "%"
                    },
                    "flxSpent": {
                        "width": (parseFloat(record.amountSpent) * 100) / maxAllocatedAmount + "%"
                    },
                    "categoryName": record.categoryName + " - " + parseFloat(record.amountSpent) * 100 / parseFloat(record.allocatedAmount) + "%",
                    "totalBudget": formatUtility.formatAmountandAppendCurrencySymbol(record.allocatedAmount),
                    "categoryImage": categories[record.categoryId]
                });

                totalAmountSpent += parseFloat(record.amountSpent);
            });

            this.view.lblTotalSpendingValue.text = formatUtility.formatAmountandAppendCurrencySymbol(totalAmountSpent);

            this.view.segBudget.widgetDataMap = {
                "flxTarget": "flxTarget",
                "flxSpent": "flxSpent",
                "lblBudgetName": "categoryName",
                "lblBudgetAmount": "totalBudget",
                "imgBudgetType": "categoryImage"
            };
            this.view.segBudget.setData(lineGraphData);
        }
        catch(err) {
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method viewTransactionsOnClick
     * @return 
     */
    viewTransactionsOnClick: function() {
        try {
            applicationManager.getPresentationUtility().showLoadingScreen();
          	var navManager = applicationManager.getNavigationManager();
          	navManager.setCustomInfo("navigationToTransactions",true);
            this.currentTransactions = 0;
            this.totalTransactions = 0;
            //Goto transactions
            if (this.isYear) {
                //Fetch yearly transactions
                this.totalTransactions = 108;
                for (var j = 1; j < 13; j++) {
                    for (i = 1; i <= this.CATEGORY_COUNT; i++) {
                        this.fetchTransactions(j, i);
                    }
                }
            } else {
                //Fetch monthly transactions
                this.totalTransactions = this.CATEGORY_COUNT;
                for (i = 1; i <= this.CATEGORY_COUNT; i++) {
                    this.fetchTransactions(this.currentMonthId, i);
                }
            }
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.LOG, arguments.callee.name);
        }
    },


    /**
     * Description
     * @method fetchTransactions
     * @param {} monthId
     * @param {} categoryId
     * @return 
     */
    fetchTransactions: function(monthId, categoryId) {
        try {
            this.transactions = [];
          	var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
            var inputParams = {
                "monthId": monthId + "",
                "categoryId": categoryId + ""
            };
			accountMod.presentationController.getPFMTransactions(inputParams, this.fetchTransactionsSuccess.bind(this), this.fetchTransactionsFailure.bind(this));
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method fetchTransactionsSuccess
     * @param {} response
     * @return 
     */
    fetchTransactionsSuccess: function(response) {
        try {
            this.currentTransactions++;
            Array.prototype.push.apply(this.transactions, response);
            if (this.currentTransactions === this.totalTransactions) {
                var navManager = applicationManager.getNavigationManager();
                navManager.setCustomInfo("frmPFMCategorisedTransactions", this.transactions);
                var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
      	        accountModule.presentationController.commonFunctionForNavigation("frmPFMCategorisedTransactions");
            }
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method fetchTransactionsFailure
     * @param {} response
     * @return 
     */
    fetchTransactionsFailure: function(response) {
        try {
            this.currentTransactions++;
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
        // alert("Failure" + JSON.stringify(response));
    },
    /**
     * Description
     * @method random_rgba
     * @return 
     */
    random_rgba: function() {
        try {
            var o = Math.round,
                r = Math.random,
                s = 255;
            return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',1)';
        }
        catch(err) {
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.processingError", GlobalExceptionHandler.ActionConstants.LOG, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method hexToRgbA
     * @param {} hex
     * @return 
     */
    hexToRgbA: function(hex) {
        try {
            var c;
            if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
                c = hex.substring(1).split('');
                if (c.length == 3) {
                    c = [c[0], c[0], c[1], c[1], c[2], c[2]];
                }
                c = '0x' + c.join('');
                return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1)';
            }
            throw new Error('Bad Hex');
        }
        catch(err) {
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.processingError", GlobalExceptionHandler.ActionConstants.LOG, arguments.callee.name);
        }
    },
  	navigateBackToDashboard : function(){
       var navManager = applicationManager.getNavigationManager();
       navManager.goBack();
    }

});