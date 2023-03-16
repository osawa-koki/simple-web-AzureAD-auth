
resource "azuread_application" "azuread_app" {
  display_name     = "${var.project_name}-azuread-app"
  sign_in_audience = "AzureADMultipleOrgs"

  single_page_application {
    redirect_uris = [var.redirect_uri]
  }
}
