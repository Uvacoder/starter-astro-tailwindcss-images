import React, { useState } from 'react';

const Button = (props) => {
  return (
    <button className="flex-shrink-0 bg-gray-600 text-white text-base font-bold py-2 px-4 rounded-lg hover:bg-gray-700" {...props} />
  )
}

export default function Counter({ children, count: initialCount }) {
  const [count, setCount] = useState(initialCount);
  const add = () => setCount((i) => i + 1);
  const subtract = () => setCount((i) => i - 1);
  return (
    <>
      <div className="bg-gray-100 p-4 mb-4 flex items-center">
        <Button onClick={subtract}>-</Button>
        <pre className="px-2">{count}</pre>
        <Button onClick={add}>+</Button>
      </div>
      <div className="children">{children}</div>
    </>
  );
}
