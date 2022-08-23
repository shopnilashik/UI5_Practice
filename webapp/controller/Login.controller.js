sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, MessageBox, Fragment, MessageToast) {
    "use strict";

    return Controller.extend("project1.project1.controller.View1", {
      onInit: function () {
        var oUsers = new JSONModel({
          users: [
            {
              role: "admin",
              username: "admin",
              password: "123",
            },
            {
              role: "user1",
              username: "user1",
              password: "123",
            },
          ],
        });
        let oVisibleModel = new JSONModel({
          mode: false,
        });
        this.getView().setModel(oVisibleModel, "oVisibleModel");
        this.getView().setModel(oUsers, "oUsersModel");
        var test = this.getView().getModel("oUsersModel");

        this.oData = test.getData();
        this.user = localStorage.getItem("username");
        this.user = sessionStorage.getItem("username");
        if (this.user === "none" || this.user === null) {
          console.log("No user");
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("Routemain", {}, true);
        } else {
          console.log("User Found");
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("Dashboard", {}, true);
        }
      },
      onLoginTap: function () {
        var arr = [];
        arr.push(...this.oData.users);
        var username = this.byId("username");
        var password = this.byId("password");
        var _username = username.getValue().trim();
        var _password = password.getValue().trim();
        var user = arr.find((x) => x.username === _username);
        if (user === undefined) {
          MessageToast.show("User name or password is incorrect");
        } else {
          if (user.username === _username && user.password === _password) {
            console.log("Found", user.username);

            sessionStorage.setItem("role", user.role);
            localStorage.setItem("role", user.role);
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("Dashboard");
          } else {
            MessageToast.show("User name or password is incorrect");
          }
        }
      },
    });
  }
);
