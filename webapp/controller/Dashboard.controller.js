sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend(
      "project1.project1.controller.controller.Dashboard",
      {
        onInit: function () {
          let oEditModel = new JSONModel({
            editmode: false,
          });

          this.getView().setModel(oEditModel, "editModel");
          console.log("aschi");
          this.user = sessionStorage.getItem("role");
          console.log(this.user);
          if (this.user === "none" || this.user === null || this.user === "") {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("Login", {}, true);
          }

          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
         this.getOwnerComponent()
           .getRouter()
           .getRoute("Dashboard")
           .attachPatternMatched(this._onPatternMatched, this);
          
        },
        onLogoutPress: function () {
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("Login");
          localStorage.setItem("role", "none");
          sessionStorage.setItem("role", "none");
      
        },
        _onPatternMatched: function () {
          this.user = sessionStorage.getItem("role");
          if (this.user === "admin") { 
            console.log("admin");
            var oEditModel = this.getView().getModel("editModel");
             oEditModel.setProperty("/editmode", true);
          } else { 
            console.log("other user");
            var oEditModel = this.getView().getModel("editModel");
            oEditModel.setProperty("/editmode", false);
          }
        },
        press: function () { 
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteView1", {}, true);
        }
       
      }
    );
  }
);
