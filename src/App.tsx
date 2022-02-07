import React, { useEffect, useState } from 'react'
import { sequence } from '0xsequence'
import { ETHAuth } from '@0xsequence/ethauth'
import { configureLogger } from '@0xsequence/utils'
import { Button } from './components/Button'
import { styled, typography } from './style'
import Image1 from './images/image1.jpg'
import Image2 from './images/image2.jpg'
import Image3 from './images/image3.jpg'
import Image4 from './images/image4.jpg'
import Image5 from './images/image5.jpg'
import Image6 from './images/image6.jpg'
import { Group } from './components/Group'
import { BrowserRouter as Router, Route, Switch, Link, useParams } from "react-router-dom";
import { injected } from "./connector";
import { Framework } from "@superfluid-finance/sdk-core";
import { useWeb3React } from "@web3-react/core";
import { useMoralis } from './hooks/useMoralis'
import { customHttpProvider, myPvKey, chainId, DAIx } from "./config";
import { ethers } from "ethers";

configureLogger({ logLevel: 'DEBUG' })

const blogs = [
  {
    title: "Dream destinations to visit this year in Paris",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: Image1,
    createdAt: "08.08.2022",
    cost: "0.000000385802469 DAIx/sec",
    flowRate: "10000000000000",
    author: "Richard Norton",
    walletAddr: "0x9c5236b338b06b78ED674859EF3D769A65dF926C",
  },
  {
    title: "Breathtaking first-person photos around Europe",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: Image2,
    createdAt: "08.08.2022",
    cost: "0.000000385802469 DAIx/sec",
    flowRate: "10000000000000",
    author: "Richard Norton",
    walletAddr: "0xeF7BD59ef642A36BcBB4758c11219D5Bbe87f941C",
  },
  {
    title: "What collectors need to know about authenticity",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: Image3,
    createdAt: "08.08.2022",
    cost: "0.000000385802469 DAIx/sec",
    flowRate: "10000000000000",
    author: "Richard Norton",
    walletAddr: "0x9c5236b338b06b78ED674859EF3D769A65dF926C",
  },
  {
    title: "Things to know before visiting Cave in Germany",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: Image4,
    createdAt: "08.08.2022",
    cost: "0.000000385802469 DAIx/sec",
    flowRate: "10000000000000",
    author: "Richard Norton",
    walletAddr: "0xeF7BD59ef642A36BcBB4758c11219D5Bbe87f941C",
  },
  {
    title: "Richard Norton photorealistic rendering as real photos",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: Image5,
    createdAt: "08.08.2022",
    cost: "0.000000385802469 DAIx/sec",
    flowRate: "10000000000000",
    author: "Richard Norton",
    walletAddr: "0x9c5236b338b06b78ED674859EF3D769A65dF926C",
  },
  {
    title: "25 quality collectors toys inspired by famous films",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: Image6,
    createdAt: "08.08.2022",
    cost: "0.000000385802469 DAIx/sec",
    flowRate: "10000000000000",
    author: "Richard Norton",
    walletAddr: "0xeF7BD59ef642A36BcBB4758c11219D5Bbe87f941C",
  },
]

const network = 'mumbai'
const wallet = new sequence.Wallet(network)

async function createNewFlow(recipient: any, flowRate: any) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();

  const sf = await Framework.create({
    chainId: chainId,
    provider: customHttpProvider
  });

  try {
    const createFlowOperation = sf.cfaV1.createFlow({
      flowRate: flowRate,
      receiver: recipient,
      superToken: DAIx
      // userData?: string 
    });

    console.log("Creating your stream...");

    const result = await createFlowOperation.exec(signer);
    console.log(result);

    console.log(
      `Congrats - you've just created a money stream!
          View Your Stream At: https://app.superfluid.finance/dashboard/${recipient}
          Network: Kovan
          Super Token: DAIx
          Sender: 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721
          Receiver: ${recipient},
          FlowRate: ${flowRate}
          `
    );
  } catch (error) {
    console.log(
      "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
    );
    console.error(error);
  }
}

