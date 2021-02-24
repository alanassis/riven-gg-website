import repository from "./repository";

const resource = "/league";

export default {
  getLeague(summoner) {
    return repository.get(`${resource}/${summoner.region}/${summoner.id}`);
  },
};
