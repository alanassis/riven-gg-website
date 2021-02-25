import repository from "./repository";

const resource = "/profile";

export default {
  getSummoner(searchData) {
    return repository.get(
      `${resource}/${searchData.region}/${searchData.nickname}`
    );
  },
  getLeague(searchData) {
    return repository.get(
      `${resource}/${searchData.region}/${searchData.id}/league`
    );
  },
};
