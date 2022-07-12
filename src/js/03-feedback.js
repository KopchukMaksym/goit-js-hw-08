import throttle from 'lodash.throttle';
import localStorageCommands from './localstorage';

const formEl = document.querySelector('.feedback-form');
const inputEl = document.querySelector('input');
const textareaEl = document.querySelector('textarea');
const fEEDBACK_FORM_STATE = 'feedback-form-state';
const resultDataLS = localStorageCommands.load(fEEDBACK_FORM_STATE);
const data = {
  email: '',
  message: '',
};
if (resultDataLS !== undefined) {
  inputEl.value = resultDataLS.email;
  textareaEl.value = resultDataLS.message;
}

const formFields = event => {
  console.log('cccc');
  const {
    elements: { email, message },
  } = formEl;
  data.email = email.value;
  data.message = message.value;
  localStorageCommands.save(fEEDBACK_FORM_STATE, data);
};

const removeDataLS = event => {
  event.preventDefault();
  localStorageCommands.remove(fEEDBACK_FORM_STATE);
  console.log(data);
  event.currentTarget.reset();
};

formEl.addEventListener('submit', removeDataLS);

formEl.addEventListener('input', throttle(formFields, 500));
