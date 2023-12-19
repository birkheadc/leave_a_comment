# Leave A Comment Frontend
Front end for managing comments application that lets anonymous users send the admin comments and tracks what site the comment originated from as well as the time created.

## Environment Variables
The following environment variables need to be configured
- AUTHENTICATION_URL: The url to post credentials to in order to receive a jwt for admin operations
- COMMENTS_URL: The url endpoint that comments are posted to / retrieved from
- THIS_SITE: The name of this site, as it should be written to the `site` property of any comments this frontend creates itself.