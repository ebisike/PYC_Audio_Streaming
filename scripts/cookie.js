$(document).ready(function() {

    let cookieName = "announcement"
    let cookieValue = "some text"
    let cookieExp = 1

    //local storage configuration settings
    var localStorageKey = "Pyc_Straming_Username"
    let x = isCookieSet(cookieName, cookieValue, cookieExp)
    if (!x) {
        //console.log(x)
        //show modal alert
        //$('#exampleModal').modal('show')

        //if the user does not have our one day cookie
        // - clear local storage
        localStorage.removeItem(localStorageKey)
            // -next we ask the user to enter his/her username that will be used in interacting with the web app
        $('#enterUsername').modal({
            backdrop: 'static',
            keyboard: false
        })

        //-listen for a submit event on the modal form
        document.querySelector('#usernameForm').addEventListener('submit', (e) => {
            e.preventDefault()
            $('#enterUsername').modal('hide')
            let nativeUsername = document.querySelector('#localUsername').value

            //now set the localStorage
            localStorage.setItem(localStorageKey, nativeUsername)
            let ddd = localStorage.getItem(localStorageKey)
            window.location.reload()
        })
    }

    function isCookieSet(cn, cv, exp) {
        let value = getCookie(cn)
        if (value) {
            return true
        } else {
            setCookie(cn, cv, exp)
            return false;
        }
    }

    function setCookie(cn, cv, exp) {
        let date = new Date()
        date.setTime(date.getTime() + (exp * 24 * 60 * 60 * 1000))
        let expires = "expires" + date.toUTCString()
        document.cookie = cn + "=" + cv + ";" + expires + ";path=/"
    }

    function getCookie(cn) {
        cn = cn + "="
        let decodeCookie = decodeURIComponent(document.cookie)
        let ca = decodeCookie.split(';')
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0) == ' ') {
                c.substring(1)
            }
            if (c.indexOf(cn) == 0)
                return c.substring(cn.length, c.length)
        }
        return ""
    }
})