async function deleteFlow(recipient: any, sender: any) {
  const sf = await Framework.create({
    chainId: chainId,
    provider: customHttpProvider
  });

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();

  try {
    const deleteFlowOperation = sf.cfaV1.deleteFlow({
      sender: sender,
      receiver: recipient,
      superToken: DAIx
      // userData?: string
    });

    console.log("Deleting your stream...");

    await deleteFlowOperation.exec(signer);

    console.log(
      `Congrats - you've just deleted your money stream!
     Network: Kovan
     Super Token: DAIx
     Sender: 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721
     Receiver: ${recipient}
  `
    );
  } catch (error) {
    console.error(error);
  }
}

const App = () => {
  const { active, account, library, connector, activate, deactivate } = useWeb3React()
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const { userHasEthbuildNft, isEndGameNftPresent } = useMoralis();

  // This is how to use it 
  // userHasEthbuildNft("rinkeby", "0xD18d08DbFCf9b280D990e8073D28a947a40DB584").then(res => {
  //   console.log(res);
  // })

  wallet.on('connect', async (p) => {
    console.log('wallet event (connect):', p)
    const accountAddress = p.session?.accountAddress;
    if (accountAddress) {
      setWalletAddress(accountAddress);
    }
    setIsWalletConnected(true);
  })

  console.log("account", account?.toString());

  const connect = async (authorize: boolean = false) => {
    const connectDetails = await wallet.connect({
      app: 'Demo Dapp',
      authorize
      // keepWalletOpened: true
    })

    console.warn('connectDetails', { connectDetails })

    if (authorize) {
      const ethAuth = new ETHAuth()

      if (connectDetails.proof) {
        const decodedProof = await ethAuth.decodeProof(connectDetails.proof.proofString, true)
        const isValid = await wallet.utils.isValidTypedDataSignature(
          await wallet.getAddress(),
          connectDetails.proof.typedData,
          decodedProof.signature,
          await wallet.getAuthChainId()
        )
        console.log('isValid?', isValid)
        if (!isValid) throw new Error('sig invalid')
      }
    }
  }

  const disconnect = () => {
    setIsWalletConnected(false);
    wallet.disconnect()
  }

  const isConnected = async () => {
    console.log('isConnected?', wallet.isConnected())
  }

  const connectMeta = async () => {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex)
    }
  }

  const disconnectMeta = async () => {
    try {
      deactivate()
      localStorage.setItem("isWalletConnected", "false");
    } catch (ex) {
      console.log(ex)
    }
  }

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem('isWalletConnected') === 'true') {
        try {
          await activate(injected)
          localStorage.setItem('isWalletConnected', "true")
        } catch (ex) {
          console.log(ex)
        }
      }
    }
    connectWalletOnPageLoad()
  }, []);

  useEffect(() => {
    if (account?.toString()) {
      userHasEthbuildNft("rinkeby", account.toString());
    }
  }, [account?.toString()])

  useEffect(() => {
    if (wallet.isConnected()) {
      setIsWalletConnected(true)
      wallet.getAddress().then((addr) => {
        setWalletAddress(addr);
      })
    }
  }, [])

  return (
    <Router>
      <Container>
        <Header>
          <div style={{ flex: 1.5 }}>
            <Headline>The Richard Norton Blog</Headline>
            <div style={{ marginRight: 100 }}>
              <Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</Description>
              <Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</Description>
            </div>

          </div>
          <div style={{ flex: 1, marginBottom: 100, marginTop: -30 }}>
            <Group layout="grid">
              <Link to={"/demo-dapp"}>
                <Button>Home</Button>
              </Link>
              {/* <Link to={"/demo-dapp/contactus"}> */}
              <Button onClick={() => { console.log("") }}>Contact Us</Button>
              {/* </Link> */}
              <Button onClick={
                () => {
                  if (!active) {
                    connectMeta()
                  } else {
                    disconnectMeta()
                  }
                }
              }>{active ? "Disconnect Wallet" : "Connect Wallet"}
              </Button>
            </Group>
            {active && (
              <div style={{ display: "flex", marginTop: -30, flexDirection: "row" }}>
                <Description>{`Connected with`}</Description>
                <StyledDescription>: {`${account}`}</StyledDescription>
              </div>
            )}
          </div>
        </Header>

        <div>
          {
            isEndGameNftPresent === false && UserHasNoEndGameNft()
          }
        </div>

        <div className='content'>
          <Switch>
            <Route exact path="/demo-dapp">
              {active && isEndGameNftPresent && <Home />}
            </Route>
            <Route path="/demo-dapp/:id">
              <About />
            </Route>
            <Route exact path="/demo-dapp/contactus">
              <ContactUs />
            </Route>
          </Switch>
        </div>
      </Container>
    </Router>
  )
}

