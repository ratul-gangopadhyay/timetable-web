import { takeLatest, call, put } from 'redux-saga/effects';
import * as actions from './teachersActions';
import {
  getTeachers,
  getTeacher,
  addTeacher,
} from '../../../service/teachersService';
import { toast, Zoom } from 'react-toastify';
import { showSpinner, hideSpinner } from '../common/commonActions';

export function* fetchTeachers() {
  try {
    yield put(showSpinner('Loading Teachers...'));
    const result = yield call(getTeachers);
    yield put(hideSpinner());
    yield put(actions.getTeachersSuccess(result.data));
    yield toast.success('Successfully loaded Teachers', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Zoom,
    });
  } catch (error) {
    yield put(hideSpinner());
    yield toast.error(
      error?.response?.data?.errorMessage || 'Some Error Occured',
      {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Zoom,
      }
    );
    yield put(actions.getTeachersFailure(error));
  }
}

export function* fetchTeacher({ params: { teacherId } }) {
  try {
    yield put(showSpinner('Loading Teacher...'));
    const result = yield call(getTeacher, teacherId);
    yield put(hideSpinner());
    yield put(actions.getTeacherSuccess(result.data));
  } catch (error) {
    yield put(hideSpinner());
    yield toast.error(
      error?.response?.data?.errorMessage || 'Some Error Occured',
      {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Zoom,
      }
    );
    yield put(actions.getTeacherFailure(error));
  }
}

export function* insertTeacher({ payload: { teacher } }) {
  try {
    const response = yield call(addTeacher, teacher);
    yield toast.success('Success: Added New Teacher', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Zoom,
    });
    yield put(actions.storeTeacher(response.data));
  } catch (error) {
    yield put(hideSpinner());
    yield toast.error(
      error?.response?.data?.errorMessage || 'Some Error Occurred',
      {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Zoom,
      }
    );
    yield put(actions.insertTeacherFailure(error));
  }
}

export function* teachersSaga() {
  yield takeLatest(actions.Types.GET_TEACHERS_REQUEST, fetchTeachers);
  yield takeLatest(actions.Types.GET_TEACHER_REQUEST, fetchTeacher);
  yield takeLatest(actions.Types.INSERT_TEACHER_REQUEST, insertTeacher);
}
