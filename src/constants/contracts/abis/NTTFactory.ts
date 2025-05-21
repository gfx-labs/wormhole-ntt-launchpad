export const NTTFactoryAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: 'deployerAddress',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'CONSISTENCY_LEVEL',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint8',
        internalType: 'uint8',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'GAS_LIMIT',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'RATE_LIMIT_DURATION',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint64',
        internalType: 'uint64',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'SHOULD_SKIP_RATE_LIMITER',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'VERSION',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'deployNtt',
    inputs: [
      {
        name: 'mode',
        type: 'uint8',
        internalType: 'enum IManagerBase.Mode',
      },
      {
        name: 'tokenParams',
        type: 'tuple',
        internalType: 'struct INttFactory.TokenParams',
        components: [
          {
            name: 'name',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'symbol',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'existingAddress',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'initialSupply',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
      {
        name: 'externalSalt',
        type: 'string',
        internalType: 'string',
      },
      {
        name: 'outboundLimit',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'peerParams',
        type: 'tuple[]',
        internalType: 'struct PeersLibrary.PeerParams[]',
        components: [
          {
            name: 'peerChainId',
            type: 'uint16',
            internalType: 'uint16',
          },
          {
            name: 'decimals',
            type: 'uint8',
            internalType: 'uint8',
          },
          {
            name: 'inboundLimit',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
    ],
    outputs: [
      {
        name: 'token',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'nttManager',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'transceiver',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'nttOwnerAddress',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'deployer',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'initializeManagerBytecode',
    inputs: [
      {
        name: 'managerBytecode',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'initializeTransceiverBytecode',
    inputs: [
      {
        name: 'transceiverBytecode',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'initializeWormholeConfig',
    inputs: [
      {
        name: 'whCoreBridge',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'whRelayer',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'whSpecialRelayer',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'whChainId',
        type: 'uint16',
        internalType: 'uint16',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'nttManagerBytecode',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'nttTransceiverBytecode',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'specialRelayer',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'supportsInterface',
    inputs: [
      {
        name: 'interfaceId',
        type: 'bytes4',
        internalType: 'bytes4',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'wormholeChainId',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint16',
        internalType: 'uint16',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'wormholeCoreBridge',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'wormholeRelayer',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'ManagerBytecodeInitialized',
    inputs: [
      {
        name: 'managerBytecode',
        type: 'bytes32',
        indexed: false,
        internalType: 'bytes32',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ManagerDeployed',
    inputs: [
      {
        name: 'manager',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'token',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'NttOwnerDeployed',
    inputs: [
      {
        name: 'ownerContract',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'manager',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'transceiver',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'PeerSet',
    inputs: [
      {
        name: 'manager',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'chainId',
        type: 'uint16',
        indexed: false,
        internalType: 'uint16',
      },
      {
        name: 'peer',
        type: 'bytes32',
        indexed: false,
        internalType: 'bytes32',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'TokenDeployed',
    inputs: [
      {
        name: 'token',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'name',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
      {
        name: 'symbol',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'TransceiverBytecodeInitialized',
    inputs: [
      {
        name: 'transceiverBytecode',
        type: 'bytes32',
        indexed: false,
        internalType: 'bytes32',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'TransceiverDeployed',
    inputs: [
      {
        name: 'transceiver',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'token',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'WormholeConfigInitialized',
    inputs: [
      {
        name: 'whCoreBridge',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'whRelayer',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'specialRelayer',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'whChainId',
        type: 'uint16',
        indexed: false,
        internalType: 'uint16',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'BytecodesNotInitialized',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Create2EmptyBytecode',
    inputs: [],
  },
  {
    type: 'error',
    name: 'FailedDeployment',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InsufficientBalance',
    inputs: [
      {
        name: 'balance',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'needed',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'InvalidBytecodes',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidTokenParameters',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ManagerBytecodeAlreadyInitialized',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotDeployer',
    inputs: [],
  },
  {
    type: 'error',
    name: 'TransceiverBytecodeAlreadyInitialized',
    inputs: [],
  },
  {
    type: 'error',
    name: 'WormholeConfigAlreadyInitialized',
    inputs: [],
  },
  {
    type: 'error',
    name: 'WormholeConfigNotInitialized',
    inputs: [],
  },
] as const