function Home() {
  return (
    <Group>
      <Group layout='grid'>
        {blogs.map((item, index) => {
          return (
            <div onClick={() => { }} key={index}>
              <Link to={`/demo-dapp/${index}`}>
                <Image src={item.image} />
              </Link>
              <SubItem>
                <Cost>Cost: {item.cost}</Cost>
                <Timestamp>{item.createdAt}</Timestamp>
              </SubItem>
              <Title>{item.title}</Title>
              <Description>{item.description}</Description>
              <Timestamp>Written by: {item.author}</Timestamp>
            </div>
          )
        })}
      </Group>
    </Group>
  )
}

function About() {
  const { id } = useParams<{ id: string }>()
  const { account } = useWeb3React()
  const blog = blogs[parseInt(id)];

  useEffect(() => {
    createNewFlow(blog.walletAddr, blog.flowRate);

    return () => {
      deleteFlow(blog.walletAddr, account?.toString())
    }
  }, [])

  return (
    <div style={{
      justifyContent: "center",
      alignItems: "center",
      marginTop: 100,
    }}>
      <Headline style={{ textAlign: "center" }}>{`${blog.title}`}</Headline>
      <SubItem1>
        <Timestamp></Timestamp>
        <Cost>Cost: {blog.cost}</Cost>
        <Timestamp>Written by: {blog.author}</Timestamp>
        <Timestamp>Created on: {blog.createdAt}</Timestamp>
        <Timestamp></Timestamp>
      </SubItem1>
      <div style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row"
      }}>
        <BlogImage src={blog.image} />
        <div style={{
          flex: 2,
          paddingTop: 40,
          paddingLeft: 100,
        }}>
          <Description>{blog.description}{blog.description}{blog.description}</Description>
          <Description>{blog.description}</Description>
          <Description>{blog.description}{blog.description}{blog.description}</Description>
          <Description>{blog.description}{blog.description}{blog.description}{blog.description}</Description>
          <Description>{blog.description}</Description>
        </div>
      </div>
    </div>
  )
}

function UserHasNoEndGameNft() {
  return (
    <div style={{ marginTop: "40px" }}>
      <Header>
        <div>
          <Headline>ACCESS INVALID</Headline>
          <div>
            <Description>Sorry you are not allowed to access this page</Description>
            <Description>Before you proceed please buy our Subscription NFT from: <a target={"_blank"} href="https://testnets.opensea.io/collection/ethbuild-endgame">opensea</a></Description>
          </div>
        </div>
      </Header>
    </div>
  )
}

function ContactUs() {
  return <Headline>{`Reach out to us`}</Headline>;
}

const Header = styled('div', {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
})

const SubItem = styled('div', {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: -10,
})

const SubItem1 = styled('div', {
  display: "flex",
  justifyContent: "space-evenly",
  marginBottom: -10,
})

const Container = styled('div', {
  padding: '80px 125px 80px',
  margin: '0 auto',
  height: "100%",
})

const Image = styled('img', {
  height: '480px',
  width: '410px',
})

const BlogImage = styled('img', {
  marginTop: 50,
  height: '580px',
  width: '510px',
  flex: 1.2,
  backgroundColor: "red",
})

const Headline = styled('h1', typography.h1, {
  color: '$textPrimary',
  fontSize: '25px'
})

const Title = styled('h1', typography.h1, {
  color: '$textPrimary',
  fontSize: '16px'
})

const Description = styled('h2', typography.h2, {
  color: '$tint9',
  marginBottom: '12px',
})

const StyledDescription = styled('h2', typography.h2, {
  color: 'purple',
  marginBottom: '12px',
})

const Timestamp = styled('h2', typography.h2, {
  color: '$tint9',
  marginBottom: '4px'
})

const Cost = styled('h2', typography.h2, {
  color: 'green',
  marginBottom: '4px'
})

export default React.memo(App)
