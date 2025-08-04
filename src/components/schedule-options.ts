import { Store } from '../store';
import { h } from 'snabbdom';
import { ActionType } from '../store/action-types';
import { BackgroundActionType } from '../background/store/action-types';

/**
 * Convert hour (0-23) to display format (e.g., "5:00 AM", "18:00" / "6:00 PM")
 * 
 * Args:
 *     hour: Hour in 24-hour format (0-23)
 * 
 * Returns:
 *     string: Formatted time string
 */
const formatHour = (hour: number): string => {
	if (hour === 0) return '12:00 AM';
	if (hour < 12) return `${hour}:00 AM`;
	if (hour === 12) return '12:00 PM';
	return `${hour - 12}:00 PM`;
};

/**
 * Generate hour options for select dropdown
 * 
 * Returns:
 *     Array of option elements for hours 0-23
 */
const hourOptions = () => {
	return Array.from({ length: 24 }, (_, i) => 
		h('option', { props: { value: i } }, formatHour(i))
	);
};

const CheckboxField = (
	store: Store,
	isChecked: boolean,
	text: string,
	action: any,
	isDisabled = false
) => {
	return h('label.flex.align-items-center.h-stack', [
		h('input', {
			props: {
				type: 'checkbox',
				checked: isChecked,
				disabled: isDisabled,
			},
			on: {
				change: () => store.dispatch(action),
			},
		}),
		h('span', ' ' + text),
	]);
};

export const ScheduleOptions = (store: Store) => {
	const state = store.getState();
	if (state.settings == null) return null;

	const { timeBasedBlocking } = state.settings;

	const toggleEnabled = CheckboxField(
		store,
		timeBasedBlocking.enabled,
		'Enable time-based blocking',
		{
			type: ActionType.BACKGROUND_ACTION,
			action: {
				type: BackgroundActionType.TIME_BASED_BLOCKING_TOGGLE,
			},
		}
	);

	const onStartHourChange = (event: Event) => {
		const target = event.target as HTMLSelectElement;
		const startHour = parseInt(target.value, 10);
		store.dispatch({
			type: ActionType.BACKGROUND_ACTION,
			action: {
				type: BackgroundActionType.TIME_BASED_BLOCKING_UPDATE_HOURS,
				startHour,
				endHour: timeBasedBlocking.endHour,
			},
		});
	};

	const onEndHourChange = (event: Event) => {
		const target = event.target as HTMLSelectElement;
		const endHour = parseInt(target.value, 10);
		store.dispatch({
			type: ActionType.BACKGROUND_ACTION,
			action: {
				type: BackgroundActionType.TIME_BASED_BLOCKING_UPDATE_HOURS,
				startHour: timeBasedBlocking.startHour,
				endHour,
			},
		});
	};

	const scheduleDisplay = timeBasedBlocking.enabled 
		? h('div.pad-2.bg-active-light', [
			h('div.v-stack', [
				h('div.flex.align-items-center.h-stack', [
					h('label', 'Block from:'),
					h('select', {
						props: { value: timeBasedBlocking.startHour },
						on: { change: onStartHourChange }
					}, hourOptions()),
				]),
				h('div.flex.align-items-center.h-stack', [
					h('label', 'Block until:'),
					h('select', {
						props: { value: timeBasedBlocking.endHour },
						on: { change: onEndHourChange }
					}, hourOptions()),
				]),
				h('div.text-smaller-1.text-muted', [
					`Currently blocking from ${formatHour(timeBasedBlocking.startHour)} to ${formatHour(timeBasedBlocking.endHour)}`
				])
			])
		])
		: null;

	return h('div.v-stack-2', [
		h('h2', 'Schedule'),
		h('div.v-stack', [
			h(
				'p',
				'Configure specific hours when News Feed Eradicator should be active. Outside these hours, news feeds will be shown normally.'
			),
			h('div', toggleEnabled),
			scheduleDisplay,
		]),
	]);
};