import api from './api';

async function getRouting(params) {
    return await api.post("RouteAddresses",params);
}


export const routeApi = {
    getRouting
}