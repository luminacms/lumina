import storage from 'storejs'
import goto from '@/utils/goto'

const store = {
    debug: true,
    prefix: 'lumina_vod_payknowledge_',
    state: {
        name: 'Hello!'
    },
    setData (key, value) {
        return storage.set(this.prefix+key, value)
    },
    getData (key) {
        return storage.get(this.prefix+key)
    },
    clearData(key) {
        return key?store.remove(key):store.clear();
    },
    checkToken() {
        if(!this.getData('token')) {
            goto('/vod/payknowledge/user/login')
            return false
        }
        return true;
    }
}

export default store
