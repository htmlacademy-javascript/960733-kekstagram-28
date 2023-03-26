import {renderPosts, showConnectionError} from './rendering.js';
import {sendRequest} from './requests.js';

const SOURCE_DATA_URL = 'https://28.javascript.pages.academy/kekstagram/data';

sendRequest(SOURCE_DATA_URL, renderPosts, showConnectionError);
