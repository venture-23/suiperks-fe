import { TransactionBlock } from "@mysten/sui.js/transactions";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui.js/utils";

const PACKAGE_ID = import.meta.env.VITE_APP_PACKAGE_ID as string;
const AUCTION_INFO_ID = import.meta.env.VITE_APP_AUCTION_INFO_ID as string;

export const createBidAuctionTxb = (amount: number) => {
    try {
        const tx = new TransactionBlock();
        const coin = tx.splitCoins(tx.gas, [tx.pure(amount)]);
        tx.moveCall({
            target: `${PACKAGE_ID}::auction::bid`,
            arguments: [
                tx.object(AUCTION_INFO_ID),
                tx.object(SUI_CLOCK_OBJECT_ID),
                coin,
            ],
        });

        return tx;
    } catch (err) {
        console.log(err);
        throw err;
    }
};
