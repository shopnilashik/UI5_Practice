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
        let oModel = new sap.ui.model.json.JSONModel("../model/products.json");
        let test = this.getView().setModel(oModel);
      },
      onDeleteButtonPressed: function (oEvent) {
        console.log("Delete press");
        let oModel = this.getView().getModel();
        let oResourceBundle = this.getView()
          .getModel("i18n")
          .getResourceBundle();
        let oSource = oEvent.getSource();
        let sPath = oSource.getBindingContext().getPath();
        //   console.log(sPath);
        MessageBox.warning(oResourceBundle.getText("sureToDeleteQuestion"), {
          title: oResourceBundle.getText("sureToDeleteTitle"),
          actions: [MessageBox.Action.YES, MessageBox.Action.NO],
          emphasizedAction: MessageBox.Action.YES,
          onClose: function (oAction) {
            if (MessageBox.Action.YES === oAction) {
              //   oModel.remove(sPath);
              console.log(sPath);
            }
          },
        });
      },
      onListItemPressed: function () {
        console.log("List pressed");
      },
    });
  }
);
