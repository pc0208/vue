/**
 * 本地储存
 */
const local = {
    get(key) {
        return JSON.parse(window.localStorage.getItem(key))
    },
    set(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value))
    },
    remove(key) {
        Window.localStorage.removeItem(key)
    },
    clear() {
        window.localStorage.clear()
    }
}

export default local