

# resource "azuread_application" "azuread_app" {
#   display_name     = "${var.project_name}-azuread-app"
#   identifier_uris  = ["http://localhost:3000"]
#   sign_in_audience = "AzureADMultipleOrgs"

#   web {
#     homepage_url  = "${var.base_url}"
#     logout_url    = "${var.base_url}/logout"
#     redirect_uris = ["${var.base_url}/account"]

#     implicit_grant {
#       access_token_issuance_enabled = true
#       id_token_issuance_enabled     = true
#     }
#   }
# }
