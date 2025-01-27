import React from 'react';
const Loader: React.FC = () => {
    return <div className="loader" />
};

export default Loader;

type Props = {
    text?: string
}
const WithTextLoader = ({ text }: Props) => {
    return (
        <div className='flex items-center space-x-2'>
            <div className='loader mr-2' />
            <p>{text}</p>
        </div>
    )
};

export { WithTextLoader };