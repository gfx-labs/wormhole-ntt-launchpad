export const WormholeTransceiverAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'nttManager',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'wormholeCoreBridge',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'wormholeRelayerAddr',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'specialRelayerAddr',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: '_consistencyLevel',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: '_gasLimit',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
    ],
    name: 'CallerNotNttManager',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
    ],
    name: 'CallerNotRelayer',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'currentOwner',
        type: 'address',
      },
    ],
    name: 'CannotRenounceTransceiverOwnership',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'currentOwner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'CannotTransferTransceiverOwnership',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'val',
        type: 'uint8',
      },
    ],
    name: 'InvalidBoolVal',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'BooleanFlag',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'InvalidBoolValue',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'evmChainId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'blockChainId',
        type: 'uint256',
      },
    ],
    name: 'InvalidFork',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidInitialization',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'InvalidPauser',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'chainId',
        type: 'uint16',
      },
    ],
    name: 'InvalidRelayingConfig',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'reason',
        type: 'string',
      },
    ],
    name: 'InvalidVaa',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidWormholeChainIdZero',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'chainId',
        type: 'uint16',
      },
      {
        internalType: 'bytes32',
        name: 'peerAddress',
        type: 'bytes32',
      },
    ],
    name: 'InvalidWormholePeer',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidWormholePeerZeroAddress',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'encodedLength',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'expectedLength',
        type: 'uint256',
      },
    ],
    name: 'LengthMismatch',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'NotAnEvmAddress',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotInitializing',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotMigrating',
    type: 'error',
  },
  {
    inputs: [],
    name: 'OnlyDelegateCall',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'OwnableInvalidOwner',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'chainId',
        type: 'uint16',
      },
      {
        internalType: 'bytes32',
        name: 'peerAddress',
        type: 'bytes32',
      },
    ],
    name: 'PeerAlreadySet',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ReentrancyGuardReentrantCall',
    type: 'error',
  },
  {
    inputs: [],
    name: 'RequireContractIsNotPaused',
    type: 'error',
  },
  {
    inputs: [],
    name: 'RequireContractIsPaused',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'vaaHash',
        type: 'bytes32',
      },
    ],
    name: 'TransferAlreadyCompleted',
    type: 'error',
  },
  {
    inputs: [],
    name: 'UnexpectedAdditionalMessages',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'deployer',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
    ],
    name: 'UnexpectedDeployer',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'recipientNttManagerAddress',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'expectedRecipientNttManagerAddress',
        type: 'bytes32',
      },
    ],
    name: 'UnexpectedRecipientNttManagerAddress',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'previousAdmin',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newAdmin',
        type: 'address',
      },
    ],
    name: 'AdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'beacon',
        type: 'address',
      },
    ],
    name: 'BeaconUpgraded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint64',
        name: 'version',
        type: 'uint64',
      },
    ],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bool',
        name: 'notPaused',
        type: 'bool',
      },
    ],
    name: 'NotPaused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bool',
        name: 'paused',
        type: 'bool',
      },
    ],
    name: 'Paused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'oldPauser',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newPauser',
        type: 'address',
      },
    ],
    name: 'PauserTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'digest',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'emitterChainId',
        type: 'uint16',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'emitterAddress',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'sequence',
        type: 'uint64',
      },
    ],
    name: 'ReceivedMessage',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'digest',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'emitterChainId',
        type: 'uint16',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'emitterAddress',
        type: 'bytes32',
      },
    ],
    name: 'ReceivedRelayedMessage',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'relayingType',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'refundAddress',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'deliveryPayment',
        type: 'uint256',
      },
    ],
    name: 'RelayingInfo',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint16',
        name: 'recipientChain',
        type: 'uint16',
      },
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'sourceNttManagerAddress',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'recipientNttManagerAddress',
            type: 'bytes32',
          },
          {
            internalType: 'bytes',
            name: 'nttManagerPayload',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'transceiverPayload',
            type: 'bytes',
          },
        ],
        indexed: false,
        internalType: 'struct TransceiverStructs.TransceiverMessage',
        name: 'message',
        type: 'tuple',
      },
    ],
    name: 'SendTransceiverMessage',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint16',
        name: 'chainId',
        type: 'uint16',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isRelayingEnabled',
        type: 'bool',
      },
    ],
    name: 'SetIsSpecialRelayingEnabled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint16',
        name: 'chainId',
        type: 'uint16',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isEvm',
        type: 'bool',
      },
    ],
    name: 'SetIsWormholeEvmChain',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint16',
        name: 'chainId',
        type: 'uint16',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isRelayingEnabled',
        type: 'bool',
      },
    ],
    name: 'SetIsWormholeRelayingEnabled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint16',
        name: 'chainId',
        type: 'uint16',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'peerContract',
        type: 'bytes32',
      },
    ],
    name: 'SetWormholePeer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'implementation',
        type: 'address',
      },
    ],
    name: 'Upgraded',
    type: 'event',
  },
  {
    inputs: [],
    name: 'WORMHOLE_TRANSCEIVER_VERSION',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'consistencyLevel',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'shouldSkipRelayerSend',
            type: 'bool',
          },
        ],
        internalType: 'struct IWormholeTransceiver.WormholeTransceiverInstruction',
        name: 'instruction',
        type: 'tuple',
      },
    ],
    name: 'encodeWormholeTransceiverInstruction',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'gasLimit',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMigratesImmutables',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getNttManagerOwner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getNttManagerToken',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTransceiverType',
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
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'chainId',
        type: 'uint16',
      },
    ],
    name: 'getWormholePeer',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'initialize',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isPaused',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'chainId',
        type: 'uint16',
      },
    ],
    name: 'isSpecialRelayingEnabled',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'hash',
        type: 'bytes32',
      },
    ],
    name: 'isVAAConsumed',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'chainId',
        type: 'uint16',
      },
    ],
    name: 'isWormholeEvmChain',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'chainId',
        type: 'uint16',
      },
    ],
    name: 'isWormholeRelayingEnabled',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'migrate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nttManager',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nttManagerToken',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'encoded',
        type: 'bytes',
      },
    ],
    name: 'parseWormholeTransceiverInstruction',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'shouldSkipRelayerSend',
            type: 'bool',
          },
        ],
        internalType: 'struct IWormholeTransceiver.WormholeTransceiverInstruction',
        name: 'instruction',
        type: 'tuple',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pauser',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'targetChain',
        type: 'uint16',
      },
      {
        components: [
          {
            internalType: 'uint8',
            name: 'index',
            type: 'uint8',
          },
          {
            internalType: 'bytes',
            name: 'payload',
            type: 'bytes',
          },
        ],
        internalType: 'struct TransceiverStructs.TransceiverInstruction',
        name: 'instruction',
        type: 'tuple',
      },
    ],
    name: 'quoteDeliveryPrice',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'encodedMessage',
        type: 'bytes',
      },
    ],
    name: 'receiveMessage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'payload',
        type: 'bytes',
      },
      {
        internalType: 'bytes[]',
        name: 'additionalMessages',
        type: 'bytes[]',
      },
      {
        internalType: 'bytes32',
        name: 'sourceAddress',
        type: 'bytes32',
      },
      {
        internalType: 'uint16',
        name: 'sourceChain',
        type: 'uint16',
      },
      {
        internalType: 'bytes32',
        name: 'deliveryHash',
        type: 'bytes32',
      },
    ],
    name: 'receiveWormholeMessages',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'recipientChain',
        type: 'uint16',
      },
      {
        components: [
          {
            internalType: 'uint8',
            name: 'index',
            type: 'uint8',
          },
          {
            internalType: 'bytes',
            name: 'payload',
            type: 'bytes',
          },
        ],
        internalType: 'struct TransceiverStructs.TransceiverInstruction',
        name: 'instruction',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'nttManagerMessage',
        type: 'bytes',
      },
      {
        internalType: 'bytes32',
        name: 'recipientNttManagerAddress',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'refundAddress',
        type: 'bytes32',
      },
    ],
    name: 'sendMessage',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'chainId',
        type: 'uint16',
      },
      {
        internalType: 'bool',
        name: 'isEnabled',
        type: 'bool',
      },
    ],
    name: 'setIsSpecialRelayingEnabled',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'chainId',
        type: 'uint16',
      },
      {
        internalType: 'bool',
        name: 'isEvm',
        type: 'bool',
      },
    ],
    name: 'setIsWormholeEvmChain',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'chainId',
        type: 'uint16',
      },
      {
        internalType: 'bool',
        name: 'isEnabled',
        type: 'bool',
      },
    ],
    name: 'setIsWormholeRelayingEnabled',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'peerChainId',
        type: 'uint16',
      },
      {
        internalType: 'bytes32',
        name: 'peerContract',
        type: 'bytes32',
      },
    ],
    name: 'setWormholePeer',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'specialRelayer',
    outputs: [
      {
        internalType: 'contract ISpecialRelayer',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newPauser',
        type: 'address',
      },
    ],
    name: 'transferPauserCapability',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferTransceiverOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newImplementation',
        type: 'address',
      },
    ],
    name: 'upgrade',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'wormhole',
    outputs: [
      {
        internalType: 'contract IWormhole',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'wormholeRelayer',
    outputs: [
      {
        internalType: 'contract IWormholeRelayer',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const
