require('dotenv').config();

module.exports = async function verify(taskArgs, hre) {
  const address = process.env.CONTRACT_ADDRESS;

  if (!address) {
    throw new Error('CONTRACT_ADDRESS is required');
  }

  await hre.run('verify:verify', {
    address,
    constructorArguments: []
  });
};
