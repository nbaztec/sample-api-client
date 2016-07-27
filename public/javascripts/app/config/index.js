/**
 * Created by nisheeth on 25/7/16.
 */

export const API_SERVER_URL = 'http://localhost:9001';

export function apiUrl(endpoint) {
  return `${API_SERVER_URL}${endpoint}`;
}