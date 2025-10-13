import React, { useState, useEffect, useRef } from 'react';

// TypingTest.jsx
// Simple, single-file React component. Tailwind utility classes used for styling.
// Usage: import TypingTest from './TypingTest'; then <TypingTest />

export default function TypingTest() {
  const sampleText = `The quick brown fox jumps over the lazy dog. Typing tests help measure speed and accuracy.`;

  const [input, setInput] = useState('');
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (started && !finished && startTime) {
      intervalRef.current = window.setInterval(() => {
        setElapsedMs(Date.now() - startTime);
      }, 200);
    }
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [started, finished, startTime]);

  useEffect(() => {
    if (!finished && input.length >= sampleText.length) {
      finishTest();
    }
  }, [input, finished]);

  const handleChange = (e) => {
    const val = e.target.value;
    if (!started) {
      setStarted(true);
      setStartTime(Date.now());
      setElapsedMs(0);
    }
    setInput(val);
  };

  const resetTest = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    setInput('');
    setStarted(false);
    setFinished(false);
    setStartTime(null);
    setElapsedMs(0);
    textareaRef.current?.focus();
  };

  const finishTest = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    setFinished(true);
    setElapsedMs(Date.now() - (startTime || Date.now()));
  };

  // Stats
  const computeCorrectChars = () => {
    let count = 0;
    for (let i = 0; i < input.length && i < sampleText.length; i++) {
      if (input[i] === sampleText[i]) count++;
    }
    return count;
  };

  const correctChars = computeCorrectChars();
  const totalTyped = input.length;
  const minutes = Math.max(1 / 60, elapsedMs / 1000 / 60); // avoid division by zero
  const wpm = finished || started ? Math.round((correctChars / 5) / minutes) : 0;
  const accuracy = totalTyped === 0 ? 100 : Math.max(0, Math.round((correctChars / totalTyped) * 100));

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const mins = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Render sample text with per-char coloring
  const renderSample = () => {
    const chars = sampleText.split('');
    return (
      <p className="select-none leading-6">
        {chars.map((ch, idx) => {
          const typedChar = input[idx];
          let cls = '';
          if (idx < input.length) {
            cls = typedChar === ch ? 'text-green-600' : 'text-red-600';
          } else if (idx === input.length && !finished && started) {
            cls = 'underline';
          } else {
            cls = 'text-gray-700';
          }
          return (
            <span key={idx} className={`${cls} whitespace-pre`}>
              {ch}
            </span>
          );
        })}
      </p>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-3">Typing Test</h2>

      <div className="mb-4 p-4 bg-gray-50 rounded">
        {renderSample()}
      </div>

      <textarea
        ref={textareaRef}
        value={input}
        onChange={handleChange}
        placeholder="Start typing here..."
        disabled={finished}
        className="w-full min-h-[120px] p-3 border rounded focus:outline-none focus:ring"
      />

      <div className="flex items-center justify-between mt-4 gap-3">
        <div className="flex gap-4">
          <div>
            <div className="text-sm text-gray-500">Time</div>
            <div className="font-mono text-lg">{formatTime(elapsedMs)}</div>
          </div>

          <div>
            <div className="text-sm text-gray-500">WPM</div>
            <div className="font-mono text-lg">{wpm}</div>
          </div>

          <div>
            <div className="text-sm text-gray-500">Accuracy</div>
            <div className="font-mono text-lg">{accuracy}%</div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={resetTest}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            Reset
          </button>
          {!finished ? (
            <button
              onClick={finishTest}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Finish
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <div>Typed: {totalTyped} chars • Correct: {correctChars} chars</div>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        Tip: Start typing to begin the test. The test auto-finishes when you reach the end of the sample text.
      </div>
    </div>
  );
}
