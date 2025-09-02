import api from "./api";

async function apiCall(path, pt, fd) {
    const authToken = localStorage.getItem('authToken');  // Get token dynamically
    fd.append('programType', pt);
    fd.append('authToken', authToken);  // Use the dynamic token

    const res = await api.post(path, fd);
    return res;
}

export { apiCall };