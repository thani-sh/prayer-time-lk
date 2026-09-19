/**
 * US English strings for the website.
 *
 * Keys mirror the semantic keys used by the iOS and Android apps
 * (route_*, prayers_type_*, time_format_*, hijri_calendar_offset_*).
 */
export const en = {
	// Navigation
	route_home_name: 'Timetable',
	route_compass_name: 'Compass',
	route_settings_preferences: 'Preferences',

	// Home
	route_home_title: 'Prayer Times',
	prayers_type_fajr: 'Fajr',
	prayers_type_shuruk: 'Sunrise',
	prayers_type_dhohr: 'Dhuhr',
	prayers_type_asr: 'Asr',
	prayers_type_maghrib: 'Maghrib',
	prayers_type_isha: 'Isha',
	prayers_time_until_hm: 'in {hours}h, {minutes}mins',
	prayers_time_until_m: 'in {minutes}mins',
	route_home_error: 'Error: {message}',

	// Compass
	route_compass_north_abbreviation: 'N',
	route_compass_permission_message: "The compass needs access to your phone's sensors",
	route_compass_permission_hint: 'Tap the button, then rotate your phone to face the Qibla.',
	route_compass_enable: 'Enable compass',
	route_compass_no_compass:
		'No compass found on this device — open this page on a phone for live direction.',
	route_compass_qibla: 'Qibla {degrees}°',
	route_compass_rotate_hint: 'Rotate until the arrow points straight up',
	route_compass_location_approximate:
		'Approximate direction from {city}. Enable location services for better accuracy.',

	// Settings — prayer times
	route_settings_section_methodology: 'Prayer Times',
	route_settings_section_methodology_details: 'Data sourced from the official ACJU website.',
	route_settings_city: 'City',
	route_settings_method: 'Method',
	route_settings_time_format_label: 'Time Format',
	time_format_12h: '12-hour',
	time_format_24h: '24-hour',

	// Settings — corrections
	route_settings_section_adjustments: 'Corrections',
	route_settings_section_adjustments_details:
		'Use these settings to correct values shown on the app when necessary (eg: Hijri calendar)',
	route_settings_hijri_calendar_offset_days: 'Hijri calendar offset',
	hijri_calendar_offset_label: 'Hijri calendar offset',
	route_settings_hijri_calendar_offset_disabled: 'Disabled',
	hijri_calendar_offset_template: '{days} days',

	// Settings — about this website
	route_settings_about_title: 'About this website',
	route_settings_about_details:
		'The app is open-source and free to use under the MIT license, inviting everyone to contribute or share feedback to help improve it. You can explore the source code or contribute via its GitHub repository.',
	route_settings_open_github: 'Open the Github repository',
	route_settings_report_feedback: 'Report errors and feedback',
	route_settings_privacy_notice:
		'Your privacy is important to us! By using this app, you agree to our Privacy Policy — please read it.',
	route_settings_read_privacy: 'Open the privacy policy',

	// Settings — download the app
	route_settings_download_title: 'Download the app',
	route_settings_download_details:
		'Install the app on your phone for quick access to prayer times and notifications.',
	route_settings_download_app_store: 'Download on the App Store',
	route_settings_download_google_play: 'Download on Google Play',
	route_settings_rate_app: 'Remember to rate the app after trying it!'
} as const;
