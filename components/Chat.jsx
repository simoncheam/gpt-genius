'use client';
import { generateChatResponse, subtractTokens, fetchUserTokensById } from '@/utils/actions';
import { useAuth } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Chat = () => {
  const chatTokenLimit = 100;

  const { userId } = useAuth();
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  const { mutate, isPending } = useMutation({
    //check token balance before sending request
    mutationFn: async (query) => {
      const currentTokens = await fetchUserTokensById(userId);

      if (currentTokens < chatTokenLimit) {
        toast.error('Token balance is too low...');
        return;
      }
      const response = await generateChatResponse([...messages, query]);

      if (!response) {
        toast.error('Error: Could not generate response');
        return;
      }

      setMessages((prev) => [...prev, response.message]);

      const newTokens = await subtractTokens(userId, response.tokens);
      toast.success(`
        ${newTokens} tokens left
      `);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    //set up query
    const query = { role: 'user', content: text };

    mutate(query);
    //
    setMessages((prev) => [...prev, query]);
    // clear text
    setText('');
  };

  return (
    <div className='min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]'>
      <div>
        {messages.map(({ role, content }, index) => {
          const avatar = role == 'user' ? '👤' : '🤖';
          const bcg = role == 'user' ? 'bg-base-200' : 'bg-base-100';

          return (
            <div key={index} className={`${bcg} flex py-6 -mx-8 px-8 text-xl leading-loose border-b border-base-300`}>
              <span className='mr-4'>{avatar}</span>
              <p className='max-w-3xl'>{content}</p>
            </div>
          );
        })}
        {isPending ? <span className='loading'></span> : null}
      </div>
      <form onSubmit={handleSubmit} className='max-w-4xl pt-12'>
        <div className='join w-full'>
          <input
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Type your message (token limit: ${chatTokenLimit})`}
            className='input input-bordered join-item w-full'
            required
          />
          <button type='submit' className='btn btn-primary join-item' disabled={isPending}>
            {isPending ? 'please wait... ' : 'Submit Question'}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Chat;
