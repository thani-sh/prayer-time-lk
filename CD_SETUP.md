# CD Setup Instructions

This repository is configured with Fastlane and GitHub Actions to automatically build and deploy the Android and iOS apps.

## GitHub Secrets

You need to configure the following secrets in your GitHub repository settings (**Settings** > **Secrets and variables** > **Actions**).

### Android Secrets

| Secret Name | Description |
| :--- | :--- |
| `ANDROID_KEYSTORE_BASE64` | The contents of your release keystore file (`.jks` or `.keystore`) encoded in Base64. |
| `ANDROID_KEYSTORE_PASSWORD` | The password for the keystore. |
| `ANDROID_KEY_ALIAS` | The alias of the key in the keystore. |
| `ANDROID_KEY_PASSWORD` | The password for the key. |
| `ANDROID_JSON_KEY_BASE64` | The Google Play Service Account JSON key encoded in Base64. This is used for uploading to the Play Store. |

**To encode a file to Base64:**
```bash
base64 -i path/to/file > output.txt
# Copy the content of output.txt to the secret
```

### iOS Secrets

| Secret Name | Description |
| :--- | :--- |
| `IOS_CERTIFICATE_BASE64` | The contents of your Apple Distribution Certificate (`.p12`) encoded in Base64. |
| `IOS_CERTIFICATE_PASSWORD` | The password for the `.p12` certificate file. |
| `IOS_PROVISIONING_PROFILE_BASE64` | The contents of your App Store Provisioning Profile (`.mobileprovision`) encoded in Base64. |
| `KEYCHAIN_PASSWORD` | A temporary password for the keychain created during the build (can be any random string). |
| `APPLE_ID` | Your Apple ID email address. |
| `ITC_TEAM_ID` | Your App Store Connect Team ID. |
| `TEAM_ID` | Your Apple Developer Team ID. |
| `FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD` | An app-specific password generated from appleid.apple.com (required if 2FA is enabled). |
| `FASTLANE_SESSION` | (Optional/Advanced) Session cookie for Apple ID if app-specific password isn't enough (usually handled by Fastlane Spaceauth). |

## Workflows

### Android Workflow (`.github/workflows/deploy-android.yml`)

- **Beta:** Triggers on push to `main` branch. Builds and uploads to the **Internal Test Track** on Google Play Console.
- **Deploy:** Triggers when a GitHub Release is **published**. Builds and uploads to the **Production Track** (as draft).

### iOS Workflow (`.github/workflows/deploy-ios.yml`)

- **Beta:** Triggers on push to `main` branch. Builds and uploads to **TestFlight**.
- **Deploy:** Triggers when a GitHub Release is **published**. Builds and uploads to the **App Store**.

## First Time Setup Notes

1.  **Google Play:** You must manually upload the very first APK/AAB to the Google Play Console to initialize the app signing and tracks.
2.  **Apple App Store:** Ensure the App ID exists in the developer portal and an App Store Connect entry exists for the app.
3.  **iOS Build Numbers:** The workflows attempt to increment the build number using the GitHub Run Number. For this to work, you should enable **Apple Generic Versioning** in your Xcode project settings (set "Versioning System" to "Apple Generic" in Build Settings). If not enabled, the build number update might fail, but the build will proceed with the existing number.
