sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, MessageBox, Fragment) {
    "use strict";

    return Controller.extend("project1.project1.controller.View1", {
      onInit: function () {
        let oEditModel = new JSONModel({
          editmode: false,
        });
        var oSupplier = this.getView().getModel("suppliers");
        console.log(oSupplier);
        this.getView().setModel(oEditModel, "editModel");
        this.oData = new JSONModel({
          id: "",
          name: "",
          description: "",
          price: "",
          stock: "",
        });
        this.getView().setModel(this.oData, "editDataModel");
      },
      

      _toggleEdit: function (editStn, saveStn) {
        let oEditModel = this.getView().getModel("editModel");

        oEditModel.setProperty("/editBtn", editStn);
        oEditModel.setProperty("/saveBtn", saveStn);
      },

      onCreate: function (data) {
        console.log(data);
        var oList = this.byId("main_table");
        var oBinding = oList.getBinding("items");
        console.log(oBinding);
        var oContext;
        var _data = {
          id: data.id,
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          supplier: data.supplier,
        };
        var oModel = this.getOwnerComponent().getModel().getData();
        console.log(oModel);
        if (data) {
          oModel.products.push(_data);
          this.getOwnerComponent().getModel().setData(oModel);
          console.log(oModel);
          this.pDialog.then(function (oDialog) {
            oDialog.close();
          });
        } else {
          console.log("No data");
        }
      },

      onSavePressed: function () {
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
        var buf = new Uint8Array(6);
        window.crypto.getRandomValues(buf);
        var id = btoa(String.fromCharCode.apply(null, buf));

        this.onCreate({ id, name, description, price, stock, supplier });
        id = "";
        _name.setValue("");
        _description.setValue("");
        _price.setValue("");
        _stock.setValue("");
        _supplier.setValue("");
      },
      onDeleteButtonPressed: function (oEvent) {
        let oModel = this.getView().getModel();
        let oResourceBundle = this.getView()
          .getModel("i18n")
          .getResourceBundle();
        let oSource = oEvent.getSource();
        var test = oSource.getBindingContext().getObject();
        console.log(test.id);
        // var row = oEvent.getSource().getParent().getId();
        // var parent = oEvent.getSource().getParent().getParent();

        MessageBox.warning(oResourceBundle.getText("sureToDeleteQuestion"), {
          title: oResourceBundle.getText("sureToDeleteTitle"),
          actions: [MessageBox.Action.YES, MessageBox.Action.NO],
          emphasizedAction: MessageBox.Action.YES,
          onClose: (oAction) => {
            if (MessageBox.Action.YES === oAction) {
              this.oRowData = oSource.getBindingContext().getObject();
              console.log(this.oRowData);
              var aModel = this.getOwnerComponent().getModel().getData();
              let index = 1;
              console.log(aModel);
              for (let i = 0; i < aModel.products.length; i++) {
                var temp = aModel.products[i];
                if (temp.id === this.oRowData.id) {
                  index = i;
                  console.log(i, temp.id);
                  temp = "";
                  break;
                }
              }
              console.log(index);
              aModel.products.splice(index, 1);
              console.log(aModel);
              this.getOwnerComponent().getModel().refresh();
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

      onOpenDialog: function () {
        var _name = this.byId("input_name");
        var _description = this.byId("input_description");
        var _price = this.byId("input_price");
        var _stock = this.byId("input_stock");
        if (!this.pDialog) {
          this.pDialog = this.loadFragment({
            name: "project1.project1.view.fragment.create",
          });
        }

        // this.pDialog.getModel.setData(this.product);
        this.pDialog.then(function (oDialog) {
          oDialog.open();
        });
      },
      onCancelPressed: function () {
        this.pDialog.then(
          function (oDialog) {
            oDialog.close();
            this.getView().getModel("editDataModel").setData(this.oData);
          }.bind(this)
        );
      },
      navToDashboard: function () { 
         var oRouter = this.getOwnerComponent().getRouter();
         oRouter.navTo("Dashboard", {}, true);
      }
    });
  }
);
