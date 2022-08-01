sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History"],
  function (BaseController, History) {
    "use strict";

    return BaseController.extend(
      "project1.project1.controller.controller.Details",
      {
        onInit() {
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          oRouter
            .getRoute("details")
            .attachPatternMatched(this._onPatternMatched, this);
        },
        _onPatternMatched: function (oEvent) {
          // var id = oEvent.getParameter("arguments").id;
         
          this.getView().bindElement({
            path:
              "/" +
              window.decodeURIComponent(oEvent.getParameter("arguments").id),
          });

          console.log(this.getView().getModel());
          // let test = this.getView().bindElement({
          //   path:
          //     "/" +
          //     window.decodeURIComponent(oEvent.getParameter("arguments").id),
          // });
          // var sPath = this.getView().getModel().createKey("id", {
          //   id: id,
          // });
          // console.log(sPath);

          // this.sCustomerPath = "/" + sPath;
          // // console.log(this.sCustomerPath);
          // this.getView().bindElement(this.sCustomerPath);
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
      }
    );
  }
);
