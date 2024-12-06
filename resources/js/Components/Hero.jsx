import React from "react";

const Hero = () => (
    <section className="w-full bg-gray-100 py-10">
        <div className="container mx-auto text-center">
            <img
                src="/path-to-profile-pic.jpg"
                alt="Profile"
                className="mx-auto w-32 h-32 rounded-full"
            />
            <h2 className="text-2xl font-bold mt-4">Tips Pemrograman</h2>
            <p className="text-gray-600 mt-2">Sharing coding tips and tricks</p>
        </div>
    </section>
);

export default Hero;
