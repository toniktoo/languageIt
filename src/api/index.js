// class Queries {
//   constructor() {
//     axios.interceptors.response.use(this.handleSuccess, this.handleError);
//   }

//   handleSuccess = (response) => {
//     return response;
//   };

//   handleError = (error) => {
//     if (error.message === 'Network Error' && !error.response) {
//       message.error('Сетевая ошибка');
//     }

//     if (error.message === 'Request failed with status code 500') {
//       message.error('Сервер не отвечает');
//     }

//     if (error.response.status === 401) {
//         throw error;
//     }
//   };
// }
