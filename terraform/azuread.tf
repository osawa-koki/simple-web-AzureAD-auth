
resource "azuread_application" "azuread_app" {
  display_name     = "${var.project_name}-azuread-app"
  sign_in_audience = "AzureADandPersonalMicrosoftAccount"

  api {
    requested_access_token_version = 2
  }

  single_page_application {
    redirect_uris = [
      var.redirect_uri,
      "http://localhost:3000",
    ]
  }
}
