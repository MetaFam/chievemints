export default [
  {
    inputs: [
      {
        internalType: 'string',
        name: 'roleName',
        type: 'string',
      },
    ],
    name: 'roleIndexForName',
    outputs: [
      {
        internalType: 'uint8',
        name: 'role',
        type: 'uint8',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'index',
        type: 'uint8',
      },
    ],
    name: 'roleNameByIndex',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
]