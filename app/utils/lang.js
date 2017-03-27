/**
 * Created by mbinet on 3/27/17.
 */
import cookie from 'react-cookie'

function getLang() {

    var user;
    if (user = cookie.load('user')) {
        if (user[0] == 'j') {
            user = user.substr(2)
            user = JSON.parse(user)
        }
        if (user.profile)
            return (user.profile.lang)
        else
            return ('en')
    }
    else {
        return ('en')
    }
}

export default getLang;

