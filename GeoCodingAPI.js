/**
 * Search in google GeoCoding API
 * 
 * https://developers.google.com/maps/documentation/geocoding/overview
 * 
 * it allows address to coordinates
 * 
 * it allows coordinates to addres
 * 
 * click on getstarted
 * 
 * go to API's 
 * 
 * enable Geocoding API's in the list of API's see if its enabled
 * 
 *if its not find a way
 * 
 *now go under credentials
 * 
 *you should have an API key
 *
 * export async function getAddres(lat, lng){
 * const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_API_KEY`
 * const response = await fetch(url);
 * if(!response.ok){
 * throw new Error('Failed to fetch address!');
 * 
 * const data = await response.json();
 * 
 * const address = data.results[0].formatted_address;
 * return address;
 * }
 */