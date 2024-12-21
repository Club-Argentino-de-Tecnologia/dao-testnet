// scripts/deploy-governor.js
async function main() {
    try {
        const [deployer] = await ethers.getSigners();
        console.log("Desplegando Governor con la cuenta:", deployer.address);

        const balance = await ethers.provider.getBalance(deployer.address);
        console.log("Balance de la cuenta:", ethers.formatEther(balance), "POL");

        // Dirección del token CAT que ya desplegamos
        const tokenAddress = process.env.TOKEN_ADDRESS;

        const Governor = await ethers.getContractFactory("CATGovernor");
        console.log("Desplegando CATGovernor...");
        
        const feeData = await ethers.provider.getFeeData();
        console.log("Gas Price estimado:", ethers.formatUnits(feeData.gasPrice || 0, "gwei"), "gwei");
        
        const governor = await Governor.deploy(tokenAddress, {
            gasLimit: 2000000,
            gasPrice: ethers.parseUnits("50", "gwei")
        });
        
        console.log("Esperando confirmación...");
        await governor.waitForDeployment();
        
        const governorAddress = await governor.getAddress();
        console.log("\nInformación del Governor:");
        console.log("Dirección:", governorAddress);
        console.log("Token vinculado:", tokenAddress);
        console.log("Quorum:", await governor.QUORUM_PERCENTAGE(), "%");
        console.log("Periodo de votación:", await governor.VOTING_PERIOD(), "bloques");
        console.log("Delay de votación:", await governor.VOTING_DELAY(), "bloques");
        console.log("Threshold de propuesta:", await governor.PROPOSAL_THRESHOLD());

        console.log("\nPara configurar en Tally:");
        console.log("Network: Polygon Amoy Testnet");
        console.log("Governor address:", governorAddress);
    } catch (error) {
        console.error("Error durante el despliegue:", error);
        throw error;
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });