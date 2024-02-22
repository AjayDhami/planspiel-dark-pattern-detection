export const storage = {
    get : (key, storageArea) => {
        //const keyObj = defaultValue === undefined ? key : {[key]: defaultValue};
        return new Promise((resolve, reject) => {
            chrome.storage[storageArea].get(key, items => {
                const error = chrome.runtime.lastError;
                if (error) return reject(error);
                resolve(items[key]);
            });
        });
    }
}