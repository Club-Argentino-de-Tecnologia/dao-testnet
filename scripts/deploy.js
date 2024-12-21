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
        
        // Configuración de gas más conservadora
        const governor = await Governor.deploy(tokenAddress, {
            gasLimit: 2000000,  // Reducido el límite de gas
            gasPrice: ethers.parseUnits("50", "gwei")  // Gas price más bajo
        });
        
        console.log("Esperando confirmación...");
        await governor.waitForDeployment();
        
        const governorAddress = await governor.getAddress();
        console.log("CATGovernor desplegado en:", governorAddress);
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