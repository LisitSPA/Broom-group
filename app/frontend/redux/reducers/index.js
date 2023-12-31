import { combineReducers } from "redux";

import matrixReducer from "./matrix";
import modalReducer from "./modal";
import firmReducer from "./firms";
import {
  versionReducer,
  createVersionReducer,
  deleteVersionReducer,
  updateVersionReducer,
} from "./versions";
import {
  firmProfilesReducer,
  createFirmProfileReducer,
  deleteFirmProfileReducer,
  updateFirmProfileReducer,
} from "./firm_profiles";

export default combineReducers({
  matrix: matrixReducer,
  modal: modalReducer,
  actualVersion: versionReducer,
  createdVersion: createVersionReducer,
  deletedVersion: deleteVersionReducer,
  updatedVersion: updateVersionReducer,
  firmOwnersMap: firmReducer,
  firmProfile: firmProfilesReducer,
  createFirmProfile: createFirmProfileReducer,
  deleteFirmProfile: deleteFirmProfileReducer,
  updateFirmProfile: updateFirmProfileReducer
});