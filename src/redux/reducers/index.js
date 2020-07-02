import { handleActions } from 'redux-actions';
import {
  fetchJobsRequest,
  fetchJobsSuccess,
  fetchJobsFailure,
} from '../actions';

const initState = {
  jobs: null,
};

export const reducerJobs = handleActions(
  {
    [fetchJobsRequest]: (state, payload) => {
      return { ...state };
    },
    [fetchJobsSuccess]: (state, { payload: { jobs } }) => {
      return { ...state, jobs };
    },
    [fetchJobsFailure]: (state, payload) => {
      return { ...state };
    },
  },
  initState
);
