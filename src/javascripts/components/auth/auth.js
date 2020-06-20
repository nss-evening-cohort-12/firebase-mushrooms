import utils from '../../helpers/utils';

const signMeIn = () => {
  console.warn('Yeah I\'ll sign you in, just give me a minute!');
};

const loginButton = () => {
  const domString = '<button id="google-auth" class="btn btn-warning"><i class="fab fa-google-plus"></i> LOG ME IN!!!</button>';
  utils.printToDom('#auth', domString);
  $('#google-auth').click(signMeIn);
};

export default { loginButton };
