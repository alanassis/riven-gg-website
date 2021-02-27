import repository from "./repository";

export default {
  getVersion() {
    return repository.get("/stats");
  },
};
