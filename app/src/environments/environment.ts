export const environment = {
  apiAuthority: "prod-authority",
  get apiUrl() {
    return `https://${this.apiAuthority}`;
  },
  get wsUrl() {
    return `wss://${this.apiAuthority}`;
  },
};
