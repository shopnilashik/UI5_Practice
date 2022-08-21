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
          oRouter
            .getRoute("Login")
            .attachPatternMatched(this._onPatternMatched, this);
          this.getOwnerComponent()
            .getRouter()
            .getRouter("Login")
            .attachPatternMatched(function () {
              console.log("Im called");
            }, this);
          // var test1 = this.getView().getModel("oVisibleModel");
          // console.log(test1);
        },
        onLogoutPress: function () {
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("Login");
          localStorage.setItem("role", "none");
          sessionStorage.setItem("role", "none");
          // location.reload();
        },
        _onPatternMatched: function () {
          console.log("pattter mached");
        },
        myFormatter: function (sName) {
          return false;
        },
      }
    );
  }
);
