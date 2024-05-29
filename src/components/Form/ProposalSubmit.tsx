import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import { createProposal, createProposalTxb } from "../../services/proposalServices";
import { useWallet } from "@suiet/wallet-kit";
import { useAppContext } from "../../context/AppContext";

const ProposalForm: React.FC = () => {
    const wallet = useWallet();
    const { activeNFT } = useAppContext();

    const initialInput = `# Title of your proposal
## **TLDR** 
Enter a brief summary of your proposal here. This should provide a concise overview of what your proposal entails.

## **Context** 
Describe the background or context of your proposal here. Provide any relevant information that helps to understand the reasons behind your proposal.

## **Scope** 
Outline the scope of your proposal here. Detail what your proposal aims to achieve and its potential impact.
`;
    const [markdownInput, setMarkdownInput] = useState<string>(initialInput);
    const [amount, setAmount] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMarkdownInput(e.target.value);
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Markdown Input:", markdownInput);

        const lines = markdownInput.split("\n");

        const title = lines[0].trim();
        const details = lines.slice(1).join("\n").trim();

        console.log("Title:", title);
        console.log("Details:", details);

        const seekAmount = parseFloat(amount) * 10 ** 9;
        console.log("Seek Amount:", seekAmount);

        try {
            if (!activeNFT?.nftId) throw new Error("Missing NFT.");
            const res = await createProposal(title, details, activeNFT.nftId);
            if (res?.hash) {
                console.log("Hash", res.hash);
                if (!activeNFT) {
                    throw new Error("No active nft");
                }
                const txb = createProposalTxb(activeNFT.nftId, res.hash, seekAmount);
                const txnResponse = await wallet.signAndExecuteTransactionBlock({
                    // @ts-expect-error transactionBlock type mismatch error between @suiet/wallet-kit and @mysten/sui.js
                    transactionBlock: txb,
                });
                console.log("txnResponse", txnResponse);
                if (txnResponse?.digest) {
                    console.log("Bid auction digest:", txnResponse?.digest);
                    toast.success("Proposal submitted successfully");

                    setTimeout(() => {
                        window.location.href = "/proposals";
                    }, 5000);
                }
            }
        } catch (err) {
            console.log("Failed to create proposal.", err);
            toast.error("Failed to create proposal.");
        }
    };

    return (
        <div className="new-proposal w-full md:mx-10 my-10 mx-4 flex-1">
            <div className="container h-full mx-auto max-w-7xl p-8 bg-[rgba(255,255,255,0.3)] rounded-md shadow-md flex flex-col md:flex-row">
                <div className="form-input-section flex flex-col w-full md:w-1/2 mr-4">
                    <div className="name text-[#1c0971] md:text-2xl text-lg">SUI Perks</div>
                    <div className="name md:text-3xl text-xl">Submit your proposal</div>
                    <form onSubmit={handleSubmit} className="input-form flex flex-col flex-1 mt-5">
                        <div className="mb-4 flex-1 min-h-[500px]">
                            <textarea
                                id="markdownInput"
                                name="markdownInput"
                                value={markdownInput}
                                onChange={handleChange}
                                className="w-full h-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                                placeholder="Enter your proposal"
                                required
                                style={{ height: "100%", minHeight: "inherit" }}
                            ></textarea>
                        </div>
                        <div className="flex flex-col mb-3">
                            <label className="text-lg name">SUI</label>
                            <input
                                type="text"
                                placeholder="Enter SUI amount..."
                                className="p-2"
                                value={amount}
                                onChange={handleAmountChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-1/4 bg-[#1c0971] text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
                        >
                            Submit
                        </button>
                    </form>
                </div>
                <div className="w-full md:w-1/2 mt-8 md:mt-0 p-4">
                    <label className="name block text-[#1c0971] text-2xl font-semibold my-4">Preview</label>
                    <div className="w-full border border-gray-300 rounded-md p-4">
                        <ReactMarkdown
                            components={{
                                h1: ({ children }) => <h1 className="name text-2xl">{children}</h1>,
                                h2: ({ children }) => <h2 className="name text-xl mt-4 mb-2">{children}</h2>,
                            }}
                        >
                            {markdownInput}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProposalForm;
