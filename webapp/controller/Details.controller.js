sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
  ],
  function (BaseController, History, JSONModel) {
    "use strict";

    return BaseController.extend(
      "project1.project1.controller.controller.Details",
      {
        onInit() {
          let oEditModel = new JSONModel({
            editmode: false,
            textMode: true,
          });
          this.getView().setModel(oEditModel, "editModel");
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          oRouter
            .getRoute("details")
            .attachPatternMatched(this._onPatternMatched, this);
        },
        _onPatternMatched: function (oEvent) {
          this.getView().bindElement({
            path:
              "/" +
              window.decodeURIComponent(oEvent.getParameter("arguments").id),
          });
        },
        onEditPressed: function () {
          this._toggleEdit(true, false);
        },

        _toggleEdit: function (bEditMode, textMode) {
          let oEditModel = this.getView().getModel("editModel");

          oEditModel.setProperty("/editmode", bEditMode);
          oEditModel.setProperty("/textMode", textMode);
        },
        onNavButton: function () {
          var oHistory = History.getInstance();
          var sPreviousHash = oHistory.getPreviousHash();

          if (sPreviousHash !== undefined) {
            window.history.go(-1);
          } else {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("App", {}, true);
          }
        },
        onSavePressed: function () {
          var _id = this.byId("input_id");
          var _name = this.byId("input_name");
          var _description = this.byId("input_description");
          var _price = this.byId("input_price");
          var _stock = this.byId("input_stock");
          var name = _name.getValue();
          var description = _description.getValue();
          var price = _price.getValue();
          var stock = _stock.getValue();
          var id = _id.getValue();
          var newData = {
            id: id,
            name: name,
            description: description,
            price: price,
            stock: stock,
          };
          var aModel = this.getOwnerComponent().getModel().getData();
          for (let i = 0; i < aModel.products.length; i++) {
            var temp = aModel.products[i];
            if (temp.id === id) {
              temp = newData;
              aModel.products[i] = temp;
              break;
            }
          }

          var oHistory = History.getInstance();
          var sPreviousHash = oHistory.getPreviousHash();

          if (sPreviousHash !== undefined) {
            window.history.go(-1);
          } else {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("App", {}, true);
          }
          this._toggleEdit(false, true);
        },
        onCancelPressed: function () { 
          this._toggleEdit(false, true);
        }
      }
    );
  }
);
