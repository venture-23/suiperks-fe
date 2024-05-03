import { FormEvent, useState } from "react";
import { createCreateEventTxb } from "../../services/createAuctionServices";
import { useWallet } from "@suiet/wallet-kit";

const CreateEventPage = () => {
    const wallet = useWallet();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        try {
            const txb = createCreateEventTxb();
            const txnResponse = await wallet.signAndExecuteTransactionBlock({
                // @ts-expect-error transactionBlock type mismatch error between @suiet/wallet-kit and @mysten/sui.js
                transactionBlock: txb,
            });

            if (txnResponse?.digest) {
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                }, 3000);
            } else {
                setError("Transaction failed");
                setTimeout(() => {
                    setError("");
                }, 3000);
            }
        } catch (err) {
            setError("An error occurred while creating event");
            setTimeout(() => {
                setError("");
            }, 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="md:mx-40 my-10 mx-4">
                <div className="name text-gray-500 text-2xl">Crowdfund DAO</div>
                <div className="name text-6xl">Create Auction</div>
                <div className="my-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </div>

                <div className="mt-4">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mt-4">
                            <button
                                type="submit"
                                className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                                disabled={loading}
                            >
                                {loading ? "Creating Event..." : "Create Event"}
                            </button>
                        </div>
                    </form>
                    {success && <div className="text-green-800">Event created successfully!</div>}
                    {error && <div className="text-red-800">{error}</div>}
                </div>
            </div>
        </div>
    );
};

export default CreateEventPage;
