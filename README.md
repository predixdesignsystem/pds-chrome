# pds-chrome

pds-chrome is a custom theme for the Predix AppHub service. AppHub is a set of services that allow users to access different front-end microapps and back-end microservices with the same login system and a unified navigation/wrapper UI. The pds-chrome theme provides shared UI components for navigation, user profile management, and notifications that are used to create a consistent user experience across multiple microapps.

Teams already using AppHub can opt-in to use the pds-chrome theme without making many changes to their existing microapps.

# Benefits of pds-chrome

* Uses the latest [Predix Design System Cirrus](https://www.predix-ui.com/) components to create a contemporary and sophisticated visual style that unifies experiences across microapps. Microapps that use the post-Cirrus style components will look and work in the same way as the theme wrapper components.
* Fast to load and become interactive. Interactive in ~500ms for users visiting their first page without a cache (after logging in). Interactive in ~250ms for return users who have cached static resources.
* Seamless switching between microapps. Moving from one microapp to another does not require a page reload. Microapps are transparently loaded in the background and switched out without forcing the user to dump the theme UI and request the whole theme and page again from the server.
* Highly configurable. Teams can configure the behaviors of Predix Design System components used in the theme by passing options to the AppHub instance. Choose from a vertical, horizontal, or mobile navigation, change theme colors, and more.

# Install and develop locally

See the [wiki guide](https://github.com/predixdesignsystem/pds-chrome/wiki/Install-and-develop-locally) to learn how to deploy pds-chrome on your computer, develop with it, build it for production, and more.

# Configure and use with AppHub

See the [wiki guide](https://github.com/predixdesignsystem/pds-chrome/wiki/Configure-AppHub-to-use-this-theme) to learn how to configure pds-chrome to work in AppHub locally or in production, how to choose a build, and how to configure the theme look and feel
