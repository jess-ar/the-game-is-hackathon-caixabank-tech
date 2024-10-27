import { atom } from 'nanostores';

let parsedUser = null;

try {
    const userData = localStorage.getItem('user');
    parsedUser = userData ? JSON.parse(userData) : null;
    if (!isValidUserData(parsedUser)) {
        console.warn("Invalid user data in localStorage. Resetting to default values.");
        localStorage.removeItem('user');
        parsedUser = null;
    }
} catch (error) {
    console.error("Error parsing 'user' data from localStorage:", error);
    localStorage.removeItem('user');
    parsedUser = null;
}

export const authStore = atom(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    let user = parsedUser;

    if (!user) {
        try {
            user = JSON.parse(localStorage.getItem('user'));
        } catch (error) {
            console.error("Failed to parse user data from localStorage:", error);
            localStorage.removeItem('user');
        }
    }

    return {
        isAuthenticated,
        user,
    };
});

window.addEventListener('storage', (event) => {
    if (event.key === 'user' || event.key === 'isAuthenticated') {
        try {
            const newUser = event.key === 'user' ? (event.newValue ? JSON.parse(event.newValue) : null) : parsedUser;
            authStore.set({
                isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
                user: isValidUserData(newUser) ? newUser : null,
            });
        } catch (error) {
            console.error("Error parsing 'user' data on storage event:", error);
            authStore.set({ isAuthenticated: false, user: null });
            localStorage.removeItem('user');
        }
    }
});

export const login = (userData) => {
    authStore.set({ isAuthenticated: true, user: userData });
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
};

export const logout = () => {
    authStore.set({ isAuthenticated: false, user: null });
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
};

function isValidUserData(data) {
    return data && typeof data === 'object' && data.id && data.email;
}
