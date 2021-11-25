import instance from './separateApi';

export const getAllProvinces = () => {
  return instance.get('/provinces');
};

export const getUserInProvince = (requestParam) => {
    return instance.get('/users', { params: requestParam });
};

export const getRouteByUser = (requestParam) => {
    return instance.get('/route', { params: requestParam });
};

export const getRouteInfo = (requestParam) => {
    return instance.get('/route/info', { params: requestParam });
};

export const getMainSign = (requestParam) => {
    return instance.get('/sign/main', { params: requestParam });
};

export const getImageDisplay = (requestParam) => {
    return instance.get('/sign/image', { params: requestParam });
};

export const getAllUserAndRouteByAdmin = (requestParam) => {
    return instance.get('/all-user-route', { params: requestParam });
};

export const getAllUserByAdmin = (requestParam) => {
    return instance.get('/all-user');
};