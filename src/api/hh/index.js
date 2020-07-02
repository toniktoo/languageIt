import axios from 'axios';

class Queries {
  constructor() {
    this.base_url = 'https://api.hh.ru';
  }

  /* hh */

  getVacancies = async () => {
    const res = await axios.get(
      `${this.base_url}/vacancies?text=react&per_page=16&page=0`
    );
    return res.data;
  };
}

export default new Queries();
