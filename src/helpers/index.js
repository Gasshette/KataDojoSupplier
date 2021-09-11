// https://stackoverflow.com/a/3710226/9868549
export function isJsonString(string) {
    try {
        JSON.parse(string);
    } catch (e) {
        return false;
    }
    return true;
}
