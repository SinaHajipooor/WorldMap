import { memo, useMemo, useState } from "react";

function SlowComponent() {
    // If this is too slow on your maching, reduce the `length`
    const words = Array.from({ length: 100_000 }, () => "WORD");
    return (
        <ul>
            {words.map((word, i) => (
                <li key={i}>
                    {i}: {word}
                </li>
            ))}
        </ul>
    );
}

function Counter({ children }) {
    const [count, setCount] = useState(0);
    return (
        <div>
            <h1>Slow counter?!?</h1>
            <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
            {children}
        </div>
    );
}


export default function Test() {
    return (
        <Counter>
            <SlowComponent />
        </Counter>
    );
}

// memo function
const SlowArchive = memo(function SlowArchive({ show }) {
    return <div>
        this is a heavy component
    </div>
})

// we should pass a callback function into the useMemo and this function should return the value that we want to store it in the cache and also useMemo hook accept a dependency array as a second argument and when ever the dependecies changes , the hook callback function re-render again (it works just like the useEffect hook) . if we dont pass any dependency then it will never re-render. the value that we return from our callback function is the exaclty the prop that we want to pass into another component(notice that we should also use the memo function on that component ) so the prop(archiveOptions) never changes and that component will no longer re-render 
const archiveOptions = useMemo(() => {
    return {
        show: false,
        title: 'Posts archive in addition to main posts'
    }
}, [])