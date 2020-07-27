import http from '../../http-common';

/*
const getAll = () => {
  return http.get('/grade');
};
*/
const get = (id) => {
  return http.get(id);
};

const create = (data) => {
  console.log(data, "ok");
  return http.post('/newLancamento', data);
};

const update = (id, data) => {
  console.log(data);
  return http.put(`/updateLancamento/${id}`, data);
};

const remove = (id) => {
  console.log(id, "lancamento");
  return http.delete(`/deleteLancamento/${id}`);
};

/*
const removeAll = () => {
  return http.delete(`/grade`);
};

const findByName = (name) => {
  return http.get(`/grade?name=${name}`);
};
*/
export default {
 // getAll,
  get,
  create,
  update,
  remove,
 // removeAll,
// findByName,
};
