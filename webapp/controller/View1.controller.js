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
                    editBtn: true,
                    saveBtn: false 
                });
            
        this.getView().setModel(oEditModel, "editModel");
        this.oData = new JSONModel(
          {
            "id": "",
            "name": "",
            "description": "",
            "price": "",
            "stock": ""
          });
          this.getView().setModel(this.oData, "editDataModel");
      },
      // onEditPressed: function(){
      //       this._toggleEdit(true);
      //   },
        
        _toggleEdit: function(editStn,saveStn){
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
            "id":data.id,
            "name":data.name,
            "description":data.description,
            "price":data.price,
            "stock":data.stock
          }
          var oModel =  this.getOwnerComponent().getModel().getData();
          console.log(oModel);
        if(data){
          oModel.products.push(_data);
          this.getOwnerComponent().getModel().setData(oModel);
          this.pDialog.then(
          function (oDialog) {
            oDialog.close();
          }
        );
        }else{
          console.log("No data");
        }
      },
      onSavePressed:function(){
        var pname = this.byId("input_name");
        var description = this.byId("input_description");
        var price = this.byId("input_price");
        var stock = this.byId("input_stock");
        var name = pname.getValue();
        description = description.getValue();
        price = price.getValue();
        stock = stock.getValue();
        var buf = new Uint8Array(6);
        window.crypto.getRandomValues(buf);
        var id = btoa(String.fromCharCode.apply(null, buf));

        this.onCreate({id,name,description,price,stock});
        
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

      onOpenDialog: function () {
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
          }.bind(this)
        );
      },
      onEditButtonPressed:function(oEvent){
        //   let sPath = oEvent.getSource().getBindingContext().getPath();
        // var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        // var oItem = oEvent.getSource();
        // // console.log(oItem.getBindingContext().getObject().id);
        // oRouter.navTo("details", {
        //   id: window.encodeURIComponent(
        //     oItem.getBindingContext().getPath().substr(1)
        //   ),
        // });
  
        // var pname = this.byId("input_name").setText(val);
        // var description = this.byId("input_description");
        // var price = this.byId("input_price");
        // var stock = this.byId("input_stock");
        // var name = pname.getValue();
        // description = description.getValue();
        // price = price.getValue();
        // stock = stock.getValue();
        let oRowData = oEvent.getSource().getBindingContext().getObject();
        console.log(oRowData);
        
        // this._toggleEdit(false,true);
       if (!this.pDialog) {
          this.pDialog = this.loadFragment({
            name: "project1.project1.view.fragment.change",
          });
          
        }
        // var test = this.pDialog.getModel("editDataModel").setData(oRowData);
      let oModel = this.getView().getModel("editDataModel").setData(oRowData);
      console.log(oModel);
        // this.pDialog.getModel.setData(this.product);
        this.pDialog.then(function (oDialog) {
            
          // this.getView().addDependent(oDialog);
          // oDialog.getModel("editDataModel").setModel(this.oData);

        
    
  
          oDialog.open();
        });
      },
      _onEditSavePressed:function(){
        this._toggleEdit(true,false);
      }
        
    });
  }
);
