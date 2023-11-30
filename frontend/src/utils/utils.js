// Функция для получения токена из локального хранилища
export function getStorage(key) {
    return localStorage.getItem(key)
}