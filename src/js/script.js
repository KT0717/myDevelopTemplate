var form = document.getElementById('form');
var yourName = document.getElementById('your-name');
var yourEmail = document.getElementById('your-email');
var yourGender = document.getElementById('your-gender');
var yourTel = document.getElementById('your-tel');
var mSex = document.getElementById('msex');
var fSex = document.getElementById('fsex');

form.addEventListener('submit', e => {
  e.preventDefault();
  if (validateName(yourName)) {
    //
  }
  if (validateEmail(yourEmail)) {
    //
  }
  if (validSex(mSex, fSex)) {
    //
  }
  if (validTel(yourTel.value)) {
    //
  }
  if (emptyCheck(yourName, yourEmail, yourTel)) {
    //
  }
  return false;
});

function emptyCheck(...args) {
  for (let i = 0; i < args.length; i = (i + 1) | 0) {
    if (args[i].value === '') {
      args[i].nextElementSibling.innerHTML = '必須項目です';
    }
  }
  return true;
}

function validateName(yourName) {
  if (yourName.value.length >= 4) {
    errMsg(yourName, true);
    return true;
  } else {
    errMsg(yourName, false);
    return false;
  }
}

function validateEmail(yourEmail) {
  var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (yourEmail.value.match(mailformat)) {
    errMsg(yourEmail, true);
    return true;
  } else {
    errMsg(yourEmail, false);
    return false;
  }
}

function validTel(str) {
  var phone_array = str.match(/\+?[0-9]+[-\x20]?[0-9]+[-\x20]?[0-9]+[-\x20]?[0-9]+/g);
  for (var i = 0; phone_array != null && i < phone_array.length; i++) {
    var tmp = phone_array[i];
    str = tmp.replace(/[-\x20]/g, '');
    if (str.length < 10) {
      continue;
    }
  }
  console.log(str);
  return str;
}

function validSex(mSex, fSex) {
  var x = 0;
  if (mSex.checked) {
    x++;
  }
  if (fSex.checked) {
    x++;
  }
  if (x == 0) {
    errMsg(yourGender, false);
    return false;
  } else {
    errMsg(yourGender, true);
    return true;
  }
}

function errMsg(params, flag) {
  if (flag == true) {
    params.nextElementSibling.innerHTML = '<span class="text-success">OK<i class="fas fa-check ml-1"></i></span>';
  } else if (flag == false && params == yourName) {
    params.nextElementSibling.innerHTML = '4 文字以上で設定してください';
  } else if (flag == false && params == yourEmail) {
    params.nextElementSibling.innerHTML = 'メールの形式が正しくありません';
  } else if (flag == false && params == yourGender) {
    params.nextElementSibling.innerHTML = 'どちらかを選択してください';
  } else if (flag == false && params == yourTel) {
    params.nextElementSibling.innerHTML = '電話番号の形式が正しくありません';
  }
}
