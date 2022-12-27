/* eslint-disable no-undef */
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const tokens = (n) => {
  // eslint-disable-next-line no-undef
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts
  const [buyer, seller, inspector, lender] = await ethers.getSigners()

  // Deploy Real Estate
  const RealEstate = await ethers.getContractFactory('RealEstate')
  const realEstate = await RealEstate.deploy()
  await realEstate.deployed()

  console.log(`Deployed Real Estate Contract at: ${realEstate.address}`)
  console.log(`Minting 12 properties...\n`)

  // Add 12 NFT's using this 
  for (let i = 0; i < 12; i++) {
  const transaction = await realEstate.connect(seller).mint(`https://dulligans.mypinata.cloud/ipfs/QmZBa6eGpSN9STrNUg67fHtW7N9jq86eKvzxk6i7sTotD8/${i + 1}.json`)
  await transaction.wait()
}

  // Deploy Escrow
  const Escrow = await ethers.getContractFactory('Escrow')
  const escrow = await Escrow.deploy(
    realEstate.address,
    seller.address,
    inspector.address,
    lender.address
  )
  await escrow.deployed()

  console.log(`Deployed Escrow Contract at: ${escrow.address}`)
  console.log(`Listing 12 properties...\n`)

  for (let i = 0; i < 12; i++) {
    // Approve properties...
    let transaction = await realEstate.connect(seller).approve(escrow.address, i + 1)
    await transaction.wait()
  }

  // Listing properties...
  transaction = await escrow.connect(seller).list(1, buyer.address, tokens(20), tokens(10))
  await transaction.wait()
  console.log('mint 1')

  transaction = await escrow.connect(seller).list(2, buyer.address, tokens(20), tokens(10))
  await transaction.wait()
  console.log('mint 2')

  transaction = await escrow.connect(seller).list(3, buyer.address, tokens(20), tokens(10))
  await transaction.wait()
  console.log('mint 3')

  transaction = await escrow.connect(seller).list(4, buyer.address, tokens(20), tokens(10))
  await transaction.wait()
  console.log('mint 4')

  transaction = await escrow.connect(seller).list(5, buyer.address, tokens(20), tokens(10))
  await transaction.wait()
  console.log('mint 5')

  transaction = await escrow.connect(seller).list(6, buyer.address, tokens(20), tokens(10))
  await transaction.wait()
  console.log('mint 6')

  transaction = await escrow.connect(seller).list(7, buyer.address, tokens(20), tokens(10))
  await transaction.wait()
  console.log('mint 7')

  transaction = await escrow.connect(seller).list(8, buyer.address, tokens(20), tokens(10))
  await transaction.wait()
  console.log('mint 8')

  transaction = await escrow.connect(seller).list(9, buyer.address, tokens(20), tokens(10))
  await transaction.wait()
  console.log('mint 9')

  transaction = await escrow.connect(seller).list(10, buyer.address, tokens(20), tokens(10))
  await transaction.wait()
  console.log('mint 10')

  transaction = await escrow.connect(seller).list(11, buyer.address, tokens(20), tokens(10))
  await transaction.wait()
  console.log('mint 11')

  transaction = await escrow.connect(seller).list(12, buyer.address, tokens(20), tokens(10))
  await transaction.wait()
  console.log('mint 12')

  console.log(`Finished.`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
