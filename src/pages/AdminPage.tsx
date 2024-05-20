import { useState } from "react";
import { createAuction, settleAuction } from "../services/createAuctionServices";
import QueueTable from "../components/Admin/QueueTable";

const AdminPage = () => {
    const [loading, setLoading] = useState(false);
    const [createSuccess, setCreateSuccess] = useState(false);
    const [settleSuccess, setSettleSuccess] = useState(false);
    const [createError, setCreateError] = useState("");
    const [settleError, setSettleError] = useState("");
    const [createInputValues, setCreateInputValues] = useState({
        title: "",
        description: "",
        nftName: "",
        nftDescription: "",
        nftImage: "",
    });
    const [settleInputValues, setSettleInputValues] = useState({
        auctionInfo: "",
        nftName: "",
        nftDescription: "",
        nftImage: "",
    });

    const handleCreateInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCreateInputValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSettleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSettleInputValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCreateSubmit = async () => {
        setLoading(true);
        setCreateError("");

        try {
            if (
                !createInputValues.title ||
                !createInputValues.description ||
                !createInputValues.nftName ||
                !createInputValues.nftDescription ||
                !createInputValues.nftImage
            ) {
                throw new Error("Please recheck the input values!");
            }

            const auctionMetadata = {
                title: createInputValues.title,
                description: createInputValues.description,
                nftName: createInputValues.nftName,
                nftDescription: createInputValues.nftDescription,
                nftImage: createInputValues.nftImage,
            };
            const res = await createAuction(auctionMetadata);

            if (!res) {
                throw new Error("An error occurred while creating auction!");
            }

            setCreateSuccess(true);
            // setTimeout(() => {
            //     setCreateSuccess(false);
            // }, 3000);
        } catch (err) {
            if (err instanceof Error) {
                setCreateError(err.message);
            } else {
                setCreateError(String(err));
            }
            // setTimeout(() => {
            //     setCreateError("");
            // }, 3000);
        } finally {
            setLoading(false);
        }
    };

    const handleSettleSubmit = async () => {
        setLoading(true);
        setSettleError("");

        try {
            if (
                !settleInputValues.auctionInfo ||
                !settleInputValues.nftName ||
                !settleInputValues.nftDescription ||
                !settleInputValues.nftImage
            ) {
                throw new Error("Please recheck the input values!");
            }

            const auctionMetadata = {
                auctionInfo: settleInputValues.auctionInfo,
                nftName: settleInputValues.nftName,
                nftDescription: settleInputValues.nftDescription,
                nftImage: settleInputValues.nftImage,
            };
            const res = await settleAuction(auctionMetadata);

            if (!res) {
                throw new Error("An error occurred while settling auction!");
            }

            setSettleSuccess(true);
        } catch (err) {
            if (err instanceof Error) {
                setSettleError(err.message);
            } else {
                setSettleError(String(err));
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-page w-full">
            <div className="md:mx-40 my-10 mx-4">
                <div className="name text-gray-500 text-2xl">EthenaDAO</div>
                <div className="name text-6xl">Admin</div>
                <div className="my-4">Create and Settle Auctions.</div>

                <div className="flex gap-8 flex-wrap">
                    <div className="w-full max-w-[500px] bg-[rgba(255,255,255,0.3)] rounded-md p-4">
                        <h3 className="text-lg font-bold">Create Auction</h3>
                        <div>
                            <div className="form-group flex flex-col mt-2">
                                <label htmlFor="nftName">Auction Name:</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={createInputValues.title}
                                    placeholder="Auction Name"
                                    onChange={handleCreateInputChange}
                                    required
                                    className="h-[40px] mt-1 p-1"
                                />
                            </div>
                            <div className="form-group flex flex-col mt-2">
                                <label htmlFor="nftName">Auction Description:</label>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    value={createInputValues.description}
                                    placeholder="Auction Description"
                                    onChange={handleCreateInputChange}
                                    required
                                    className="h-[40px] mt-1 p-1"
                                />
                            </div>
                            <div className="form-group flex flex-col mt-2">
                                <label htmlFor="nftName">NFT Name:</label>
                                <input
                                    type="text"
                                    id="nftName"
                                    name="nftName"
                                    value={createInputValues.nftName}
                                    placeholder="Name"
                                    onChange={handleCreateInputChange}
                                    required
                                    className="h-[40px] mt-1 p-1"
                                />
                            </div>
                            <div className="form-group flex flex-col mt-2">
                                <label htmlFor="nftDescription">NFT Description:</label>
                                <input
                                    type="text"
                                    id="nftDescription"
                                    name="nftDescription"
                                    value={createInputValues.nftDescription}
                                    placeholder="Description"
                                    onChange={handleCreateInputChange}
                                    required
                                    className="h-[40px] mt-1 p-1"
                                />
                            </div>
                            <div className="form-group flex flex-col mt-2">
                                <label htmlFor="nftImage">NFT Image:</label>
                                <input
                                    type="nftImage"
                                    id="nftImage"
                                    name="nftImage"
                                    value={createInputValues.nftImage}
                                    placeholder="Image URL"
                                    onChange={handleCreateInputChange}
                                    required
                                    className="h-[40px] mt-1 p-1"
                                />
                            </div>
                            <div className="form-group mt-4">
                                <button
                                    type="submit"
                                    className="bg-gray-900 text-white px-4 py-2 rounded-md"
                                    disabled={loading}
                                    onClick={handleCreateSubmit}
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                        {createSuccess && <div className="text-green-500 mt-2">Event created successfully!</div>}
                        {createError && <div className="text-red-500 mt-2">{createError}</div>}
                    </div>

                    <div className="w-full max-w-[500px] bg-[rgba(255,255,255,0.3)] rounded-md p-4">
                        <h3 className="text-lg font-bold">Settle Auction</h3>
                        <div>
                            <div className="form-group flex flex-col mt-2">
                                <label htmlFor="nftName">Auction Info Id:</label>
                                <input
                                    type="text"
                                    id="auctionInfo"
                                    name="auctionInfo"
                                    value={settleInputValues.auctionInfo}
                                    placeholder="Auction Info Id"
                                    onChange={handleSettleInputChange}
                                    required
                                    className="h-[40px] mt-1 p-1"
                                />
                            </div>
                            <div className="form-group flex flex-col mt-2">
                                <label htmlFor="nftName">NFT Name:</label>
                                <input
                                    type="text"
                                    id="nftName"
                                    name="nftName"
                                    value={settleInputValues.nftName}
                                    placeholder="Name"
                                    onChange={handleSettleInputChange}
                                    required
                                    className="h-[40px] mt-1 p-1"
                                />
                            </div>
                            <div className="form-group flex flex-col mt-2">
                                <label htmlFor="nftDescription">NFT Description:</label>
                                <input
                                    type="text"
                                    id="nftDescription"
                                    name="nftDescription"
                                    value={settleInputValues.nftDescription}
                                    placeholder="Description"
                                    onChange={handleSettleInputChange}
                                    required
                                    className="h-[40px] mt-1 p-1"
                                />
                            </div>
                            <div className="form-group flex flex-col mt-2">
                                <label htmlFor="nftImage">NFT Image:</label>
                                <input
                                    type="nftImage"
                                    id="nftImage"
                                    name="nftImage"
                                    value={settleInputValues.nftImage}
                                    placeholder="Image URL"
                                    onChange={handleSettleInputChange}
                                    required
                                    className="h-[40px] mt-1 p-1"
                                />
                            </div>
                            <div className="form-group mt-4">
                                <button
                                    type="submit"
                                    className="bg-gray-900 text-white px-4 py-2 rounded-md"
                                    disabled={loading}
                                    onClick={handleSettleSubmit}
                                >
                                    Settle
                                </button>
                            </div>
                        </div>
                        {settleSuccess && <div className="text-green-500 mt-2">Event Settled successfully!</div>}
                        {settleError && <div className="text-red-500 mt-2">{settleError}</div>}
                    </div>
                </div>
            </div>

            <QueueTable />
        </div>
    );
};

export default AdminPage;
