import { writable } from 'svelte/store';

function createTitle() {
	const {subscribe, set, update} = writable('');
	
	return {
		subscribe,
		set: (value: any) => {
			set(`${value} • NixoCraft`)
		},
		clear: () => {
			set('NixoCraft • Startseite');
		}
	}
}

export const title = createTitle();