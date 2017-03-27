/**
 * Created by mbinet on 3/27/17.
 */
import cookie from 'react-cookie'

function getLang() {

    var user;
    if (user = cookie.load('user')) {
        return (user.profile.lang)
    }
    else {
        return ('en')
    }
}

export default getLang;

