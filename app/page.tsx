"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './layout';
import UploadImage from './components/ui/UploadImage';  // Import the UploadImage component

const YOUTUBE_API_KEY = 'AIzaSyBQMNm0oFP9zml3INqNimFFeyD4GTOgSHA';
const PLAYLIST_ID = 'PLpE3mEgd5GCnIKE2JLDISG4UJHiGlfw4j';

const fetchYouTubeVideos = async () => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=3&playlistId=${PLAYLIST_ID}&key=${YOUTUBE_API_KEY}`
    );
    return response.data.items;
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
};

export default function HomePage() {
  const [videos, setVideos] = useState([]);
  const [imageFile, setImageFile] = useState<File | null>(null);  // State for uploaded image

  useEffect(() => {
    fetchYouTubeVideos().then((data) => {
      console.log(data);
      setVideos(data);
    });
  }, []);

  // Define the handleImageUpload function
  const handleImageUpload = (file: File) => {
    setImageFile(file);
    // You can process the image further here, such as sending it to a backend or running a TensorFlow model.
  };
  return (
    <Layout>
      {/* Navigation Bar */}
      <nav className="bg-gray-900 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">
            <a href="/">PLANTDOC</a>
          </div>

          <div className="flex space-x-6">
            <a href="/" className="hover:text-gray-400">Home</a>
            <a href="/categories" className="hover:text-gray-400">Categories</a>
            <a href="/contact-us" className="hover:text-gray-400">Contact Us</a>
            <a href="/about-us" className="hover:text-gray-400">About Us</a>
          </div>

          <div className="relative flex items-center space-x-6">
            <input
              type="text"
              className="px-4 py-2 rounded-full text-black"
              placeholder="Search..."
            />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-900 via-purple-800 to-blue-900 text-white h-screen flex items-center">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
            <h1 className="text-5xl font-bold leading-tight">
              Crop Disease Detection
            </h1>
            <p className="mt-6 text-lg">
              Identify crop diseases using artificial intelligence
            </p>
            <div className="mt-8 flex justify-center lg:justify-start">
              <a
              href="https://gemini-ai-chatbot-kohl-ten.vercel.app/"
              className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-md shadow-md">
                Start detecting
              </a>
            </div>
          </div>

          <div className="lg:w-3/5">
            <img
              src="/home.png"
              alt="Crop Disease Detection"
              className="w-full h-auto max-w-none"
            />
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="bg-purple-800 py-6">
        <div className="container mx-auto flex justify-center space-x-6">
          <a href="https://www.instagram.com/plantpathology_plantdiseases?igsh=ejJlbnoyYmlpeG5k" target="_blank" rel="noopener noreferrer" className="text-white text-lg">
            <img src="/square-instagram-brands-solid.svg" alt="Instagram" className="h-8 inline-block mr-2" />
            Instagram
          </a>
          <a href="https://www.github.com" target="_blank" rel="noopener noreferrer" className="text-white text-lg">
            <img src="/square-github-brands-solid.svg" alt="GitHub" className="h-8 inline-block mr-2" />
            GitHub
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white text-lg">
            <img src="/linkedin-brands-solid.svg" alt="LinkedIn" className="h-8 inline-block mr-2" />
            LinkedIn
          </a>
        </div>
      </section>

      {/* What Do We Do Section */}
      <section className="bg-gradient-to-r from-indigo-900 via-purple-800 to-blue-900 text-white py-20">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-10 md:space-y-0 md:space-x-20">
          {/* Text Section */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-4xl font-bold mb-10">What Do We Do</h2>
            <p className="text-lg">
              AI model that predicts the presence of blast and sheath blight in rice crops by analyzing crop images and relevant environmental data.
            </p>
            <ul className="list-disc list-inside mt-4 text-lg">
              <li>Why Rice? Rice is a major crop in India, and blast and sheath blight are some of the more common diseases faced by farmers. </li>
              <br></br>
              <li>Implemented through a mobile and web-based application that provides farmers with warnings and recommendations upon uploading their image. </li>
              <br></br>
              <li>The model is designed to be scalable, allowing for future expansion to other crops and diseases. </li>
              <br></br>
              <li>This solution addresses the problem of crop diseases causing significant yield losses by enabling instant detection.</li>
              <br></br>
              <li>The innovative aspect of our solution lies in its combination of AI-based image analysis with environmental data to predict and identify crop diseases.</li>
            </ul>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2">
            <img
              src="/another-image.png"
              alt="AI Model Illustration"
              className="w-full h-auto max-w-none"
            />
          </div>
        </div>
      </section>

      {/* Continue Watching Section */}
      <section className="bg-gradient-to-r from-indigo-900 via-purple-800 to-blue-900 text-white h-screen flex items-center">
        <div className="container mx-auto">
          <h2 className="text-white text-4xl font-semibold mb-10 text-center">Know about your crops</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {videos.length === 0 ? (
              <p className="text-center text-white">No videos available.</p>
            ) : (
              videos.map((video) => (
                <div
                  key={video.id}
                  className="bg-gray-800 p-4 rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
                    title={video.snippet.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                  <h3 className="text-white mt-4">{video.snippet.title}</h3>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

{/* Ask Doubt Section */}
<section className="bg-gradient-to-r from-indigo-900 via-purple-800 to-blue-900 text-white h-screen flex items-center">
  <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
    <div className="lg:w-1/2 text-center lg:text-left">
      <h2 className="text-4xl font-bold mb-10">Want to know if your crops are safe?</h2>
      <div className="flex justify-center lg:justify-start">
        <a
          href="https://gemini-ai-chatbot-kohl-ten.vercel.app/"
          className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-md shadow-md text-lg"
        >
          Find here
        </a>
      </div>
    </div>

    <div className="lg:w-1/2">
      <img
        src="/file.png"
        alt="Ask Doubt Illustration"
        className="max-w-full"
      />
    </div>
  </div>
</section>

{/* Image Upload Section */}
<section className="bg-gradient-to-r from-indigo-900 via-purple-800 to-blue-900 text-white py-20">
  <div className="container mx-auto mt-10">
    <h3 className="text-3xl font-semibold mb-6 text-center">Upload an Image of Your Crop</h3>
    <UploadImage onImageUpload={handleImageUpload} />
  </div>
</section>

    </Layout>
  );
}