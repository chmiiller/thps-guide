import { combineReducers } from 'redux';

import settings from './settings';
import progress from './progress';

export default combineReducers({ settings, progress });
