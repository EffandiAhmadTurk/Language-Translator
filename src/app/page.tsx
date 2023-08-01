'use client'
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  console.log()
  const [error, setError] = useState(null);

  const handleInputChange = (event: any) => {
    setInputText(event.target.value);
  };

  const handleTranslation = () => {
    const encodedParams = new URLSearchParams();
    encodedParams.set('source_language', 'en');
    encodedParams.set('target_language', 'ur' );
    encodedParams.set('text', inputText);

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '12d716864emshc46f560142dc50ap1d29d6jsne912f08e79f9',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
      },
      body: encodedParams.toString(),
    };

    fetch('https://text-translator2.p.rapidapi.com/translate', options)
      .then((response) => response.json())
      .then((data) => {
        setTranslatedText(data.data.translatedText);
        console.log(data.translatedText)
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
<div className=''>
<main className="grid  h-screen items-center gap-2 mx-2 lg:grid-cols-2">
      <div className='mt-12'>
        <label className="block bg-gray-300 hover:bg-blue-300 hover:shadow-2xl  mb-2 text-xl px-2 font-medium mx-auto mx-2 rounded-md shadow-md ">Language Translator</label>
        <textarea
          value={inputText}
          onChange={handleInputChange} id="message" className="block p-2.5 w-full h-[500px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
      <div className=''>
      <button className='text-white mx-auto w-[300px] mt-2 bg-blue-700 mx-auto hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' onClick={handleTranslation}>Translate</button>
      </div>
      </div>
      <div>
        <div className='bg-gray-300 h-[500px] overflow-y-auto px-2 rounded-md shadow-2xl mt-6'>
          {translatedText ? (
            <p className='pt-4'>Translated Text: {translatedText}</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <p>Enter text and click Translate</p>
          )}
        </div>
      </div>
    </main>

</div>
  
  );
}
