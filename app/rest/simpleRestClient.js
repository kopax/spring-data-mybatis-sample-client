import { stringify } from 'query-string';
import { fetchUtils } from 'admin-on-rest';
import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
} from './types';

/**
 * Maps admin-on-rest queries to a simple REST API
 *
 * The REST dialect is similar to the one of FakeRest
 * @see https://github.com/marmelab/FakeRest
 * @example
 * GET_LIST     => GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts?filter={ids:[123,456,789]}
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default (apiUrl, httpClient = fetchUtils.fetchJson) => {
  /**
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The REST request params, depending on the type
   * @returns {Object} { url, options } The HTTP request parameters
   */
  const convertRESTRequestToHTTP = (type, resource, params) => {
    let url = '';
    const options = {};
    switch (type) {
      case GET_LIST: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        const query = {
          sort: [field, order].join(','),
          page: page - 1,
          size: perPage,
          ...params.filter,
        };
        url = `${apiUrl}/${resource}?${stringify(query)}`;
        break;
      }
      case GET_ONE:
        url = `${apiUrl}/${resource}/${params.id}`;
        break;
      case GET_MANY: {
        const query = {
          ...{ id: params.ids },
        };
        url = `${apiUrl}/${resource}?${stringify(query)}`;
        break;
      }
      case GET_MANY_REFERENCE: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
          sort: [field, order].join(','),
          page: page - 1,
          size: perPage,
          ...{
            ...params.filter,
            [params.target]: params.id,
          },
        };
        url = `${apiUrl}/${resource}?${stringify(query)}`;
        break;
      }
      case UPDATE:
        url = `${apiUrl}/${resource}/${params.id}`;
        options.method = 'PUT';
        options.body = JSON.stringify(params.data);
        break;
      case CREATE:
        url = `${apiUrl}/${resource}`;
        options.method = 'POST';
        options.body = JSON.stringify(params.data);
        break;
      case DELETE:
        url = `${apiUrl}/${resource}/${params.id}`;
        options.method = 'DELETE';
        break;
      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
    return { url, options };
  };

  /**
   * @param {Object} response HTTP response from fetch()
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The REST request params, depending on the type
   * @returns {Object} REST response
   */
  /* eslint-disable no-underscore-dangle */
  const convertHTTPResponseToREST = (response, type, resource, params) => {
    const { json } = response;
    switch (type) {
      case GET_LIST:
      case GET_MANY_REFERENCE:
        if (json.page.totalElements === undefined) {
          throw new Error(
            'The page.totalElements is missing in the HTTP Response. The simple REST client expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare page.totalElements in the response body?'
          );
        }
        return {
          data: json._embedded ? json._embedded[Object.keys(json._embedded)[0]] : [],
          total: json.page.totalElements,
        };
      case GET_ONE:
        return { data: json };
      case CREATE:
        return { data: { ...params.data, id: json.id } };
      case UPDATE:
        return { data: json || {} };
      default:
        return { data: json._embedded ? json._embedded[Object.keys(json._embedded)] : json };
    }
  };
  /* eslint-enable no-underscore-dangle */

  /**
   * @param {string} type Request type, e.g GET_LIST
   * @param {string} resource Resource name, e.g. "posts"
   * @param {Object} payload Request parameters. Depends on the request type
   * @returns {Promise} the Promise for a REST response
   */
  return (type, resource, params) => {
    const { url, options } = convertRESTRequestToHTTP(
      type,
      resource,
      params
    );
    return httpClient(url, options).then((response) =>
      convertHTTPResponseToREST(response, type, resource, params)
    );
  };
};
