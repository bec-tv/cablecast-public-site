import fetch from 'fetch';
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import ENV from 'cablecast-public-site/config/environment';

export default class ApiService extends Service {

    @service fastboot;

    site = 1;

    fetch(endpoint, params = {}) {
        if (ENV.CC_LOCAL) {
            return this.fetchLocalCablecast(endpoint, params);
        }
        
        return this.fetchCablecastCloudServices(endpoint, params);
    }

    fetchLocalCablecast(endpoint, params) {
        let base = '/';
        if (this.get('fastboot.isFastBoot')) {
            base = "http://127.0.0.1:55001";
        } else {
            base = window.location.host;
        }

        if (ENV.PROXY) {
            base = ENV.PROXY;
        }
        params.site = this.get('site');
        let query = this.generateQueryString(params);
        return fetch(`${base}/cablecast${endpoint}${query}`)
    }

    fetchCablecastCloudServices(endpoint, params) {
        let host = '';
        if (this.get('fastboot.isFastBoot')) {
            let headers = this.get('fastboot.request.headers');
            host = headers.get('x-ccs-host');
        }
        else {
            host = window.location.host
        }

        let base = ENV.CCSServer;
        if (ENV.ENV.environment === 'development') {
            host = "ray-dev-local-reflect.cablecast.tv";
        }
        params.host = host;
        params.site = site;
        let query = this.generateQueryString(params);
        return fetch(`${base}/${endpoint}${query}`)
    }

    generateQueryString(params) {
        // Hack until we can use `URLSearchParams`
        let result = '';
        let keys = Object.keys(params);
        if (keys) {
        
            let queryParams = keys.map(key => {
                return `${key}=${params[key]}`;
            });

            result = `?${queryParams.join('&')}`; 
        }

        return result;

    }
}