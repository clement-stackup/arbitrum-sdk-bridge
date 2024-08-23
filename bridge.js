import { ethers } from "ethers";
import {
  EthBridger,
  getArbitrumNetwork,
  EthDepositMessageStatus,
} from "@arbitrum/sdk";
import dotenv from "dotenv";

dotenv.config();

async function bridgeEth(parentSigner, childChainId) {
  // Get the L2 network configuration
  const l2network = await getArbitrumNetwork(childChainId);
  const ethBridger = new EthBridger(l2network);

  // Set up L2 provider (for Arbitrum Sepolia)
  const arb_Provider = new ethers.providers.JsonRpcProvider(process.env.L2RPC);

  // Perform the ETH deposit
  const deposit_L2 = await ethBridger.deposit({
    amount: ethers.utils.parseEther("0.005"), // Amount of ETH to deposit
    parentSigner,
  });

  // Wait for the L1 transaction to be mined
  const ethDepositTxReceipt = await deposit_L2.wait();
  console.log(`Deposit initiated: ${ethDepositTxReceipt.transactionHash}`);

  console.log("Now we wait for L2 side of the transaction to be executed ⏳");
  const l2Result = await ethDepositTxReceipt.waitForChildTransactionReceipt(
    arb_Provider
  );

  if (l2Result.complete) {
    console.log(
      `L2 message successful: status: ${
        EthDepositMessageStatus[await l2Result.message.status()]
      }`
    );
  } else {
    console.error("Transaction failed on Arbitrum Sepolia.");
  }

  const newL2Balance = await parentSigner.connect(arb_Provider).getBalance();
  console.log(`New L2 Balance: ${ethers.utils.formatEther(newL2Balance)} ETH`);
}

async function main() {
  // Set up L1 provider and signer (Ethereum Sepolia)
  const l1Provider = new ethers.providers.JsonRpcProvider(process.env.L1RPC);
  const l1Signer = new ethers.Wallet(process.env.PRIVATE_KEY, l1Provider);

  // Chain ID for Arbitrum Sepolia
  const Arb_Sepolia_ID = 421614;

  // Call the bridge function
  await bridgeEth(l1Signer, Arb_Sepolia_ID);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
