import {getCookie} from './utils';

class API {

	constructor() {
		this._cache_reverseUrl = {};
		this._cache = {};
		this._promise_reverseUrls = {};
		// $.get('/api/url/?name=users-api&p1=' + userId, (data) => { this.userDataSource = data.url });
	}

	genericFail() { alert('Service error. Please contact our support team.'); }

	reverseUrl(name, callback, p1, p2) {
		if (this._promise_reverseUrls[name]) return;

		var url = '/api/url/?name=' + name;
		if (p1) url += ('&p1='+p1);
		if (p2) url += ('&p2='+p2);

		var cache = this._cache_reverseUrl;
		// console.info('cache', cache);


		if (cache[url]) {
			callback(cache[url]);
		} else {
			this._promise_reverseUrls[name] = $.get(url, (data) => {
				cache[url] = data.url;
				this._promise_reverseUrls[name] = null;
				callback(data.url);
			});
		}
	}

	get(url, success, fail) {
		$.get(url, success).fail(fail || this.genericFail);
	}

	getCurrentUser(success, data, fail) {
		if (this.promise_getCurrentUser) return;

		var api = this;

		var cache = this._cache;
		
		this.reverseUrl('designer-token-auth', (authTokenSource) => {

			if (!data && cache[authTokenSource]) {
				success(cache[authTokenSource]);
			} else {

				this.promise_getCurrentUser = $.ajax({
					url: authTokenSource, 
					data: data || {},
					headers: {'X-CSRFToken': getCookie('csrftoken')},
					method: 'POST'
				}).done((data) => {
					if (!data) cache[authTokenSource] = data;
					this.promise_getCurrentUser = null;
					success(data);
				}).fail(_ => {
					this.promise_getCurrentUser = null;
					(fail || api.genericFail)();
				});
			}
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

	getAllDesignerProjectsExtended(projects, success, fail) {
		var callbacks = [];
		projects.forEach((p) => {
			var promise = $.Deferred();
			$.get(p.client).done((data) => {
				p.email = data.email;
				p.display_name= data.display_name;
				promise.resolve();
			});
			callbacks.push(promise);
		});
		$.when.apply($, callbacks).done(success).fail(fail || api.genericFail);
	}

}

var api = new API();

export default api