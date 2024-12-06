import React from "react";

const links = [
    { label: "YouTube Channel", url: "https://youtube.com/" },
    { label: "Instagram", url: "https://instagram.com/" },
    { label: "Portfolio", url: "https://example.com/" },
];

const LinksSection = () => (
    <section className="container mx-auto my-8 px-4">
        <div className="grid gap-4">
            {links.map((link, index) => (
                <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gray-800 text-white text-center py-3 rounded-lg hover:bg-gray-700 transition"
                >
                    {link.label}
                </a>
            ))}
        </div>
    </section>
);

export default LinksSection;
