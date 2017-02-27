import {getCookie} from './utils';

class API {

	constructor() {
		$.get('/api/url/?name=users-api&p1=' + userId, (data) => { this.userDataSource = data.url });
	}

	genericFail() { alert('Service error. Please contact our support team.'); }

	reverseUrl(name, callback, p1, p2) {
		var url = '/api/url/?name=' + name;
		if (p1) url += ('&p1='+p1);
		if (p2) url += ('&p2='+p2);

		var cache = this.cache || {};

		if (cache[url]) callback(cache[url]);

		$.get(url, (data) => { cache[url] = data.url; callback(data.url); });
	}

	get(url, success, fail) {
		$.get(url, success).fail(fail || this.genericFail);
	}

	getCurrentUser(success, fail) {
		var api = this;
		
		this.reverseUrl('designer-token-auth', (authTokenSource) => {
			$.ajax({
				url: authTokenSource, 
				data: {},
				headers: {'X-CSRFToken': getCookie('csrftoken')},
				method: 'POST'
			}).done(success).fail(fail || api.genericFail);
		});
	}

	getCurrentUserData(userId, success, fail) {
		var api = this;

		this.reverseUrl('users-api', (url) => {
			$.get(url, success).fail(fail || api.genericFail);
		}, userId);
	}

	getCurrentUserExtended(roleId, success, fail) {
		var api = this;

		this.reverseUrl('users-api', (url) => {
			$.get(url, success).fail(fail || api.genericFail);
		}, userId);
	}

	getEmptyDesignerProjects() {
		return [];
	}

	getAllDesignerProjects(userId, success, fail) {
		this.reverseUrl('designer-projects-api', (url) => {
			$.get(url).done(success).fail(fail || api.genericFail);
		}, userId);
	}

}

var api = new API();

export default api