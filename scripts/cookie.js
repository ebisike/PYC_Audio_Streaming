$(document).ready(function() {
    let cookieName = "announcement"
    let cookieValue = "some text"
    let cookieExp = 1
    let x = isCookieSet(cookieName, cookieValue, cookieExp)
    if (!x) {
        //console.log(x)
        //show modal alert
        $('#exampleModal').modal('show')
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