export default {
	getConfig: () => {
		let config = localStorage.getItem('config');
		if (config == null) {
			localStorage.setItem('config', '{}');
			config = localStorage.getItem('config');
		}
		return JSON.parse(config);
	},
	saveConfig: (config) => {
		localStorage.setItem('config', JSON.stringify(config));
	}
};