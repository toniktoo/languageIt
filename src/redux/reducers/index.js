import { handleActions } from 'redux-actions';
import {
  fetchSnippetVacanciesRequest,
  fetchSnippetVacanciesSuccess,
  fetchSnippetVacanciesFailure,
  fetchFullVacanciesRequest,
  fetchFullVacanciesSuccess,
  fetchFullVacanciesFailure,
  changeExperience,
  changePage,
} from '../actions';

const initState = {
  fullVacancies: [],
  snippetVacancies: [],
  isLoadingJobs: true,
  experience: 1,
  currentPage: 1
};

export const reducerJobs = handleActions(
  {
    [fetchSnippetVacanciesRequest]: (state, { payload: { isLoadingJobs } }) => {
      return { ...state, isLoadingJobs };
    },
    [fetchSnippetVacanciesSuccess]: (
      state,
      { payload: { snippetVacancies, isLoadingJobs } }
    ) => {
      return { ...state, snippetVacancies, isLoadingJobs };
    },
    [fetchSnippetVacanciesFailure]: (state, { payload: { isLoadingJobs } }) => {
      return { ...state, isLoadingJobs };
    },

    [fetchFullVacanciesRequest]: (state, { payload: { isLoadingJobs } }) => {
      return { ...state, isLoadingJobs };
    },
    [fetchFullVacanciesSuccess]: (
      state,
      { payload: { fullVacancies, isLoadingJobs } }
    ) => {
      return { ...state, fullVacancies, isLoadingJobs };
    },
    [fetchFullVacanciesFailure]: (state, { payload: { isLoadingJobs } }) => {
      return { ...state, isLoadingJobs };
    },
    [changeExperience]: (state, { payload: { experience } }) => {
      return { ...state, experience };
    },
    [changePage]: (state, { payload: { currentPage } }) => {
      return { ...state, currentPage };
    },
  },
  initState
);
