import { TransactionBlock } from "@mysten/sui.js/transactions";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui.js/utils";

const PACKAGE_ID = import.meta.env.VITE_APP_PACKAGE_ID as string;

export const createCreateEventTxb = () => {
    try {
        const txb = new TransactionBlock();
        txb.moveCall({
            target: `${PACKAGE_ID}::auction::create_auction`,
            arguments: [
                txb.pure.u64('100000000'),
                txb.object(SUI_CLOCK_OBJECT_ID),
            ],
            typeArguments: [
                '0x2::sui::SUI',
            ],
        });

        return txb;
    } catch (err) {
        console.log(err);
        throw err;
    }
};
