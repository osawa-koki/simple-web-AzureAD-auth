
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.0.0"
    }
    azuread = {
      source  = "hashicorp/azuread"
      version = "2.36.0"
    }
  }
  backend "azurerm" {
    resource_group_name  = "general"
    key                  = "terraform.tfstate"
  }
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
  client_id       = var.client_id
  client_secret   = var.client_secret
  tenant_id       = var.tenant_id
}

provider "azuread" {
  version     = "2.7.0"
  client_id   = var.client_id
  client_secret = var.client_secret
  tenant_id   = var.tenant_id
}

resource "azurerm_resource_group" "resource_group" {
  name     = var.project_name
  location = "japaneast"
}
