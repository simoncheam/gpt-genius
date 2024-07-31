'use client';
import { generateChatResponse } from '@/utils/actions';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

const Chat = () => {
  const [text, setText] = useState('');
  const [message, setMessage] = useState([]);

  const { mutate } = useMutation({
    mutationFn: (message) => generateChatResponse(message),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(text);
  };

  return (
    <div className='min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]'>
      <div>
        <h2 className='text-5xl'>messages</h2>
      </div>
      <form onSubmit={handleSubmit} className='max-w-4xl pt-12'>
        <div className='join w-full'>
          <input
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Type your message...'
            className='input input-bordered join-item w-full'
            required
          />
          <button type='submit' className='btn btn-primary join-item'>
            Submit Question
          </button>
        </div>
      </form>
    </div>
  );
};
export default Chat;
