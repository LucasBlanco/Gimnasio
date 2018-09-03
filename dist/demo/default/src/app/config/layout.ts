import { ConfigModel } from '../core/interfaces/config';

export class LayoutConfig implements ConfigModel {
	public config: any = {
		"demo": "default",
		"self": {
			"layout": "fluid",
			"background": "./assets/app/media/img/bg/bg-4.jpg"
		},
		"loader": {
			"enabled": true,
			"type": "default"
		},
		"header": {
			"self": {
				"fixed": {
					"desktop": false,
					"mobile": false,
					"minimize": {
						"desktop": {
							"enabled": false,
							"offset": 200
						},
						"mobile": {
							"enabled": false,
							"offset": 200
						}
					}
				},
				"logo": {
					"dark": "./assets/demo/default/media/img/logo/logo_default_dark.png",
					"light": "./assets/demo/default/media/img/logo/logo_default_light.png"
				}
			},
			"search": {
				"type": "search-dropdown",
				"dropdown": {
					"skin": "light"
				}
			}
		},
		"aside": {
			"left": {
				"display": true,
				"fixed": false,
				"skin": "dark",
				"push_footer": false,
				"minimize": {
					"toggle": true,
					"default": false
				}
			},
			"right": {
				"display": false
			}
		},
		"menu": {
			"header": {
				"display": false,
				"desktop": {
					"skin": "light",
					"arrow": true,
					"toggle": "click",
					"submenu": {
						"skin": "light",
						"arrow": false
					}
				},
				"mobile": {
					"skin": "dark"
				}
			},
			"aside": {
				"display": true,
				"desktop_and_mobile": {
					"submenu": {
						"skin": "inherit",
						"accordion": true,
						"dropdown": {
							"arrow": true,
							"hover_timeout": 500
						}
					},
					"minimize": {
						"submenu_type": "default"
					}
				}
			}
		},
		"content": {
			"skin": "light2"
		},
		"footer": {
			"fixed": false
		},
		"quicksidebar": {
			"display": true
		},
		"portlet": {
			"sticky": {
				"offset": 50
			}
		}
	};

	constructor(config?: any) {
		if (config) {
			this.config = config;
		}
	}
}
