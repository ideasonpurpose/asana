/**
 * Configuration variables
 * 
 * Config.PRODURL
 * Config.BASEURL
 * Config.ISPROD
 */

const isProduction = process.env.ELEVENTY_ENV === 'production';

// Settings paths *must not* end in /

module.exports = {
  ISPROD: isProduction,

  // Extranet credentials
  // user: 'EXTRANET_USER',
  // pass: 'EXTRANET_PASSWORD', 

  // Internal Stage Settings
  BASEURL: isProduction ? "/asana/dist" : "",
  PRODURL: isProduction ? "https://ideasonpurpose.github.io" : "",

  // Client Review Settings
  // BASEURL: isProduction ? "/PROJECT_NAME/clientreview" : "",
  // PRODURL: isProduction ? "https://client.ideasonpurpose.com" : "",

  // Production Settings
  // BASEURL: isProduction ? "/" : "",
  // PRODURL: isProduction ? "https://clientdomain.com" : "",
};
