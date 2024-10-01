import fs from 'fs';
import ora from 'ora';
import { fetch, setGlobalDispatcher, Agent } from 'undici';

const DEFAULT_EXTENSION = '.json';
const DEFAULT_LOCALE = 'en-US';
const DEFAULT_ENCODING = 'utf8';
const TRANSLATOR_ENDPOINT = 'https://airjam.co/s/translate';

export function backfillEntireDirectory(directory, cli_options) {
    const extension = cli_options.ext ? cli_options.ext : DEFAULT_EXTENSION;
    const defaultLocale = cli_options.default ? cli_options.default : DEFAULT_LOCALE;
    const locales = cli_options.locales ? cli_options.locales.split(',') : [];
    const defaultLocaleFile = directory + '/' + defaultLocale + extension;
    const keepExistingTranslations = cli_options.keep_existing_translations ? cli_options.keep_existing_translations : false;
    if (!locales.length) {
        console.log('No locales specified. Backfill is skipped');
        return;
    }
    if (!fs.existsSync(defaultLocaleFile)) {
        console.log('File not found: ' + defaultLocaleFile);
        return;
    } else {
        console.log('Default locale file found:' + defaultLocaleFile);
        const payload = {
            default_locale: defaultLocale,
            locales: locales,
            retain_existing_translations: keepExistingTranslations,
            translations: {}
        };
        for (let i = 0; i < locales.length; i++) {
            const fileName = directory + '/' + locales[i] + extension;
            const exists = fs.existsSync(fileName);
            if (exists) {
                const data = fs.readFileSync(fileName, { encoding: DEFAULT_ENCODING, flag: 'r' });
                const dataJson = JSON.parse(data);
                payload.translations[locales[i]] = dataJson;
            }
        }

        setGlobalDispatcher(new Agent({ bodyTimeout: 3600000000, headersTimeout: 3600000000 }) )
        const throbber = ora('Translation is in progress...').start();
        fetch(TRANSLATOR_ENDPOINT, {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(payload),
        }).then((response) => {
            throbber.stop();
            if (response.ok) {
                console.log('successfully received');
                response.text().then((r) => {
                    const resp = JSON.parse(r);
                    // translations field has all the translations.
                    if (resp.translations) {
                        const returnedLocales = Object.keys(resp.translations);
                        console.log(returnedLocales);
                        for (let i = 0; i < returnedLocales.length; i++) {
                            const l = returnedLocales[i];
                            if (locales.filter(loc => loc === l)) {
                                console.log('Writing ' + directory + '/' + l + extension);
                                if (l.toLowerCase() === defaultLocale.toLowerCase()) continue;
                                const translationResult = JSON.stringify(resp.translations[l]);
                                fs.writeFile(directory + '/' + l + extension, translationResult, (err) => {
                                    // In case of a error throw err.
                                    if (err) throw err;
                                });
                            } else {
                                console.log("Unspecified locale received from server: " + l);
                            }
                        }
                    } else {
                        console.log("Server response is not in correct format");
                    }
                });
            } else {
                console.log("There was an error receiving translations");
                console.log(response);
                throw "error";
            }
        }).catch((error) => {
            throbber.stop();
            console.log(error);
            throw "error";
        });
    }
};