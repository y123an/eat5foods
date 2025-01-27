import React from 'react';
import styles from './overlayLoader.module.css';

interface PageLoaderProps {
    visible: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({ visible }) => {
    if (!visible) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.loader}></div>
        </div>
    );
};

export default PageLoader;
