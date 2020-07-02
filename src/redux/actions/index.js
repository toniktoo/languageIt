import { createAction } from 'redux-actions';

export const fetchJobsRequest = createAction('FETCH_JOBS_REQUEST');
export const fetchJobsSuccess = createAction('FETCH_JOBS_SUCCESS');
export const fetchJobsFailure = createAction('FETCH_JOBS_FAILURE');
