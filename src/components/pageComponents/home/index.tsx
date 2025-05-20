import styled from 'styled-components'

import Steps from '@/src/components/pageComponents/home/Steps'
import WelcomeHome from '@/src/components/pageComponents/home/WelcomeHome'
import Faq from '@/src/components/sharedComponents/Faq'
import { ContainerPadding, InnerContainer } from '@bootnodedev/db-ui-toolkit'

const Wrapper = styled(InnerContainer)`
  flex-direction: column;
  row-gap: calc(var(--base-gap) * 10);

  ${ContainerPadding}
`

export const Home = () => {
  const faqItems = [
    {
      title: 'What is the NTT Launchpad?',
      description:
        'The NTT Launchpad is a tool that allows users to create or expand tokens with multichain capabilities. You can upgrade your existing ERC20 tokens using a hub-and-spoke model or create entirely new multichain tokens. The app also provides features to manage token behavior across different chains, including access control, limits, and peer settings.',
    },
    {
      title: 'How does the hub-and-spoke model work?',
      description:
        'In the hub-and-spoke model, your token on the originating chain (the hub) acts as the central source, while tokens deployed on other chains (spokes) reference the hub. Token supply is managed through mint-and-burn mechanics to maintain balance across chains.',
    },
    {
      title: 'Can I create a completely new token with the NTT Launchpad?',
      description:
        "Yes. You can create a new multichain token from scratch. The process involves defining your token's name, symbol, supply, and originating chain, then expanding its presence to other supported chains.",
    },
    {
      title: 'How does the app handle access control?',
      description:
        'You can set and manage the owner and pauser addresses for your tokens. The owner has control over administrative actions like setting limits, deploying to new chains, and updating contract peers. The pauser can temporarily halt token transfers in case of emergencies.',
    },
    {
      title: 'What are inbound and outbound limits, and why are they important?',
      description:
        'Inbound and outbound limits control the volume of tokens that can be transferred to or from a chain within a specified period. These limits are essential for managing liquidity, preventing abuse, and ensuring security during multichain operations.',
    },
    {
      title: 'Can I deploy my token to additional chains after the initial setup?',
      description:
        'Yes. After your initial deployment, you can use the Launchpad to add new chains. The app allows you to configure each new chain with its unique limits, access control, and peer settings.',
    },
    {
      title: 'What is a peer, and why do I need to set them?',
      description:
        'A peer is an NTT Manager contract on another chain that facilitates interchain communication. Setting peers ensures your tokens can interact across chains seamlessly, maintaining accurate balances and functionality.',
    },
    {
      title: 'Does the Launchpad support pausing token transfers?',
      description:
        'Yes. The pauser address can pause token transfers on any chain to mitigate risks during unusual activity or emergencies. Pausing ensures your token remains secure under adverse conditions.',
    },
    {
      title: "What happens if I want to modify a token after it's deployed?",
      description:
        'The app allows you to edit configurations for deployed tokens. You can update inbound/outbound limits, change access control addresses, deploy to new chains, and modify peer settings as needed.',
    },
    {
      title: 'Is the NTT Launchpad secure?',
      description:
        "The Launchpad leverages Wormhole's NTT framework, which includes advanced security features like configurable rate-limiting, pausing, and global balance integrity checks. Access control ensures only authorized accounts can manage token configurations.",
    },
  ]

  return (
    <Wrapper>
      <WelcomeHome />
      <Steps />
      <Faq data={faqItems} />
    </Wrapper>
  )
}
