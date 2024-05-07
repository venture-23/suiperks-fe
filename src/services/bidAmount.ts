import { TransactionBlock } from "@mysten/sui.js/transactions";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui.js/utils";

const PACKAGE_ID = import.meta.env.VITE_APP_PACKAGE_ID as string;

export const createBidAuctionTxb = (amount: number, auctionInfoId: string) => {
    try {
        const tx = new TransactionBlock();
        const coin = tx.splitCoins(tx.gas, [tx.pure(amount)]);
        tx.moveCall({
            target: `${PACKAGE_ID}::auction::bid`,
            arguments: [
                tx.object(auctionInfoId),
                tx.object(SUI_CLOCK_OBJECT_ID),
                coin,
            ],
            typeArguments: ["0x2::sui::SUI"],
        });

        return tx;
    } catch (err) {
        console.log(err);
        throw err;
    }
};
