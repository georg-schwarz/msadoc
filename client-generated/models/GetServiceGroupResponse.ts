// tslint:disable
/**
 * msdoc server API
 * The msdoc server API description
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * @export
 * @interface GetServiceGroupResponse
 */
export interface GetServiceGroupResponse {
    /**
     * Name of the group.
     * @type {string}
     * @memberof GetServiceGroupResponse
     */
    name: string;
    /**
     * Sub-groups representing a hierarchy.
     * @type {Array<GetServiceGroupResponse>}
     * @memberof GetServiceGroupResponse
     */
    groups: Array<GetServiceGroupResponse>;
    /**
     * List of service identifiers within the group
     * @type {Array<string>}
     * @memberof GetServiceGroupResponse
     */
    services: Array<string>;
}
