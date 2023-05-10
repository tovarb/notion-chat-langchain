import { useRef, useState, useEffect } from 'react';
import Layout from '@/components/layout';
import styles from './index.module.css';

export default function Home() {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleSearch() {
    if (!query) {
      alert('Please input a question');
      return;
    }

    setAnswer('');
    setLoading(true);

    const question = query.trim();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
        }),
      });

      if (!response.ok) {
        setLoading(false);
        throw new Error(response.statusText);
      }

      const answer = await response.json();

      if (answer.text) {
        setAnswer(answer.text);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    }
  }

  const handleEnter = (e: any) => {
    if (e.key === 'Enter' && query) {
      handleSearch();
    } else {
      return;
    }
  };

  return (
    <>
      <Layout>
        <section className="w-screen max-w-xl mx-auto pt-4 pb-6 md:pt-8 md:pb-10 lg:pt-10 lg:pb-16">
          <div className="mx-auto flex flex-col gap-4 text-center">
            <div className="mx-auto flex flex-col gap-4 text-center">
              <img
                src="https://mcusercontent.com/e7f9fab7d966dc8d10caae6d8/images/e7c8fa3e-34bb-7f7c-7f6d-4ebf58d799f4.jpg"
                alt="bot"
                style={{ height: '140px' }}
              />
            </div>
            <br />
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-2">
              Consulta la información
            </h1>
            <div className="flex w-full max-w-xl items-center space-x-2">
              <input
                ref={inputRef}
                className="block w-full rounded-md px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6 border border-gray-300"
                type="text"
                placeholder="Necesito ayuda"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleEnter}
                style={{ color: 'black', border: '1px solid #EAEAEA' }}
              />
              <button
                onClick={handleSearch}
                className="rounded-md bg-teal-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
              >
                Buscar
              </button>
            </div>
            {loading && (
              <div className="flex mt-2 text-center justify-center h-screen ">
                <div className="text-center">
                  <div className={styles.ldsring}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </div>
            )}
            {!loading && answer.length > 0 && (
              <>
                <div className="rounded-md border-neutral-300 border p-5 mt-4 mx-2 sm:mx-0">
                  <h2 className="text-xl font-bold leading-[1.1] tracking-tighter text-center"></h2>
                  <p className="leading-normal text-slate-700 sm:leading-7 mt-3">
                    {answer}
                  </p>
                </div>
              </>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
}
