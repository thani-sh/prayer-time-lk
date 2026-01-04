# Prayer Times Widget

This directory contains the source code for the Prayer Times iOS Widget.

## Integration Instructions

Since the Xcode project file cannot be automatically updated, you must perform the following steps to enable the widget:

1.  **Open the Project in Xcode:**
    Open `apps/iphone/PrayerTimes.xcodeproj`.

2.  **Add a New Target:**
    -   Go to **File > New > Target...**
    -   Select **Widget Extension**.
    -   Click **Next**.
    -   Product Name: `PrayerTimesWidget`.
    -   Uncheck "Include Configuration Intent" (as this implementation is Static).
    -   Finish. Cancel the "Activate" scheme prompt if you prefer.

3.  **Replace Generated Files:**
    -   Delete the default files created by Xcode in the `PrayerTimesWidget` group (e.g., `PrayerTimesWidget.swift`, `PrayerTimesWidgetBundle.swift`, etc.).
    -   Drag and drop the files from this directory (`apps/iphone/PrayerTimesWidget`) into the `PrayerTimesWidget` group in Xcode.
    -   Ensure "Copy items if needed" is unchecked (since they are already in the folder).
    -   Ensure the `PrayerTimesWidget` target is checked in "Add to targets".

4.  **Add Dependencies:**
    -   The widget code relies on the shared Domain logic. You must add the following files to the `PrayerTimesWidget` target membership:
        -   `apps/iphone/PrayerTimes/Domain/*.swift` (Select all Swift files in Domain).
    -   To do this, select the files in the Project Navigator, open the File Inspector (right pane), and check `PrayerTimesWidget` under **Target Membership**.

5.  **Add Resources:**
    -   The widget needs the JSON data files. Ensure the JSON files (in `Resources` or wherever they are located) are also added to the `PrayerTimesWidget` target membership.

6.  **App Groups (Optional but Recommended):**
    -   To sync settings (Method, City) between the App and the Widget, you must configure **App Groups**.
    -   Add the "App Groups" capability to both the Main App and the Widget Extension targets.
    -   Create an App Group (e.g., `group.me.thanish.prayers`).
    -   Update `PrayerTimeCity.swift` and `PrayerTimeMethod.swift` to use `UserDefaults(suiteName: "group.me.thanish.prayers")` instead of `UserDefaults.standard`.

## Notes

-   The widget currently uses default settings (Shafi, Colombo) unless App Groups are configured and the code is updated to share UserDefaults.
