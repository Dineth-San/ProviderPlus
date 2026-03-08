const { withProjectBuildGradle } = require("@expo/config-plugins");

module.exports = function withMavenFix(config) {
    return withProjectBuildGradle(config, (config) => {
        if (config.modResults.language === "groovy") {
            config.modResults.contents += `
allprojects {
  buildscript {
    repositories {
      google()
      mavenCentral()
      maven { url "https://repo1.maven.org/maven2" }
    }
  }
  repositories {
    google()
    mavenCentral()
    maven { url "https://repo1.maven.org/maven2" }
    maven {
      url "https://www.jitpack.io"
      content {
        // Only allow JitPack for packages that ACTUALLY need it
        // Add more here if you get "could not resolve" errors for non-Maven-Central packages
        // e.g. includeGroup "com.github.some-library"
        // By default we exclude stripe from JitPack
        excludeGroup "com.stripe"
      }
    }
  }
  configurations.all {
    resolutionStrategy {
      // Pin all Stripe artifacts to avoid wildcard JitPack lookups
      force "com.stripe:stripe-android:21.22.0"
      force "com.stripe:financial-connections:21.22.0"
      force "com.stripe:payments-core:21.22.0"
      force "com.stripe:payments-ui-core:21.22.0"
      force "com.stripe:paymentsheet:21.22.0"
      force "com.stripe:stripe-core:21.22.0"
      force "com.stripe:stripecardscan:21.22.0"
      force "com.stripe:payments-model:21.22.0"
      force "com.stripe:link:21.22.0"
      force "com.stripe:camera-core:21.22.0"
    }
  }
}
`;
        }
        return config;
    });
};
