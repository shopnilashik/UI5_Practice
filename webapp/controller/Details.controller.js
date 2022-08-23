sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/library",
  ],
  function (BaseController, History, JSONModel, coreLibrary) {
    "use strict";

    return BaseController.extend(
      "project1.project1.controller.controller.Details",
      {
        onInit() {
          let oEditModel = new JSONModel({
            editmode: false,
            textMode: true,
          });
          let oCurrency = new JSONModel({
            currency: "$",
          });
          this.getView().setModel(oEditModel, "editModel");
          this.getView().setModel(oCurrency, "oCurrency");
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
            this._toggleEdit(false, true);
          }
        },
        onSavePressed: function () {
          var _id = this.byId("input_id");
          var _name = this.byId("input_name");
          var _description = this.byId("input_description");
          var _price = this.byId("input_price");
          var _stock = this.byId("input_stock");
          var _supplier = this.byId("input_supplier");
          var name = _name.getValue();
          var description = _description.getValue();
          var price = _price.getValue();
          var stock = _stock.getValue();
          var supplier = _supplier.getValue();
          var id = _id.getValue();
          if (
            name.length > 0 &&
            description.length > 0 &&
            price.length > 0 &&
            price.length > 0 &&
            stock.length &&
            supplier.length > 0
          ) { 
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
          }
            
        },
        onCancelPressed: function () {
          this._toggleEdit(false, true);
        },

        onNameChange: function (oEvent) {
          var _name = this.byId("input_name");
          if (_name.getValue().length < 4) {
            _name
              .setValueState(sap.ui.core.ValueState.Error)
              .setValueStateText("Name has to be at least 4 characters");
          }
          if (_name.getValue().length > 12) {
            _name
              .setValueState(sap.ui.core.ValueState.Error)
              .setValueStateText("Name not more than 12 characters");
          }
          if (_name.getValue().length > 4 && _name.getValue().length < 12) {
            _name.setValueState(sap.ui.core.ValueState.Success);
            this.name = true;
          }
        },
        handleLiveChange: function (oEvent) {
          this.description = true;

          var ValueState = coreLibrary.ValueState;
          var oTextArea = oEvent.getSource(),
            iValueLength = oTextArea.getValue().length,
            iMaxLength = oTextArea.getMaxLength(),
            sState =
              iValueLength > iMaxLength ? ValueState.Warning : ValueState.None;

          oTextArea.setValueState(sState);
        },
        validateprice: function () {
          var _price = this.byId("input_price");
          if (_price.getValue() > 0) {
            this.price = true;
          }
        },
        validateStock: function () {
          var _stock = this.byId("input_stock");
          if (_stock.getValue()) {
            this.stock = true;
          }
        },
      }
    );
  }
);
