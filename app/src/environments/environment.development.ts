export const environment = {
  apiAuthority: "localhost:3000",
  get apiUrl() {
    return `http://${this.apiAuthority}`;
  },
  get wsUrl() {
    return `ws://${this.apiAuthority}`;
  },
};
