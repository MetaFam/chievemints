const Roles_abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "roleName",
        type: "string"
      }
    ],
    name: "roleIndexForName",
    outputs: [
      {
        internalType: "uint8",
        name: "role",
        type: "uint8"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "index",
        type: "uint8"
      }
    ],
    name: "roleNameByIndex",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "pure",
    type: "function"
  }
];
export {
  Roles_abi as default
};
//# sourceMappingURL=Roles.abi.3df9b8a9.js.map
