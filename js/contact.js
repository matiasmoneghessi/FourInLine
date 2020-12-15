function validateName() {
    if (userName.value.length < 3 && userName.value.length > 0) {
        userName.innerHTML = 'Nombre demasiado corto.'
        console.log('Nombre demasiado corto')
        completeUsername = false
    } else if (userName.value.length === 0) {
        userNameError.innerHTML = 'Campo Incompleto.'
        console.log('Nombre demasiado corto')
        completeUsername = false
    } else {
        userNameError.innerHTML = ''
        completeUsername = true
    }
}

function validateSurname() {
    if (lastName.value.length < 3 && lastName.value.length > 0) {
        lastName.innerHTML = 'Apellido demasiado corto.'
        console.log('Apellido demasiado corto')
        completeLastName = false
    } else if (lastName.value.length === 0) {
        lastNameError.innerHTML = 'Campo Incompleto'
        console.log('Apellido demasiado corto')
        completeLastName = false
    } else {
        lastNameError.innerHTML = ''
        completeLastName = true
    }
}

function validateEmail() {
    var pattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;
    if (pattern.test(email.value)) {
        emailError.innerHTML = ''
        completeEmail = true
    } else {
        emailError.innerHTML = 'Formato de email incorrecto'
        console.log('Formato de email incorrecto')
        completeEmail = false
    }
}

function validateAge() {
    if (isNaN(age.value) || age.value < 1 || age.value > 99) {
        ageError.innerHTML = 'Edad Invalida'
        console.log('Edad Invalida')
        completeAge = false
    } else {
        ageError.innerHTML = ''
        completeAge = true
    }
}

function validateComment() {
    if (comments.value.length < 15) {
        commentsError.innerHTML = 'El comentario debe tener al menos 15 caracteres'
        console.log('El comentario debe tener al menos 15 caracteres')
        completeComments = false
    } else {
        commentsError.innerHTML = ''
        completeComments = true
    }
}

var showMessage = function() {
    alert('form sended successfully')
}

function cleanInputs() {
    if (completeUsername && completeLastName && completeEmail && completeAge && completeComments) {
        userName.value = ''
        lastName.value = ''
        email.value = ''
        age.value = ''
        comments.value = ''
        comments.value = ''
        showMessage()
    } else {
        console.log('Para poder ver los datos, debes ingresar todos los campos obligatorios')
    }
}

var sendForm = function () {
    console.clear()
    validateName()
    validateSurname()
    validateEmail()
    validateAge()
    validateComment()
    cleanInputs()
    return false
}


window.onload = function () {
    userName = document.getElementById('name')
    lastName = document.getElementById('lastName')
    age = document.getElementById('age')
    email = document.getElementById('email')
    men = document.getElementById('men')
    women = document.getElementById('women')
    other = document.getElementById('other')
    comments = document.getElementById('comentarios')
    sendButton = document.getElementById('send')
    userNameError = document.getElementById('nameError')
    lastNameError = document.getElementById('lastNameError')
    ageError = document.getElementById('ageError')
    emailError = document.getElementById('emailError')
    sexError = document.getElementById('sexError')
    textInterestError = document.getElementById('interestError')
    chooseError = document.getElementById('chooseError')
    commentsError = document.getElementById('commentsError')
    h1 = document.getElementById('sended')
    btnHome = document.getElementById('home')
    sendButton.onclick = sendForm
}