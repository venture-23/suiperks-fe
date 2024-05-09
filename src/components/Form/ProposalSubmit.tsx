import React, { useState } from "react";

interface ProposalFormData {
    tldr: string;
    context: string;
    scope: string;
    details: string;
}

const ProposalForm: React.FC = () => {
    const [formData, setFormData] = useState<ProposalFormData>({
        tldr: "",
        context: "",
        scope: "",
        details: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        setFormData({
            tldr: "",
            context: "",
            scope: "",
            details: "",
        });
    };

    return (
        <div className="md:mx-40 my-10 mx-4">
            <div className="container mx-auto max-w-lg p-8 bg-[rgba(255,255,255,0.3)] rounded-md shadow-md">
                <div className="name text-gray-500 md:text-2xl text-lg">Crowdfund DAO</div>
                <div className="name md:text-3xl text-xl">Submit your proposal</div>
                <form onSubmit={handleSubmit} className="mt-5">
                    <div className="mb-4">
                        <label htmlFor="tldr" className="block text-sm font-semibold mb-1">
                            TLDR
                        </label>
                        <input
                            type="text"
                            id="tldr"
                            name="tldr"
                            value={formData.tldr}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="context" className="block text-sm font-semibold mb-1">
                            Context
                        </label>
                        <textarea
                            id="context"
                            name="context"
                            value={formData.context}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="scope" className="block text-sm font-semibold mb-1">
                            Scope
                        </label>
                        <textarea
                            id="scope"
                            name="scope"
                            value={formData.scope}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="details" className="block text-sm font-semibold mb-1">
                            Additional Details
                        </label>
                        <textarea
                            id="details"
                            name="details"
                            value={formData.details}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProposalForm;
