import { TransactionBlock } from "@mysten/sui.js/transactions";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui.js/utils";

const PACKAGE_ID = import.meta.env.VITE_APP_PACKAGE_ID as string;
const DAO_TREASURY_ID = import.meta.env.VITE_APP_DAO_TREASURY_ID as string;

interface NFTDetails {
    nftName: string;
    nftDetails: string;
    nftImageUrl: string;
}

export const createSettleBidTxb = (nftDetails: NFTDetails, auctionInfoId: string) => {
    try {
        const txb = new TransactionBlock();
        txb.moveCall({
            target: `${PACKAGE_ID}::auction::settle_bid`,
            arguments: [
                txb.pure.string(nftDetails.nftName),
                txb.pure.string(nftDetails.nftDetails),
                txb.pure.string(nftDetails.nftImageUrl),
                txb.object(DAO_TREASURY_ID),
                txb.object(auctionInfoId),
                txb.object(SUI_CLOCK_OBJECT_ID)
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
