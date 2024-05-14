import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const ProposalForm: React.FC = () => {
    const initialInput = `# Title of your proposal
## **TLDR** 
Enter a brief summary of your proposal here. This should provide a concise overview of what your proposal entails.

## **Context** 
Describe the background or context of your proposal here. Provide any relevant information that helps to understand the reasons behind your proposal.

## **Scope** 
Outline the scope of your proposal here. Detail what your proposal aims to achieve and its potential impact.
`;
    const [markdownInput, setMarkdownInput] = useState<string>(initialInput);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMarkdownInput(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Markdown Input:", markdownInput);
    };

    return (
        <div className="md:mx-10 my-10 mx-4">
            <div className="container mx-auto max-w-7xl p-8 bg-[rgba(255,255,255,0.3)] rounded-md shadow-md flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 mr-4">
                    <div className="name text-gray-500 md:text-2xl text-lg">EthenaDAO</div>
                    <div className="name md:text-3xl text-xl">Submit your proposal</div>
                    <form onSubmit={handleSubmit} className="mt-5">
                        <div className="mb-4">
                            <textarea
                                id="markdownInput"
                                name="markdownInput"
                                value={markdownInput}
                                onChange={handleChange}
                                className="w-full h-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                                placeholder="Enter your proposal"
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
                <div className="w-full md:w-1/2 mt-8 md:mt-0 p-4">
                    <label className="name block text-gray-500 text-2xl font-semibold my-4">Preview</label>
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
