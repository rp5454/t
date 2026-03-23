sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v4/ODataModel"
], function (Controller, ODataModel) {
    "use strict";

    return Controller.extend("mfu.dashboard.controller.Main", {

        onInit: function () {

            const oModel = new ODataModel({
                serviceUrl: "/odata/v4/MFUDashboardService/"
            });

            this.getView().setModel(oModel);

            this._loadChart();
        },

        _loadChart: function () {

            const oChart = this.byId("idBarChart");

            const oDataset = new sap.viz.ui5.data.FlattenedDataset({
                dimensions: [{
                    name: "Module",
                    value: "{moduleName}"
                }],
                measures: [
                    { name: "Approved", value: "{approved}" },
                    { name: "Pending", value: "{pending}" },
                    { name: "Uploaded", value: "{uploaded}" }
                ],
                data: {
                    path: "/ModuleStats"
                }
            });

            oChart.setDataset(oDataset);

            oChart.addFeed(new sap.viz.ui5.controls.common.feeds.FeedItem({
                uid: "valueAxis",
                type: "Measure",
                values: ["Approved", "Pending", "Uploaded"]
            }));

            oChart.addFeed(new sap.viz.ui5.controls.common.feeds.FeedItem({
                uid: "categoryAxis",
                type: "Dimension",
                values: ["Module"]
            }));
        }
    });
});
