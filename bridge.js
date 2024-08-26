import { ethers } from "ethers";
import {
  EthBridger,
  getArbitrumNetwork,
  EthDepositMessageStatus,
} from "@arbitrum/sdk";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

async function bridgeEth(parentSigner, childChainId) {
  /**
   * Part B: Set Up L2 Provider
   * - Initialize the L2 provider with the Arbitrum Sepolia RPC endpoint.
   * - This provider will be used to interact with the Arbitrum network.
   */
  const arb_Provider = "";

  /**
   * Part C: Get the L2 Network Configuration
   * - Use the Arbitrum SDK to retrieve the L2 network configuration.
   * - This allows us to interact with the correct Arbitrum network, in this case, Arbitrum Sepolia.
   */
  const l2network = "";
  const ethBridger = "";

  /**
   * Part D: Deposit ETH to Arbitrum Sepolia
   * - Utilize the EthBridger to deposit ETH from Ethereum Sepolia to Arbitrum Sepolia.
   * - Here, we're depositing 0.005 ETH.
   */
  const deposit_L2 = "";

  /**
   * Part E: Wait for Deposit Transaction to be Mined
   * - Wait for the transaction on Ethereum Sepolia to be confirmed.
   * - Log the transaction hash for reference.
   */
  const ethDepositTxReceipt = "";

  console.log(`Deposit initiated: ${ethDepositTxReceipt.transactionHash}`);
  console.log("Now we wait for L2 side of the transaction to be executed ⏳");

  /**
   * Part F: Wait for Confirmation on Arbitrum Sepolia
   * - The transaction will also need to be confirmed on Arbitrum Sepolia.
   * - We wait for the child transaction receipt to ensure the ETH has been successfully bridged.
   */
  const l2Result = "";

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
  /**
   * Part A: Set Up L1 Provider and Signer (Ethereum Sepolia)
   * - Initialize the provider for the L1 network (Ethereum Sepolia).
   * - Create a signer using the private key from .env
   */
  const l1Provider = "";
  const l1Signer = "";

  // Chain ID for Arbitrum Sepolia
  const Arb_Sepolia_ID = 421614;

  // Call the bridge function
  await bridgeEth(l1Signer, Arb_Sepolia_ID);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
