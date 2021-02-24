import repository from "./repository";

const resource = "/profile";

export default {
  getSummoner(summonerName) {
    return repository.get(`${resource}/${summonerName}`);
  },
};
