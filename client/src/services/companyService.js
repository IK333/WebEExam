import axios from 'axios';

const API_URL = 'http://localhost:5000/api/companies';

const getCompanies = (search = '') => {
    return axios.get(`${API_URL}?search=${search}`);
};

const addCompany = (companyData, token) => {
    return axios.post(API_URL, companyData, {
        headers: {
            'x-auth-token': token,
        },
    });
};

const updateCompany = (id, companyData, token) => {
    return axios.put(`${API_URL}/${id}`, companyData, {
        headers: {
            'x-auth-token': token,
        },
    });
};

const deleteCompany = (id, token) => {
    return axios.delete(`${API_URL}/${id}`, {
        headers: {
            'x-auth-token': token,
        },
    });
};

export default {
    getCompanies,
    addCompany,
    updateCompany,
    deleteCompany,
};