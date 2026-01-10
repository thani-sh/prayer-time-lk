<script lang="ts">
	import { CITIES, METHODS, type City, type Method } from '@thani-sh/prayer-time-lk';
	import capitalize from 'lodash/capitalize';
	import { CodeIcon, MailIcon, CookieIcon } from 'lucide-svelte';
	import { city } from '$lib/domain/PrayerTimeCity';
	import { method } from '../../lib/domain/PrayerTimeMethod';
	import { timeFormat, TIME_FORMATS, type TimeFormat } from '$lib/domain/TimeFormat';
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
</script>

{#snippet Dropdown(
	label: string,
	options: readonly string[],
	selected: string,
	onSelect: (value: string) => void,
	format: (value: string) => string = capitalize,
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
		<h1 class="text-3xl font-light mb-2">Preferences</h1>
		<div class="card bg-black/10 shadow-sm p-4">
			<p class="text-sm">
				The prayer times displayed in the app are calculated using these settings.
			</p>
			{@render Dropdown('City', CITIES, $city, (value) => city.set(value as City), formatCity)}
			{@render Dropdown('Method', METHODS, $method, (value) => method.set(value as Method), formatMethod)}
			{@render Dropdown('Time Format', TIME_FORMATS, $timeFormat, (value) =>
				timeFormat.set(value as TimeFormat)
			)}
			<p class="text-sm mt-2">
				This app provides accurate Islamic prayer times sourced from local mosques.
			</p>
		</div>
	</section>

	<section class="mt-8">
		<h1 class="text-3xl font-light mb-2">About this website</h1>
		<div class="card bg-black/10 shadow-sm p-4">
			<p class="text-sm">
				The app is open-source and free to use under the MIT license, inviting everyone to
				contribute or share feedback to help improve it. You can explore the source code or
				contribute via its GitHub repository.
			</p>

			<a href="https://github.com/thani-sh/prayer-time-lk" class="btn btn-ghost justify-start mt-2">
				<CodeIcon class="w-4 h-4 mr-2" />
				Open the Github repository
			</a>

			<a href="mailto:contact@prayertime.lk" class="btn btn-ghost justify-start mt-2">
				<MailIcon class="w-4 h-4 mr-2" />
				Report errors and feedback
			</a>

			<p class="text-sm mt-4">
				Your privacy is important to us! By using this app, you agree to our Privacy Policy — please
				read it.
			</p>

			<a href="/docs/privacy" class="btn btn-ghost justify-start mt-2">
				<CookieIcon class="w-4 h-4 mr-2" />
				Open the privacy policy
			</a>
		</div>
	</section>

	<section class="mt-8">
		<h1 class="text-3xl font-light mb-2">Download the app</h1>
		<div class="card bg-black/10 shadow-sm p-4">
			<p class="text-sm">
				Install the app on your phone for quick access to prayer times and notifications.
			</p>

			<div class="flex flex-col sm:flex-row items-center justify-center mt-4 gap-4 grayscale">
				<a href="https://apps.apple.com/lk/app/sri-lankan-prayer-times/id6741732392">
					<img src={iphoneBadge} alt="Download on the App Store" />
				</a>
				<a href="https://play.google.com/store/apps/details?id=me.thanish.prayers">
					<img src={androidBadge} alt="Download on Google Play" />
				</a>
			</div>

			<p class="text-sm mt-4">Remember to rate the app after trying it!</p>
		</div>
	</section>
</div>
