// scripts/transfer-tokens.js
async function main() {
    try {
        const [sender] = await ethers.getSigners();
        console.log("Enviando tokens desde:", sender.address);
        
        // Dirección del token CAT
        const tokenAddress = process.env.TOKEN_ADDRESS;
        const Token = await ethers.getContractFactory("CATToken");
        const token = Token.attach(tokenAddress);

        // Balance inicial del sender
        const initialBalance = await token.balanceOf(sender.address);
        console.log("\nBalance inicial:", ethers.formatEther(initialBalance), "CAT");

        // Lista de transferencias a realizar
        const transfers = [
            {
                to: "0x...", // Dirección del colaborador
                amount: "1000", // Cantidad en tokens CAT
                concept: "Desarrollo inicial website"
            }
            // Puedes agregar más transferencias aquí
        ];

        console.log("\nIniciando transferencias...");

        for (const transfer of transfers) {
            console.log(`\nTransferencia a ${transfer.to}:`);
            console.log(`Concepto: ${transfer.concept}`);
            console.log(`Cantidad: ${transfer.amount} CAT`);

            // Verificar balance antes de transferir
            const recipientBalanceBefore = await token.balanceOf(transfer.to);
            
            // Realizar transferencia
            const tx = await token.transfer(
                transfer.to, 
                ethers.parseEther(transfer.amount),
                {
                    gasLimit: 100000,
                    gasPrice: ethers.parseUnits("50", "gwei")
                }
            );

            console.log("Transacción enviada:", tx.hash);
            
            // Esperar confirmación
            await tx.wait();
            console.log("Transacción confirmada");

            // Verificar balances después de la transferencia
            const recipientBalanceAfter = await token.balanceOf(transfer.to);
            console.log(`Balance del receptor actualizado: ${ethers.formatEther(recipientBalanceAfter)} CAT`);
        }

        // Balance final del sender
        const finalBalance = await token.balanceOf(sender.address);
        console.log("\nBalance final del sender:", ethers.formatEther(finalBalance), "CAT");

        // Generar resumen de transferencias
        console.log("\n=== Resumen de Transferencias ===");
        for (const transfer of transfers) {
            console.log(`\n${transfer.amount} CAT -> ${transfer.to}`);
            console.log(`Concepto: ${transfer.concept}`);
        }
        console.log("\nTotal transferido:", transfers.reduce((acc, t) => acc + Number(t.amount), 0), "CAT");

    } catch (error) {
        console.error("\nError en la transferencia:");
        console.error(error);
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });