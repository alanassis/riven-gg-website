import repository from "./repository";

const resource = "/profile";

export default {
  getSummoner(searchData) {
    return repository.get(
      `${resource}/${searchData.region}/${searchData.nickname}`
    );
  },
  getLeagues(searchData) {
    return repository.get(
      `${resource}/${searchData.region}/${searchData.summonerId}/leagues`
    );
  },
  getMatches(searchData) {
    return repository.get(
      `${resource}/${searchData.region}/${searchData.accountId}/matches`
    );
  },
};
