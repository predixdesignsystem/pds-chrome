pds-chrome interactive demo
===========================

This folder holds the code used to stand up an interactive demo of the pds-chrome theme.

The demo is made up of two apps:

**mock-apphub**

An AppHub-like node application that serves up the pds-chrome theme and microapps without requiring any authentication or tenant/user setup. This application is for demo purposes only and should never be used in production.

The mock AppHub installs and serves pds-chrome form its bower_components folder, which is not the recommended way to deploy the theme. See the pds-chrome documentation for the recommended way to deploy the theme and expose it to a real production AppHub instance.

**mock-analytics-microapp**

A built version of the px-sample-microapp to demonstrate how the theme looks next to a Cirrus-based app. Do not use this code as a starting point for microapps. See the px-sample-microapp repository for the source.
