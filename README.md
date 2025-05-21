# wormhole-ntt-launchpad

This is the dashboard for Wormhole's Native Token Transfers. Native Token Transfers (NTT) is an open framework that enables the seamless creation and transfer of multichain tokens, while maintaining ownership and contract upgradability across blockchains.

## Table of Contents

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Development](#development)
5. [Contributing](#contributing)

## Requirements

- Node v20+
- pnpm

## Installation

Ensure `pnpm` is installed (https://pnpm.io/) and clone the repository.

```bash
# Clone the repository
git clone git@github.com:gfx-labs/wormhole-ntt-launchpad.git

# Change the directory
cd wormhole-ntt-launchpad

# Checkout the latest release
git checkout main

# Create a local .env file
cp .env.example .env.local

# Install the dependencies
pnpm i
```

## Development

### Serve dev mode

```bash
pnpm dev
```

You can start modifying the content of the home page by editing `src/components/pageComponents/home/index.tsx`. The page auto-updates as you edit the file.

You can also modify and see how our Web3 components work in the [demos folder](src/components/pageComponents/home/Examples/demos).

### Build for production

```bash
pnpm build
```

### Serve production build

```bash
pnpm preview
```

## Advanced configuration

### Networks

To add / remove / edit a network supported by the dApp you can do it directly in the [`networks.config.ts`](src/lib/networks.config.ts) file.

1. Import the supported network of your choice, say `base`.

```diff
- import { mainnet, optimismSepolia, sepolia } from 'viem/chains'
+ import { base, mainnet, optimismSepolia, sepolia } from 'viem/chains'

...

- export const chains = [mainnet, optimismSepolia, sepolia] as const
+ export const chains = [base, mainnet, optimismSepolia, sepolia] as const

```

2. Include it in the trasports, using the default RPC provided by wagmi/viem...

```diff
export const transports: RestrictedTransports = {
    ...
+   [base.id]: http(env.PUBLIC_RPC_BASE),
}
```

#### Specifying the RPC

If you want to use an RPC different from the one provided by wagmi

1. Define the env variable

```diff
+ PUBLIC_RPC_BASE=https://base.llamarpc.com
```

2. Import it in the [`src/env.ts`](src/env.ts) file

```diff
export const env = createEnv({
  client: {
    ...
+   PUBLIC_RPC_BASE: z.string().optional(),
  },
})
```

**Note:** if not specified, it will be `undefined` making the app to use the wagmi-defined RPC.

## Contributing

If you want to contribute to this project, please read the [contributing guidelines](CONTRIBUTING.md). Issues and pull requests are welcome!
