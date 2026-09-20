<script lang="ts">
	import { CITIES, METHODS, type City, type Method } from '@thani-sh/prayer-time-lk';
	import capitalize from 'lodash/capitalize';
	import { CodeIcon, MailIcon, CookieIcon } from 'lucide-svelte';
	import {
		hijriCalendarOffset,
		HIJRI_CALENDAR_OFFSET_RANGE
	} from '$lib/domain/HijriCalendarOffset';
	import { city } from '$lib/domain/PrayerTimeCity';
	import { method } from '$lib/domain/PrayerTimeMethod';
	import { timeFormat, TIME_FORMATS, type TimeFormat } from '$lib/domain/TimeFormat';
	import { t } from '$lib/i18n';
	import iphoneBadge from './iphone-badge.png';
	import androidBadge from './android-badge.png';

	function formatCity(value: string) {
		if (value === 'nuwaraeliya') {
			return 'Nuwara Eliya';
		}
		return capitalize(value);
	}

	function formatMethod(value: string) {
		if (value === 'acju') {
			return 'ACJU';
		}
		return capitalize(value);
	}

	function formatTimeFormat(value: string) {
		if (value === '12h') {
			return t('time_format_12h');
		}
		return t('time_format_24h');
	}

	function getHijriCalendarOffsetLabel(offset: number) {
		if (offset === 0) {
			return t('route_settings_hijri_calendar_offset_disabled');
		}
		return t('hijri_calendar_offset_template', { days: offset });
	}
</script>

{#snippet Dropdown(
	label: string,
	options: readonly string[],
	selected: string,
	onSelect: (value: string) => void,
	format: (value: string) => string = capitalize
)}
	<fieldset class="fieldset my-2">
		<legend class="fieldset-legend">{label}</legend>
		<select
			class="select select-lg w-full"
			on:change={(e) => onSelect((e.target as HTMLSelectElement).value)}
		>
			{#each options as option (option)}
				<option value={option} selected={selected === option}>{format(option)}</option>
			{/each}
		</select>
	</fieldset>
{/snippet}

<div class="flex flex-col w-full max-w-md mx-auto px-4 py-4 mb-32">
	<section>
		<h1 class="text-3xl font-light mb-2">{t('route_settings_preferences')}</h1>
		<div class="card bg-black/10 shadow-sm p-4">
			<h2 class="text-lg font-medium">{t('route_settings_section_methodology')}</h2>
			<p class="text-sm mt-1">{t('route_settings_section_methodology_details')}</p>
			{@render Dropdown(
				t('route_settings_city'),
				CITIES,
				$city,
				(value) => city.set(value as City),
				formatCity
			)}
			{@render Dropdown(
				t('route_settings_method'),
				METHODS,
				$method,
				(value) => method.set(value as Method),
				formatMethod
			)}
			{@render Dropdown(
				t('route_settings_time_format_label'),
				TIME_FORMATS,
				$timeFormat,
				(value) => timeFormat.set(value as TimeFormat),
				formatTimeFormat
			)}

			<h2 class="text-lg font-medium mt-6">{t('route_settings_section_adjustments')}</h2>
			<p class="text-sm mt-1">{t('route_settings_section_adjustments_details')}</p>
			<fieldset class="fieldset my-2">
				<legend class="fieldset-legend">
					{t('route_settings_hijri_calendar_offset_days')}
				</legend>
				<input
					type="range"
					class="range range-primary"
					min={-HIJRI_CALENDAR_OFFSET_RANGE}
					max={HIJRI_CALENDAR_OFFSET_RANGE}
					step="1"
					value={$hijriCalendarOffset}
					on:input={(e) => hijriCalendarOffset.set(Number((e.target as HTMLInputElement).value))}
					aria-label={t('hijri_calendar_offset_label')}
				/>
				<p class="text-sm opacity-60">{getHijriCalendarOffsetLabel($hijriCalendarOffset)}</p>
			</fieldset>
		</div>
	</section>

	<section class="mt-8">
		<h1 class="text-3xl font-light mb-2">{t('route_settings_about_title')}</h1>
		<div class="card bg-black/10 shadow-sm p-4">
			<p class="text-sm">{t('route_settings_about_details')}</p>

			<a href="https://github.com/thani-sh/prayer-time-lk" class="btn btn-ghost justify-start mt-2">
				<CodeIcon class="w-4 h-4 mr-2" />
				{t('route_settings_open_github')}
			</a>

			<a href="mailto:contact@prayertime.lk" class="btn btn-ghost justify-start mt-2">
				<MailIcon class="w-4 h-4 mr-2" />
				{t('route_settings_report_feedback')}
			</a>

			<p class="text-sm mt-4">{t('route_settings_privacy_notice')}</p>

			<a href="/docs/privacy" class="btn btn-ghost justify-start mt-2">
				<CookieIcon class="w-4 h-4 mr-2" />
				{t('route_settings_read_privacy')}
			</a>
		</div>
	</section>

	<section class="mt-8">
		<h1 class="text-3xl font-light mb-2">{t('route_settings_download_title')}</h1>
		<div class="card bg-black/10 shadow-sm p-4">
			<p class="text-sm">{t('route_settings_download_details')}</p>

			<div class="flex flex-col sm:flex-row items-center justify-center mt-4 gap-4 grayscale">
				<a href="https://apps.apple.com/lk/app/sri-lankan-prayer-times/id6741732392">
					<img src={iphoneBadge} alt={t('route_settings_download_app_store')} />
				</a>
				<a href="https://play.google.com/store/apps/details?id=me.thanish.prayers">
					<img src={androidBadge} alt={t('route_settings_download_google_play')} />
				</a>
			</div>

			<p class="text-sm mt-4">{t('route_settings_rate_app')}</p>
		</div>
	</section>
</div>
