sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, MessageBox) {
    "use strict";

    return Controller.extend("project1.project1.controller.View1", {
      onInit: function () {
        // let oModel = new sap.ui.model.json.JSONModel();
        // let test = this.getView().setModel(oModel);
      },
      onDeleteButtonPressed: function (oEvent) {
        let oModel = this.getView().getModel();
        let oResourceBundle = this.getView()
          .getModel("i18n")
          .getResourceBundle();
        let oSource = oEvent.getSource();
        let sPath = oSource.getBindingContext().getPath();
        // oModel.remove(sPath);
        var row = oEvent.getSource().getParent().getId();
        var parent = oEvent.getSource().getParent().getParent();

        MessageBox.warning(oResourceBundle.getText("sureToDeleteQuestion"), {
          title: oResourceBundle.getText("sureToDeleteTitle"),
          actions: [MessageBox.Action.YES, MessageBox.Action.NO],
          emphasizedAction: MessageBox.Action.YES,
          onClose: (oAction) => {
            if (MessageBox.Action.YES === oAction) {
              parent.removeItem(row);
            }
          },
        });
      },
      onListItemPressed: function (oEvent) {
        let sPath = oEvent.getSource().getBindingContext().getPath();
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        var oItem = oEvent.getSource();
        // console.log(oItem.getBindingContext().getObject().id);
        oRouter.navTo("details", {
          id: window.encodeURIComponent(
            oItem.getBindingContext().getPath().substr(1)
          ),
        });
      },
      onCreatePressed: function () {
        let sPath = oEvent.getSource().getBindingContext().getPath();
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        console.log(oRouter);
        oRouter.navTo("details", {
          path: sPath.split("/")[1],
        });
      },
    });
  }
);
// onDelete: function(oEvent) {
//   this.mode = "delete"; var that = this;
//   var sData = oEvent.getSource().getModel("sOrder1").getData();
//   var oTable = this.byId("idSalesTable"); var selectedRowData = oTable.getSelectedContexts();//get the selected contexts if (selectedRowData.length === 0) {
//   MessageToast.show("please select atleast one row"); return;
// } else {
//   for (var i = selectedRowData.length - 1; i >= 0; i--) {
//     var oThisObj = selectedRowData[i].getObject(); var index = $.map(sData.Sales, function (obj, index) { if (obj === oThisObj) { return index; } });
// 					sData.Sales.splice(index, 1);//delete  record by using Splice}
// 				that.getView().getModel("sOrder1").setData(sData);//after deleting set the data// this._oTable.getModel().setData(sData);
// 				oTable.removeSelections(true);}},
