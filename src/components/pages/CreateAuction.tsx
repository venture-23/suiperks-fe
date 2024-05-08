import { useState } from "react";
import { createAuction } from "../../services/createAuctionServices";

const CreateEventPage = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [createInputValues, setCreateInputValues] = useState({
        title: "",
        description: "",
        nftName: "",
        nftDescription: "",
        nftImage: "",
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCreateInputValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCreateSubmit = async () => {
        console.log("asdasedasd");
        setLoading(true);
        setError("");

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
                throw new Error("An error occurred while creating event");
            }

            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 3000);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(String(err));
            }
            // setTimeout(() => {
            //     setError("");
            // }, 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="md:mx-40 my-10 mx-4">
                <div className="name text-gray-500 text-2xl">Crowdfund DAO</div>
                <div className="name text-6xl">Admin</div>
                <div className="my-4">Create and Settle Auctions.</div>

                <div className="flex">
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
                                    onChange={handleInputChange}
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
                                    onChange={handleInputChange}
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
                                    onChange={handleInputChange}
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
                                    onChange={handleInputChange}
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
                                    onChange={handleInputChange}
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
                        {success && <div className="text-green-500 mt-2">Event created successfully!</div>}
                        {error && <div className="text-red-500 mt-2">{error}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateEventPage;
