const members = {
  set teamName(val) {
    if (val.trim() === "") {
      this._teamName = "Default Name"; // _teamName is the INTERNAL reference
      return;
    }
    this._teamName = val;
  },
  get teamName() {
    return !this._teamName ? "Default Name" : this._teamName;
  },
  people: ["Max", "Manuel"],
  getTeamMembers() {
    this.people.forEach((p) => {
      console.log(`${p} - ${this._teamName}`); //use internal reference
    });
  },
};

members.teamName = "Johan";
console.log(members.teamName);
